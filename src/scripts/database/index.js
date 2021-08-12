import Sequelize from "sequelize";
import chalk from "chalk"; // colored console.logs
import UserModel from "./models/user.model";
import FavoriteModel from "./models/favorite.model";

const sqlite = process.env.NODE_ENV === "development" ? "dev" : "prod";

// initiallize db
const db = new Sequelize(
  sqlite,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "sqlite",
    storage: `./src/scripts/database/${sqlite}.sqlite`,
  }
);

// models
export const Users = UserModel(db);
export const Favorites = FavoriteModel(db);

// User.belongsToMany(Business, {
//   as: "Users",
//   through: "UserBusiness",
//   foreinKey: "uid",
// });
// Business.belongsToMany(User, {
//   as: "Businesses",
//   through: "UserBusiness",
//   foreinKey: "bid",
// });
// Users.hasMany(Favorites, { foreignKey: "user_id" });
// Favorites.belongsTo(Users, { foreignKey: "user_id" });

// function is exported and used in the server file to start DB
const start = async () => {
  try {
    await db.sync();
    await db.authenticate();
    console.log(
      `🗳️ ${chalk.blue(" db")}     - database authentication was ${chalk.green(
        "successfull"
      )}`
    );
  } catch (error) {
    console.error(error);
  }
};

export default { start };
