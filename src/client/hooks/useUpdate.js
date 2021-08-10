import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import { useStore } from "../providers/StoreProvider";
import { useHistory } from "react-router-dom";

// internal function to upload image to cloudinary
const _uploadToCloudinary = async (image) => {
  const formData = new FormData();
  const cloudinaryURL = `https://api.Cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/upload`;
  formData.append("file", image);
  formData.append("upload_preset", "u1fcbzde");

  const photo = await axios.post(cloudinaryURL, formData);
  const url = await photo.data.secure_url;
  return url;
};

const useUpdate = () => {
  const toast = useToast();
  const history = useHistory();
  const { setUser, user, setError } = useStore();

  const updateUser = async (info) => {
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
      history.push("/dashboard");

      toast({
        title: "Success",
        description: "Updated user profile successfully",
        position: "top-right",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      setError(error);
      setTimeout(() => {
        setError(null);
      }, 1000);
    }
  };

  return updateUser;
};

export default useUpdate;
