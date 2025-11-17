import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const SpinLoader = () => {
  return (
    <div className="">
      <Spin indicator={<LoadingOutlined spin />} size="large" />
    </div>
  );
};

export default SpinLoader;
