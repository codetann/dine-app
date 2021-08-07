import { useState } from "react";
import axios from "axios";

const baseURL = "http://localhost:8050";

export default function useApi() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [testing, setTesting] = useState(false);

  /* AUTH ACTIONS */
  const login = async (email, password) => {
    if (!email || !password) return;
    const res = await axios.post(baseURL + "/auth/login", { email, password });
    if (res.status === 200) {
      setIsAuth(true);
      setUser(res.data);
    }
  };
  const signup = async (formData) => {
    const { first, last, email, password } = formData;
    if (!first || !last || !email || !password) return;
    const res = await axios.post(baseURL + "/auth/signup", {
      name: `${first} ${last}`,
      email,
      password,
    });
    if (res.status === 200) {
      setIsAuth(true);
      setUser(res.data);
    }
  };
  const logout = () => {
    setIsAuth(false);
    setUser(null);
  };

  /* API ACTIONS */
  const updateImage = async (image) => {
    const formData = new FormData();
    const cloudinaryURL = `https://api.Cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/upload`;
    formData.append("file", image);
    formData.append("upload_preset", "u1fcbzde");

    try {
      const photo = await axios.post(cloudinaryURL, formData);
      const url = await photo.data.secure_url;
      const newUserData = await axios.post(
        "http://localhost:8050/api/upload/photo",
        {
          url,
          email: user.email,
        }
      );
      console.log(newUserData.data);
      setUser(newUserData.data);
    } catch (error) {
      console.log(error);
    }
  };

  /* TESTING */
  const forceLogin = () => {
    setUser({
      name: "TEST USER",
      email: "TEST@TEST.COM",
      photo: "TEST@TEST.COM",
    });
    setTesting(true);
    setIsAuth(true);
  };

  return {
    AUTH: {
      login,
      signup,
      logout,
      isAuth,
      user,
    },
    API: {
      updateImage,
    },
    TEST: {
      testing,
      forceLogin,
    },
  };
}
