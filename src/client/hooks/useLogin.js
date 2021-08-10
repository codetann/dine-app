import { useHistory } from "react-router-dom";
import axios from "axios";
import { useStore } from "../providers/StoreProvider";

const baseURL = "http://localhost:8050";

export default function useLogin() {
  const history = useHistory();
  const { setError, setIsAuth, setUser } = useStore();

  const login = async (email, password) => {
    console.log(email, password);
    try {
      const res = await axios.post(baseURL + "/auth/login", {
        email,
        password,
      });
      setIsAuth(true);
      setUser(res.data);
      history.push("/dashboard");
    } catch (error) {
      setError("Email or passward are invalid");
      setTimeout(() => {
        setError(null);
      }, 1000);
    }
  };

  return login;
}
