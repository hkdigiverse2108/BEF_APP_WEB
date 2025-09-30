import { RouterProvider } from "react-router-dom";
import { Router } from "./Routers";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { Store } from "./Store/Store";

const App = () => {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#e76f1d",
          },
        }}
      >
        <Provider store={Store} >
          <RouterProvider router={Router} />
        </Provider>
      </ConfigProvider>
    </>
  );
};

export default App;
