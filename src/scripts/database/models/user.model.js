import Sequelize from "sequelize";

const UserModel = (connection) => {
  return connection.define("Users", {
    name: Sequelize.STRING,
    photo: Sequelize.STRING,
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.STRING,
      // validate: {
      //   isAlphanumeric: true,
      // },
    },
  });
};

export default UserModel;
