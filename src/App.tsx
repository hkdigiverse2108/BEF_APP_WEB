import { RouterProvider } from "react-router-dom";
import { Router } from "./Routers";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { Store } from "./Store/Store";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { GlobalStyles } from "@mui/system";

const theme = createTheme({
  palette: {
    primary: {
      light: "#feecd7",
      main: "#FE690B",
      dark: "#e76f1d",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: "var(--font-nunito), var(--font-serif)",
  },
});

const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#FE690B",
        },
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            "*": {
              fontFamily: "var(--font-nunito), var(--font-serif)",
            },
          }}
        />
        <Provider store={Store}>
          <RouterProvider router={Router} />
        </Provider>
      </ThemeProvider>
    </ConfigProvider>
  );
};

export default App;
