import Sequelize from "sequelize";
import { Users, Favorites } from "../index";

// [ Func ] - creates favorites model for db > FavoriteModel Instance
const FavoriteModel = (connection) => {
  return connection.define("Favorites", {
    name: Sequelize.STRING,
    user_id: Sequelize.INTEGER,
    image: Sequelize.STRING,
    address: Sequelize.STRING,
    price: Sequelize.STRING,
    rating: Sequelize.DECIMAL,
    review_count: Sequelize.INTEGER,
    latitude: Sequelize.DECIMAL,
    longitude: Sequelize.DECIMAL,
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    yelp_id: Sequelize.STRING,
    phone: Sequelize.STRING,
    display_phone: Sequelize.STRING,
    distance: Sequelize.INTEGER,
  });
};
// [ Func ] - finds user favorites and returns them > [...favorites]
export const returnFavortiesFromDB = async (id) => {
  try {
    const favorites = await Favorites.findAll({
      where: {
        user_id: id,
      },
    });
    if (favorites.length) return favorites;
    if (!favorites.length) return null;
  } catch {
    console.log("no favorites found");
  }
};
export const deleteFavoriteFromDB = async (dataId, userId) => {
  try {
    await Favorites.destroy({
      where: {
        user_id: userId,
        yelp_id: dataId,
      },
    });
  } catch {
    console.log("no favorites found");
  }
};
export const findFavoritesFromDB = async (dataId, userId) => {
  try {
    const favorites = await Favorites.find({
      where: {
        yelp_id: dataId,
        user_id: userId,
      },
    });
    if (favorites.length) return favorites;
    if (!favorites.length) return null;
  } catch {
    console.log("no favorites found");
  }
};

// [ Func ] - adds favorite to db > New Favorite
export const addFavoriteToDB = async (data, userId) => {
  const {
    name,
    image,
    location,
    price,
    rating,
    review_count,
    latitude,
    longitude,
    id,
    distance,
  } = data;
  return await Favorites.create({
    user_id: userId,
    name,
    image,
    address: location.address,
    price,
    rating,
    review_count,
    latitude,
    longitude,
    yelp_id: id,
    phone: data.phone.number,
    display_phone: data.phone.display_phone,
    distance,
  });
};

export default FavoriteModel;
