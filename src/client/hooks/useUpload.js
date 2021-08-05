import { useState } from "react";
import axios from "axios";

export default function useUpload() {
  const [url, setUrl] = useState(null);

  const uploadImage = async (image) => {
    const formData = new FormData();
    const baseUrl = `https://api.Cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/upload`;
    formData.append("file", image);
    formData.append("upload_preset", "u1fcbzde");

    try {
      const res = await axios.post(baseUrl, formData);
      const json = await res.data;
      setUrl(json.secure_url);
    } catch (error) {
      console.log(error);
    }
  };

  return [uploadImage, url];
}
