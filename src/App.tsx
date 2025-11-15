import "@ant-design/v5-patch-for-react-19";
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
      light: "#FFB27C",
      main: "#FE6E13",
      dark: "#FE690B",
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
  // typography: {
  //   // fontFamily: "var(--font-nunito), var(--font-serif)",
  // },
});

const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#FE6E13",
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
        <GlobalStyles
          styles={{
            "*": {
              // fontFamily: "var(--font-nunito), var(--font-serif)",
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
