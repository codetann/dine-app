import jwt from "jsonwebtoken";
import { insertNewUser, checkUser } from "../database/util";

const POST = {
  /**
   * Checks if there is a user with the email in database.
   * If there is, it will then compair the hash password to the password.
   *
   * @param {*} req express request
   * @param {*} res express response
   *
   * TODO - add jwt or passport.js
   */
  login: async (req, res) => {
    const { email, password } = req.body;

    // validate values
    if (!email || !password)
      return res.status(400).send("missing email or password");

    // checks if user is in database and compares their password to the hash
    const response = await checkUser(email, password);

    // create json web token
    const token = jwt.sign(
      { email, name: response.user.name },
      process.env.TOKEN_KEY,
      {
        expiresIn: "5h",
      }
    );

    // data to send back to client
    const data = { ...response.user, token };

    // send client responses
    if (response.status === 200) {
      res.cookie("jwt", token);
      res.status(200).json(data);
    }
    if (response.status === 400) res.status(400).send(response.error);
  },

  /**
   * Function inserts a new user into the database and sends back a status code of 200
   *
   * @param {*} req express request
   * @param {*} res express response
   */
  signup: async (req, res) => {
    const { name, email, password } = req.body;

    // throw error if missing required values
    if (!name || !email || !password)
      return res.status(400).send("missing values");

    //  adds new user to the database and hashes the password
    const response = await insertNewUser(name, email, password);

    // create json web token
    const token = jwt.sign({ email, name }, process.env.TOKEN_KEY, {
      expiresIn: "5h",
    });

    const data = { ...response.user, token };

    // send client responses
    if (response.status === 200) {
      res.cookie("jwt", token);
      res.status(200).json(data);
    }
    if (response.status === 400) res.status(400).send(response.error);
  },
};

export default {
  POST,
};
