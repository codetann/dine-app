/**
 * This module contains all the functions used for adding, updating, and deleting from the database.
 *
 * The functions are used in the controller files based on the endpoint provided.
 *
 * TODO - add check for new users so there are not duplicate emails (use unique key in database)
 */

import bcrypt from "bcrypt";
import { User } from "./index";

const _checkEmail = async (email) => {
  try {
    const user = await User.findAll({
      where: {
        email: email,
      },
    });
    if (user.length === 1) return user;
    if (!user.length === 0) return false;
  } catch (err) {
    console.error(err);
  }
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

  try {
    const user = await _checkEmail(email);
    if (user) throw new Error("email already exists");
    const hash = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      name,
      email,
      password: hash,
      photo,
    });
    return newUser;
  } catch (err) {
    console.error(err);
  }
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
  try {
    const user = await _checkEmail(email);
    if (!user) throw new Error("could not find email");
    const match = await bcrypt.compare(password, user[0].dataValues.password);
    if (!match) throw new Error("password is incorrect");
    if (match) return user;
  } catch (err) {
    console.error(err);
  }
  // // check if email exists in database
  // const user = await _checkEmail(email);
  // if (!user)
  //   return { error: "Could not find user with that email", status: 400 };
  // const { name, photo } = user[0].dataValues;
  // // return just user info
  // if (!password) return user;
  // // check user password against hash
  // const isAuth = await bcrypt.compare(password, user[0].dataValues.password);
  // if (isAuth) return { error: null, status: 200, user: { name, email, photo } };
  // if (!isAuth) return { error: "Could not authorize user", status: 400 };
};
