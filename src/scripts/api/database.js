import { Users, Favorites } from "../database/index";
import {
  addFavoriteToDB,
  deleteFavoriteFromDB,
  findFavoritesFromDB,
  returnFavortiesFromDB,
} from "../database/models/favorite.model";
import bcrypt from "bcrypt";

const _validateEmail = async (email) => {
  const user = await Users.findAll({
    where: {
      email: email,
    },
  });
  if (user.length) return user;
  if (!user.length) return null;
};

const _validateFavorite = async (user) => {
  const favorite = await Favorites.find({
    where: {
      user_id: user.id,
    },
  });
  if (favorite.length) return favorite;
  if (!favorite.length) return null;
};

/* Signup User */
export const insertUser = async (name, email, password) => {
  const found = await _validateEmail(email);

  if (found) throw new Error("Email already exists");

  const hash = await bcrypt.hash(password, 10);
  const user = await Users.create({
    name,
    email,
    password: hash,
    photo: "",
  });

  return user;
};

/* Login User */
export const findUser = async (email, password) => {
  const user = await _validateEmail(email);

  if (!user) throw new Error("Could not find user");

  const match = await bcrypt.compare(password, user[0].dataValues.password);

  if (!match) throw new Error("Password is incorrect");
  if (match) return user[0];
};

/* Update User Info */
export const updateUser = async (updates, email) => {
  const user = await _validateEmail(email);
  if (!user) throw new Error("Could not find user");

  if (updates?.email) {
    const found = await _validateEmail(updates.email);
    if (found) throw new Error("Email already exists");
  }

  user[0].name = updates?.name || user[0].name;
  user[0].email = updates?.email || user[0].email;
  user[0].photo = updates?.photo || user[0].photo;

  await user[0].save();
  return user[0];
};

/* Create Favorite */
export const inserFavorite = async (data, id) => {
  const found = await findFavoritesFromDB(data.id, id);

  if (!found) await addFavoriteToDB(data, id);
};

export const removeFavorite = async (data, id) => {
  const dataId = data?.yelp_id || data?.id;

  await deleteFavoriteFromDB(dataId, id);
};

/* Find Favorite */
export const findFavorites = async (id) => {
  try {
    const favorites = await returnFavortiesFromDB(id);
    console.log(favorites);
    return favorites;
  } catch {
    console.log("No favorites found");
  }
};
