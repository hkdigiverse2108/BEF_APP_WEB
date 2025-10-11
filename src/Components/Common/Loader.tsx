import { Spin } from "antd";

const Loader = () => {
  return (
    <div className="flex w-full h-full py-6  justify-center items-center">
      <Spin size="large" />
    </div>
  );
};

export default Loader;
