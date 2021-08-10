import { useHistory } from "react-router-dom";
import axios from "axios";
import { useStore } from "../providers/StoreProvider";

const baseURL = "http://localhost:8050";

export default function useSignup() {
  const history = useHistory();
  const { setError, setIsAuth, setUser } = useStore();

  const signup = async (formData) => {
    const { first, last, email, password } = formData;

    try {
      const res = await axios.post(baseURL + "/auth/signup", {
        name: `${first} ${last}`,
        email,
        password,
      });
      setIsAuth(true);
      setUser(res.data);
      history.push("/dashboard");
    } catch (error) {
      setError(error);
      setTimeout(() => {
        setError(null);
      }, 1000);
    }
  };

  return signup;
}
