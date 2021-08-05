import Sequelize from "sequelize";
import chalk from "chalk"; // colored console.logs
import UserModel from "./models/user.model";

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
export const User = UserModel(db);

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
