import { useStore } from "../providers/StoreProvider";

const useReadOnly = () => {
  const { isAuth, isAdmin, user, location, nearby, results } = useStore();

  return { isAdmin, isAuth, user, location, nearby, results };
};

export default useReadOnly;
