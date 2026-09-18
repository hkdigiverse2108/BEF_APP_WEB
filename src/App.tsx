import "@ant-design/v5-patch-for-react-19";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { Router } from "./Routers";
import { Store } from "./Store/Store";

const theme = createTheme({
  palette: {
    primary: {
      light: "#3b72c9",
      main: "#124699",
      dark: "#0e387a",
      contrastText: "#fff",
    },
  },
  components: {
    MuiTabs: {
      styleOverrides: {
        indicator: {
          background:
            "linear-gradient(90deg, var(--color-primary), var(--color-success))",
          height: "2px",
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },

});

const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#124699",
        },
        components: {
          Avatar: {
            groupOverlapping: -25,
          },
        },
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={Store}>
          <RouterProvider router={Router} />
        </Provider>
      </ThemeProvider>
    </ConfigProvider>
  );
};

export default App;
