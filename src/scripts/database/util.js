/**
 * This module contains all the functions used for adding, updating, and deleting from the database.
 *
 * The functions are used in the controller files based on the endpoint provided.
 *
 * TODO - add check for new users so there are not duplicate emails (use unique key in database)
 */

import bcrypt from "bcrypt";
import { User } from "./index";

const checkEmail = async (email) => {
  const user = await User.findAll({
    where: {
      email: email,
    },
  });

  if (user.length) return user;
  if (!user.length) return false;
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

  // check for email in database
  const found = await checkEmail(email);
  if (found) return { error: "Email already exists", status: 400, user: null };

  // hash user password and save user to database
  const hash = await bcrypt.hash(password, salt);
  const user = await User.create({
    name,
    email,
    password: hash,
    photo,
  });
  if (user) return { error: null, status: 200, user: { name, email, photo } };
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
  // check if email exists in database
  const user = await checkEmail(email);
  if (!user)
    return { error: "Could not find user with that email", status: 400 };
  const { name, photo } = user[0].dataValues;
  // return just user info
  if (!password) return user;
  // check user password against hash
  const isAuth = await bcrypt.compare(password, user[0].dataValues.password);
  if (isAuth) return { error: null, status: 200, user: { name, email, photo } };
  if (!isAuth) return { error: "Could not authorize user", status: 400 };
};
