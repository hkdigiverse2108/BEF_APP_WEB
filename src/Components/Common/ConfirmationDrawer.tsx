import { Drawer, notification } from "antd";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { setConfirmationDrawer } from "../../Store/Slices/DrawerSlice";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { FormButton } from "../../Attribute/FormFields";
import { HTTP_STATUS, ImagePath, ROUTES, STORAGE_KEYS, URL_KEYS } from "../../Constants";
import { AntdNotification, Storage } from "../../Utils";
import { useGetApiQuery, usePostApiMutation } from "../../Api/CommonApi";
import { useNavigate } from "react-router-dom";
import type { ContestCore } from "../../Types";

const ConfirmationDrawer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isConfirmationDrawer } = useAppSelector((state) => state.drawer);
  const { user: userData } = useAppSelector((state) => state.auth);

  const { data: user } = useGetApiQuery({
    url: `${URL_KEYS.USER.ID}${userData._id}`,
  });
  const UserData = user?.data;

  const { data }: { data: ContestCore } = isConfirmationDrawer;

  const [PostApi, { isLoading }] = usePostApiMutation();

  const baseAmount = Number(data.fees || 0);
  const gstRate = 0.18;

  const amount = baseAmount.toFixed(2);
  const totalAmount = (baseAmount * (1 + gstRate)).toFixed(2);
  const totalGST = (baseAmount * gstRate).toFixed(2);

  const handleJoinButton = async () => {
    console.log(UserData?.walletBalance);
    console.log(totalAmount);

    try {
      if (Number(UserData?.walletBalance) >= Number(totalAmount)) {
        if (Number(amount) !== 0) {
          const balancePayload = {
            contestId: data._id,
            amount: Number(totalAmount),
            title: data.name,
            transactionStatus: "success",
            transactionType: "withdraw",
            earningType: "contestPaidUser",
          };
          await PostApi({
            url: URL_KEYS.TRANSACTION.ADD,
            data: balancePayload,
          });
        }

        const existingLsData = JSON.parse(Storage.getItem(STORAGE_KEYS.CONTEST_QA) || "{}");
        const payload = {
          ...data.payload,
          ...existingLsData,
        };

        const res = await PostApi({ url: URL_KEYS.QA.ADD, data: payload });

        if (res?.data?.status === HTTP_STATUS.OK) {
          Storage.removeItem(STORAGE_KEYS.CONTEST_QA);
          AntdNotification(notification, "success", "join more contests to complete win more");
          dispatch(setConfirmationDrawer({ open: false, data: {} }));
          navigate(ROUTES.CONTEST.MY_CONTEST);
        }
      } else {
        // AntdNotification(notification, "info", "Insufficient wallet balance to join this contest. Please add funds to your wallet.");
        navigate(ROUTES.RECHARGE.RECHARGE);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Drawer placement="right" size="large" onClose={() => dispatch(setConfirmationDrawer({ open: false, data: {} }))} open={isConfirmationDrawer.open} className="!p-0">
      <div className="flex flex-col items-center justify-center min-h-full">
        <div
          className="max-w-[380px] rounded-lg overflow-hidden shadow-2xl bg-white bg-cover bg-top"
          style={{
            backgroundImage: `url(${ImagePath}confirmation/Confirmation-bg.png)`,
          }}
        >
          {/* Header */}
          <div className="text-white text-center p-3 sm:p-6 !pb-0">
            <h2 className="text-3xl font-normal">Confirmation</h2>
            <div className="inline-block bg-white text-black font-normal px-4 py-1 rounded">{data.name || " Mega Contest"}</div>
          </div>

          {/* Body */}
          <div className="p-3 sm:p-6">
            <div className="space-y-3">
              <div className="space-y-1 bg-white p-3 rounded-lg">
                <div className="flex justify-between text-gray-800 text-sm font-semibold">
                  <span>Entry Fee</span>
                  <span>₹{amount}</span>
                </div>
                <div className="flex justify-between text-gray-800 text-sm font-bold">
                  <span>Govt. Tax (18% GST)</span>
                  <span>₹{totalGST}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-normal text-xl">
                  <span>Total Pay</span>
                  <span className="text-green-600">₹{totalAmount}</span>
                </div>

                <div className="mt-4 border border-red-200 bg-red-50 rounded-md p-3 text-xs text-gray-600 flex items-start gap-2">
                  <ExclamationCircleOutlined className="text-red-500 mt-0.5" />
                  <p>By joining the test, you confirm that you are agree our T&C.</p>
                </div>
              </div>

              <FormButton loading={isLoading} text="JOIN CONTEST" htmlType="submit" onClick={handleJoinButton} className="custom-button button button--mimas text-center w-full !p-4 !h-12 uppercase flex items-end-safe !bg-white" />
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default ConfirmationDrawer;
