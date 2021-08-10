import { useToast } from "@chakra-ui/toast";

const useAlert = () => {
  const toast = useToast();

  const errorAlert = (error) => {
    toast({
      title: "Error",
      description: error,
      position: "top-right",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };

  return { errorAlert };
};

export default useAlert;
