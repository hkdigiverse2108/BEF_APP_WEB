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

  const { data: user } = useGetApiQuery(
    {
      url: `${URL_KEYS.USER.ID}${userData?._id}`,
    },
    {
      skip: !userData?._id,
    }
  );
  const UserData = user?.data;

  const data = (isConfirmationDrawer?.data || {}) as ContestCore;

  const [PostApi, { isLoading }] = usePostApiMutation();

  // Contest fee is GST Inclusive (no extra tax added on top)
  const baseAmount = Number(data?.fees || 0);
  const payableAmount = baseAmount.toFixed(2);

  const handleJoinButton = async () => {
    // If guest user, redirect to login first
    if (!userData?._id) {
      dispatch(setConfirmationDrawer({ open: false, data: {} }));
      Storage.setItem("pending_contest_join", JSON.stringify(data));
      navigate(ROUTES.AUTH.LOGIN, { state: { returnToContest: true, contestData: data } });
      return;
    }

    try {
      if (baseAmount === 0 || Number(UserData?.walletBalance) >= Number(payableAmount)) {
        if (Number(payableAmount) !== 0) {
          const balancePayload = {
            contestId: data?._id,
            amount: Number(payableAmount),
            title: data?.name,
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
          ...(data?.payload || {}),
          ...existingLsData,
        };

        const res = await PostApi({ url: URL_KEYS.QA.ADD, data: payload });

        if (res?.data?.status === HTTP_STATUS.OK) {
          Storage.removeItem(STORAGE_KEYS.CONTEST_QA);
          Storage.removeItem("pending_contest_join");
          AntdNotification(notification, "success", "Contest joined successfully!");
          dispatch(setConfirmationDrawer({ open: false, data: {} }));
          navigate(ROUTES.CONTEST.SUCCESS, {
            state: {
              contest: data,
              payableAmount,
              paymentMethod: Number(payableAmount) > 0 ? "Wallet Balance" : "Free Entry",
              transactionId: res?.data?.data?._id || `TXN-${Date.now().toString().slice(-6)}`,
              joinedAt: new Date().toISOString(),
            },
          });
        }
      } else {
        // Auto-redirect setup: save contest data and redirect to recharge
        Storage.setItem("pending_contest_join", JSON.stringify(data));
        navigate(ROUTES.RECHARGE.RECHARGE, { state: { returnToContest: true, contestData: data } });
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
            <div className="inline-block bg-white text-black font-normal px-4 py-1 rounded">{data?.name || " Mega Contest"}</div>
          </div>

          {/* Body */}
          <div className="p-3 sm:p-6">
            <div className="space-y-3">
              <div className="space-y-1 bg-white p-3 rounded-lg">
                <div className="flex justify-between text-gray-800 text-sm font-semibold">
                  <span>Entry Fee</span>
                  <span>₹{payableAmount}</span>
                </div>
                <div className="flex justify-between text-gray-500 text-xs font-medium pt-0.5">
                  <span>GST (18%)</span>
                  <span className="text-emerald-600 font-semibold">Included</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-semibold text-xl">
                  <span>Total Pay</span>
                  <span className="text-green-600 font-bold">₹{payableAmount}</span>
                </div>

                <div className="mt-4 border border-red-200 bg-red-50 rounded-md p-3 text-xs text-gray-600 flex items-start gap-2">
                  <ExclamationCircleOutlined className="text-red-500 mt-0.5" />
                  <p>By joining the test, you confirm that you agree to our T&C.</p>
                </div>
              </div>

              <FormButton
                id="btn-confirm-join-contest"
                name="btn_confirm_join_contest"
                data-track="join_contest_confirm_click"
                loading={isLoading}
                text="JOIN CONTEST"
                htmlType="submit"
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
