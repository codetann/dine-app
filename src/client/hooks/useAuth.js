import { useState, useEffect } from "react";
import axios from "axios";

// check if a cookie exists
const _checkCookie = (cname) => {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    if (ca[i].includes(name)) return ca[i].replace(name, "");
  }
  return null;
};

export default function useAuth() {
  const [isAuth, setIsAuth] = useState(false);
  const [jwt, setJwt] = useState(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const token = _checkCookie("jwt"); // checks if cookie exists and returns it
    const eCookie = _checkCookie("email");

    if (!token) return;

    if (token) {
      setJwt(token);
      setEmail(eCookie);
    }
  }, [isAuth]);

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

    if (res.status === 200) {
      const jwtCookie = `jwt=${res.data.token}; expires=Thu, 31 Dec 2100 12:00:00 UTC;`;
      const emailCookie = `email=${email}; expires=Thu, 31 Dec 2100 12:00:00 UTC;`;

      setIsAuth(true);
      setEmail(email);

      document.cookie = emailCookie;
      document.cookie = jwtCookie;
      console.log(res);
    }
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

  return { isAuth, login, logout, signup, jwt, email };
}
