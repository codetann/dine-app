import { updatePhoto } from "../database/util.js";

export const uploadPhoto = async (req, res) => {
  try {
    const { email, url } = req.body;
    const user = await updatePhoto(url, email);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
