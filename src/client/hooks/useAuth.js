import axios from "axios";
import { useStore } from "../providers/StoreProvider";

const baseURL = "http://localhost:8050";

const useAuth = () => {
  const { setUser, setIsAuth, setError } = useStore();

  const login = async (email, password) => {
    try {
      const res = await axios.post(baseURL + "/auth/login", {
        email,
        password,
      });
      setIsAuth(true);
      setUser(res.data);
    } catch (error) {
      setError("Email or passward are invalid");
      setTimeout(() => {
        setError(null);
      }, 1000);
    }
  };

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
    } catch (error) {
      setError(error);
      setTimeout(() => {
        setError(null);
      }, 1000);
    }
  };

  const logout = () => {
    setIsAuth(false);
    setUser(null);
  };

  return { login, signup, logout };
};

export default useAuth;
