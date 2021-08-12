import { useHistory } from "react-router-dom";
import { useStore } from "../providers/StoreProvider";

export default function useTesting() {
  const history = useHistory();
  const { setIsAuth, setUser } = useStore();

  const testLogin = () => {
    setIsAuth(true);
    setUser({
      name: "Test Test",
      email: "test@test.com",
    });

    history.push("/dashboard");
  };
  return { testLogin };
}
