import {
  updateUser,
  inserFavorite,
  findFavorites,
  removeFavorite,
} from "../api/database";
import yelp from "../api/yelp";

export const updateUserInfo = async (req, res) => {
  try {
    const { updates, email } = req.body;
    const user = await updateUser(updates, email);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const nearbyBusinesses = async (req, res) => {
  try {
    const businesses = await yelp.test();
    res.status(200).json(businesses);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const addFavorite = async (req, res) => {
  try {
    const { data, id, type } = req.body;
    if (type === "add") {
      await inserFavorite(data, id);
    } else {
      await removeFavorite(data, id);
    }

    const favorites = await findFavorites(id);
    res.status(200).send(favorites);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const getFavorites = async (req, res) => {
  try {
    const { id } = req.body;
    const favorites = await findFavorites(id);
    res.status(200).send(favorites);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
