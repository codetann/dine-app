import { useStore } from "../providers/StoreProvider";

const useUser = () => {
  const { user, isAuth, isAdmin } = useStore();

  return { user, isAuth, isAdmin };
};

export default useUser;
