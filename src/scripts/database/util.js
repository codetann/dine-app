/**
 * This module contains all the functions used for adding, updating, and deleting from the database.
 *
 * The functions are used in the controller files based on the endpoint provided.
 *
 * TODO - add check for new users so there are not duplicate emails (use unique key in database)
 */

import bcrypt from "bcrypt";
import { User } from "./index";

// checks a user email for login validation
const _checkEmail = async (email) => {
  const user = await User.findAll({
    where: {
      email: email,
    },
  });
  if (user.length) return user;
  if (!user.length) throw "email already exists";
};

// validate to make sure no email exists while signing up
const _validateEmail = async (email) => {
  const user = await User.findAll({
    where: {
      email: email,
    },
  });
  if (user.length) throw new Error("email already exits");
};

/**
 * Chekcs for existing users with same email.
 * Hashes password and saves user to database
 *
 * @param {String} name
 * @param {String} email
 * @param {String} password
 * @returns error message and status code
 */
export const insertNewUser = async (name, email, password) => {
  const salt = 10;
  const photo = "";

  await _validateEmail(email);

  const hash = await bcrypt.hash(password, salt);
  const user = await User.create({
    name,
    email,
    password: hash,
    photo,
  });
  return user;
};

/**
 * Checks if email is in database
 * Compares user password to the hash password
 *
 * @param {String} email
 * @param {String} password
 * @returns error message and status code
 */
export const checkUser = async (email, password = false) => {
  const user = await _checkEmail(email);
  if (!user) throw new Error("could not find email");
  const match = await bcrypt.compare(password, user[0].dataValues.password);
  if (!match) throw new Error("password is incorrect");
  if (match) return user[0];
};

export const updatePhoto = async (url, email) => {
  const user = await _checkEmail(email);
  if (!user) throw new Error("could not find user");
  user[0].photo = url;
  await user[0].save();
  return user[0];
};
