import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/index.ts";
import {
  Box,
  ChakraProvider,
  extendTheme,
  ThemeOverride,
} from "@chakra-ui/react";

const style: ThemeOverride = {
  colors: {
    primary: {
      active: "#04A51E",
      disable: "#005E0E",
    },
    secondary: "#545454",
    background: "#1D1D1D",
    card: "#262626",
  },
  fonts: {
    heading: `"Plus Jakarta Sans", sans-serif`,
    body: `"Plus Jakarta Sans", sans-serif`,
    mono: `"Plus Jakarta Sans", sans-serif`,
  },
};

const theme = extendTheme(style satisfies ThemeOverride);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Box className="container">
          <App />
        </Box>
      </ChakraProvider>
    </Provider>
  </StrictMode>
);
