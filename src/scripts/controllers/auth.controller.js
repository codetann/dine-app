import { insertUser, findUser } from "../api/database";

/* Signup New User */
export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) throw new Error("missing values");
    const user = await insertUser(name, email, password);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).send("Email already exists");
  }
};

/* Login Existing User */
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) throw new Error("missing email / password");
    const user = await findUser(email, password);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).send("Email or password is incorrect");
  }
};
