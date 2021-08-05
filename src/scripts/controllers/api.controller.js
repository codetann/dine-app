import { checkUser } from "../database/util.js";

// POST ROUTES //
const dashboard = async (req, res) => {
  const { email } = req.body;

  // find user in db | return user
  const user = await checkUser(email);

  // send user data to client
  res.status(200).json(user);
};

export default {
  POST: {
    dashboard,
  },
};
