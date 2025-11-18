import { Result } from "antd";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../Constants";
import { FormButton } from "../../Attribute/FormFields";

const PageNotFound = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <NavLink to={ROUTES.HOME}>
            <FormButton
              htmlType="button"
              text="Back Home"
              className="custom-button button button--mimas w-full sm:w-fit h-auto!"
            />
          </NavLink>
        }
      />
    </div>
  );
};

export default PageNotFound;
