import { useStore } from "../providers/StoreProvider";

export default function useFinish() {
  const { setRoom, setMembers, setGameData, setIsAdmin, results, setResults } =
    useStore();

  const resetAll = () => {
    setRoom(null);
    setMembers(null);
    setGameData(null);
    setIsAdmin(null);
    setResults(null);
  };

  return { resetAll, results };
}
