import { useState } from "react";
import axios from "axios";

export default function useAuth() {
  const [isAuth, setIsAuth] = useState(false);

  /**
   * Function that logs in a user
   * @param {String} email users email recieved from login page
   * @param {String} password  users plain text password received from locgin page
   * @returns {void} sets isAuth state to true if successfully authorized
   */
  const login = async (email, password) => {
    if (!email || !password) return;
    const res = await axios.post("http://localhost:8050/auth/login", {
      email,
      password,
    });

    console.log(res);
    if (res.status === 200) setIsAuth(true);
  };

  /**
   * Function that will send user data to backend and sign them up
   * @param {Object} formData contains { first, last, email, password, confirmPassword }
   * @returns {void} sets isAuth state to true if successfully authorized
   */
  const signup = async (formData) => {
    const { first, last, email, password } = formData;
    if (!first || !last || !email || !password) return;
    const res = await axios.post("http://localhost:8050/auth/signup", {
      name: `${first} ${last}`,
      email,
      password,
    });
    console.log(res);
    if (res.status === 200) setIsAuth(true);
  };

  /**
   * Function logs out a user
   * @returns {void} sets isAuth to false
   */
  const logout = () => {
    setIsAuth(false);
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // delete cookie
  };

  return { isAuth, login, logout, signup };
}
