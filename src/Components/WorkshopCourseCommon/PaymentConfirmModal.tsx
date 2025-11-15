import { Modal } from "antd";
import { ImagePath, ROUTES, STORAGE_KEYS } from "../../Constants";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { setPaymentConfirmModal } from "../../Store/Slices/DrawerSlice";
import { FormButton } from "../../Attribute/FormFields";
import type { PurchaseData } from "../../Types";
import type { FC } from "react";
import { Storage } from "../../Utils";
import { useNavigate } from "react-router-dom";

interface PaymentConfirmModalProps {
  data: PurchaseData;
  isDiscountPrice: boolean;
  amountToPay: number;
}

const PaymentConfirmModal: FC<PaymentConfirmModalProps> = ({
  data,
  isDiscountPrice,
  amountToPay,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isPaymentConfirmModal } = useAppSelector((state) => state.drawer);

  const userFromLs = JSON.parse(Storage.getItem(STORAGE_KEYS?.USER) || "");
  const userWalletBalance = userFromLs?.walletBalance;

  const isSufficientBalance = userWalletBalance >= amountToPay ? true : false;

  console.log("userWalletAmount", userWalletBalance);

  const handlePayButton = async () => {
    try {
      // dispatch(setPaymentConfirmModal());
      if (isSufficientBalance) {
      } else {
        navigate(ROUTES.RECHARGE.RECHARGE);
      }
    } catch (error) {}
  };

  const balanceMessage = isSufficientBalance
    ? "Nice! You’re all set to buy this 🎉"
    : "Uh-oh! Your wallet needs a little Recharge 💸";

  return (
    <Modal
      centered
      open={isPaymentConfirmModal}
      onCancel={() => dispatch(setPaymentConfirmModal())}
      footer={null}
      width={{
        xs: "90%",
        sm: "80%",
        md: "70%",
        lg: "60%",
        xl: "50%",
        xxl: "30%",
      }}
      className="p-0!"
    >
      <div className=" flex flex-col items-center justify-center min-h-full">
        <div
          className="w-full p-3 sm:p-6 rounded-2xl! space-y-5 overflow-hidden border border-gray-200 bg-white bg-cover bg-center"
          style={{
            backgroundImage: `url(${ImagePath}confirmation/Confirmation-bg.png)`,
          }}
        >
          {/* Header */}
          <div className="text-white text-center">
            <h2 className="text-2xl font-normal">Confirm Payment</h2>
          </div>

          {/* Body */}
          <div className=" flex flex-col gap-6">
            <div className="bg-white space-y-1 rounded-md p-6 ">
              <div className=" flex  justify-between gap-5 text-lg">
                <p className="font-semibold">Available Balance :</p>
                <p
                  className={` font-semibold  ${
                    isSufficientBalance ? "text-success" : "text-danger"
                  } `}
                >
                  {userWalletBalance}
                </p>
              </div>
              <span className="border-b border-primary flex" />
              <div>
                <p
                  className={`${
                    isSufficientBalance ? "text-success" : "text-danger"
                  } `}
                >
                  {balanceMessage}
                </p>
              </div>
            </div>
            {/* {isRefferApplyed && ( */}
            {/* )} */}
            <div className="bg-white space-y-1 rounded-md p-6 text-lg">
              <div className=" flex  justify-between gap-5">
                <p className="font-semibold">Discount</p>
                <p className=" font-normal">
                  -
                  {isDiscountPrice
                    ? Number(data?.price?.price) -
                      Number(data?.price?.discountPrice)
                    : Number(data?.price?.price) -
                      Number(data?.price?.payingPrice)}{" "}
                </p>
              </div>
              <span className="border-b border-primary flex" />

              <div className=" flex  justify-between gap-5">
                <p className="font-semibold">Total Amount To Pay</p>
                <p className="text-success font-normal">{amountToPay}</p>
              </div>
            </div>
          </div>

          <FormButton
            onClick={() => handlePayButton()}
            text={`${isSufficientBalance ? "Confirm Payment" : "Add Balance"} `}
            className="custom-button button button--mimas text-center w-full !p-4 !h-12 uppercase flex items-end-safe"
          />
        </div>
      </div>
    </Modal>
  );
};

export default PaymentConfirmModal;
