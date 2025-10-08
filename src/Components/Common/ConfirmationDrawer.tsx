import { Drawer } from "antd";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { setConfirmationDrawer } from "../../Store/Slices/DrawerSlice";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { FormButton } from "../../Attribute/FormFields";
import {
  ImagePath,
  STORAGE_KEYS,
  URL_KEYS,
} from "../../Constants";
import { Storage } from "../../Utils";
import { usePostApiMutation } from "../../Api/CommonApi";

const ConfirmationDrawer = () => {
  const dispatch = useAppDispatch();

  const { isConfirmationDrawer } = useAppSelector((state) => state.drawer);
  const { data } = isConfirmationDrawer;

  const [PostApi] = usePostApiMutation();

  const handleJoinButton = async () => {
    try {
      const existingLsData = JSON.parse(
        Storage.getItem(STORAGE_KEYS.CONTEST_QA) || "{}"
      );
      const payload = {
        ...data.payload,
        ...existingLsData,
      };
      const res = await PostApi({ url: URL_KEYS.QA.ADD, data: payload });
      // if (res.status === HTTP_STATUS.OK) {
      // Storage.removeItem(STORAGE_KEYS.CONTEST_QA);
      // }
      console.log("payload : ", payload, res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Drawer
      placement="right"
      size="large"
      onClose={() => dispatch(setConfirmationDrawer({ open: false, data: {} }))}
      open={isConfirmationDrawer.open}
      className="!p-0"
    >
      <div className="flex flex-col items-center justify-center min-h-full">
        <div
          className="max-w-[380px] rounded-lg overflow-hidden shadow-2xl bg-white bg-cover bg-top"
          style={{
            backgroundImage: `url(${ImagePath}confirmation/Confirmation-bg.png)`,
          }}
        >
          {/* Header */}
          <div className="text-white text-center p-3 sm:p-6 !pb-0">
            <h2 className="text-2xl font-semibold">Confirmation</h2>
            <div className="mt-3 inline-block bg-white text-black font-semibold px-4 py-1 rounded">
              {data.name || " Mega Contest"}
            </div>
            <p className="mt-2 text-white text-sm">
              {data.pricePool || "Prize Pool ₹7,50,000"}
            </p>
          </div>

          {/* Body */}
          <div className="p-3 sm:p-6">
            <div className="space-y-3">
              <div className="space-y-1 bg-white p-3 rounded-lg">
                <div className="flex justify-between text-gray-800 text-sm font-bold">
                  <span>Entry Fee</span>
                  <span>{data.fees || "₹35.00"}</span>
                </div>
                <div className="flex justify-between text-gray-800 text-sm font-bold">
                  <span>Bonus Applied</span>
                  <span>-₹00.00</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-semibold text-xl">
                  <span>Total Pay</span>
                  <span className="text-green-600">
                    {data.fees || "₹35.00"}
                  </span>
                </div>

                <div className="mt-4 border border-red-200 bg-red-50 rounded-md p-3 text-xs text-gray-600 flex items-start gap-2">
                  <ExclamationCircleOutlined className="text-red-500 mt-0.5" />
                  <p>
                    By joining, you confirm you are not a resident of Assam,
                    Odisha, Telangana, Nagaland, or Sikkim, and agree to NBA
                    Fantasy’s T&Cs.
                  </p>
                </div>
              </div>

              <FormButton
                text="JOIN CONTEST"
                onClick={handleJoinButton}
                className="custom-button button button--mimas text-center w-full !p-4 !h-12 uppercase flex items-end-safe !bg-white"
              />
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default ConfirmationDrawer;
