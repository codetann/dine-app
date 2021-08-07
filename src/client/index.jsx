import React from "react";
import ReactDOM from "react-dom";
import { CloudinaryContext } from "cloudinary-react";
import { ChakraProvider } from "@chakra-ui/react";
import AppContextProvider from "./providers/AppContextProvider";
import App from "./App";

const Root = () => {
  return (
    <React.StrictMode>
      <AppContextProvider>
        <CloudinaryContext cloudName={process.env.REACT_APP_CLOUD_NAME}>
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </CloudinaryContext>
      </AppContextProvider>
    </React.StrictMode>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));
