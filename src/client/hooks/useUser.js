import { useStore } from "../providers/StoreProvider";

const useUser = () => {
  const { user, isAuth, isAdmin, location } = useStore();

  return { user, isAuth, isAdmin, location };
};

export default useUser;
