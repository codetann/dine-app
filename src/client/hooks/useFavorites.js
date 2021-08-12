import { useStore } from "../providers/StoreProvider";
import axios from "axios";

export default function useFavorites() {
  const { favorites, setFavorites, setError, user } = useStore();

  const addFavorite = async (business, type) => {
    try {
      const res = await axios.post(
        "http://localhost:8050/api/update/favorite",
        {
          data: business,
          id: user.id,
          type,
        }
      );
      console.log(res.data, business);
      const json = res.data;
      setFavorites(json);
    } catch (error) {
      setError(error);
      setTimeout(() => {
        setError(null);
      }, 1000);
    }
  };

  return { favorites, addFavorite };
}
