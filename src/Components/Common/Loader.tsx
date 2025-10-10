import { Spin } from "antd";

const Loader = () => {
  return (
    <div className="flex w-screen h-screen  justify-center items-center">
      <Spin size="large" />
    </div>
  );
};

export default Loader;
