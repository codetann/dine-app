import { insertNewUser, checkUser } from "../database/util";

/**
 * Checks if there is a user with the email in database.
 * If there is, it will then compair the hash password to the password.
 *
 * @param {*} req express request
 * @param {*} res express response
 *
 * TODO - add jwt or passport.js
 */
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) throw new Error("missing email / password");
    const user = await checkUser(email, password);
    if (!user) res.status(400).send("login failed");
    if (user) res.status(200).json(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

/**
 * Function inserts a new user into the database and sends back a status code of 200
 *
 * @param {*} req express request
 * @param {*} res express response
 */
export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) throw new Error("missing values");
    const { user } = await insertNewUser(name, email, password);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
