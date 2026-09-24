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
      light: "#2b63b8",
      main: "#114598",
      dark: "#0e387a",
      contrastText: "#fff",
    },
    secondary: {
      light: "#f1f6fd",
      main: "#f68122",
      dark: "#c15000",
      contrastText: "#14213d",
    },
    text: {
      primary: "#14213d",
      secondary: "#5b6577",
    },
  },
  components: {
    MuiTabs: {
      styleOverrides: {
        indicator: {
          background: "#114598",
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
          colorPrimary: "#114598",
          borderRadius: 12,
          fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
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
