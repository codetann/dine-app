import { useState } from "react";
import axios from "axios";

const _uploadToCloudinary = async (image) => {
  const formData = new FormData();
  const cloudinaryURL = `https://api.Cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/upload`;
  formData.append("file", image);
  formData.append("upload_preset", "u1fcbzde");

  const photo = await axios.post(cloudinaryURL, formData);
  const url = await photo.data.secure_url;
  return url;
};

const baseURL = "http://localhost:8050";

export default function useApi() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [testing, setTesting] = useState(false);
  const [error, setError] = useState(null);

  /* AUTH ACTIONS */
  const login = async (email, password) => {
    if (!email || !password) return;

    try {
      const res = await axios.post(baseURL + "/auth/login", {
        email,
        password,
      });
      setIsAuth(true);
      setUser(res.data);
    } catch (error) {
      setError("Email or passward are invalid");
      setTimeout(() => {
        setError(null);
      }, 1000);
    }
  };
  const signup = async (formData) => {
    const { first, last, email, password } = formData;
    if (!first || !last || !email || !password) return;

    try {
      const res = await axios.post(baseURL + "/auth/signup", {
        name: `${first} ${last}`,
        email,
        password,
      });
      setIsAuth(true);
      setUser(res.data);
    } catch (error) {
      setError(error);
      setTimeout(() => {
        setError(null);
      }, 1000);
    }
  };
  const logout = () => {
    setIsAuth(false);
    setUser(null);
  };

  /* API ACTIONS */
  const updateInfo = async (info) => {
    if (info.photo) info.photo = await _uploadToCloudinary(info.photo);

    if (!info?.name) delete info.name;
    if (!info?.email) delete info.email;
    if (!info?.photo) delete info.photo;

    try {
      const updatedInfo = await axios.post(
        "http://localhost:8050/api/update/user",
        {
          updates: { ...info },
          email: user.email,
        }
      );

      setUser(updatedInfo.data);
    } catch (error) {
      console.log(error);
      setError(error);
      setTimeout(() => {
        setError(null);
      }, 1000);
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
    user,
    error,
    AUTH: {
      login,
      signup,
      logout,
      isAuth,
    },
    API: {
      updateInfo,
    },
    TEST: {
      testing,
      forceLogin,
    },
  };
}
