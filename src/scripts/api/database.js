import { User } from "../database/index";
import bcrypt from "bcrypt";

const _validate = async (email) => {
  const user = await User.findAll({
    where: {
      email: email,
    },
  });
  if (user.length) return user;
  if (!user.length) return null;
};

/* Signup User */
export const insertUser = async (name, email, password) => {
  const found = await _validate(email);

  if (found) throw new Error("Email already exists");

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hash,
    photo: "",
  });

  return user;
};

/* Login User */
export const findUser = async (email, password) => {
  const user = await _validate(email);

  if (!user) throw new Error("Could not find user");

  const match = await bcrypt.compare(password, user[0].dataValues.password);

  if (!match) throw new Error("Password is incorrect");
  if (match) return user[0];
};

/* Update User Info */
export const updateUser = async (updates, email) => {
  const user = await _validate(email);
  if (!user) throw new Error("Could not find user");

  if (updates?.email) {
    const found = await _validate(updates.email);
    if (found) throw new Error("Email already exists");
  }

  user[0].name = updates?.name || user[0].name;
  user[0].email = updates?.email || user[0].email;
  user[0].photo = updates?.photo || user[0].photo;

  await user[0].save();
  return user[0];
};
