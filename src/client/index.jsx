import React from "react";
import ReactDOM from "react-dom";
import { CloudinaryContext } from "cloudinary-react";
import { ChakraProvider } from "@chakra-ui/react";
import AppContextProvider from "./providers/AppContextProvider";
import StoreProvider from "./providers/StoreProvider";
import App from "./App";

const Root = () => {
  return (
    <React.StrictMode>
      <ChakraProvider>
        <StoreProvider>
          <CloudinaryContext cloudName={process.env.REACT_APP_CLOUD_NAME}>
            <App />
          </CloudinaryContext>
        </StoreProvider>
      </ChakraProvider>
    </React.StrictMode>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));
