import { updateUser } from "../api/database";
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
