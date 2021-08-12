import Sequelize from "sequelize";

const UserModel = (connection) => {
  return connection.define("Users", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
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

// export const findUser = async (User, email) => {
//   const user = await User.findAll({
//     where: {
//       email: email,
//     },
//   });
//   if (user.length) return user;
//   if (!user.length) return null;
// };

export const createUser = (User, data) => {};

export default UserModel;
