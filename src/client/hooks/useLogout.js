import { useStore } from "../providers/StoreProvider";
import { useHistory } from "react-router-dom";

export default function useLogout() {
  const history = useHistory();
  const { setIsAuth, setIsAdmin, setUser, setSocket, setMembers, setRoom } =
    useStore();

  const logout = () => {
    setIsAdmin(null);
    setIsAuth(null);
    setUser(null);
    setSocket(null);
    setMembers(null);
    setRoom(null);
    history.push("/login");
  };

  return logout;
}
