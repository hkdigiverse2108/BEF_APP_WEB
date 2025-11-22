import { Col, Empty, Form, Row, Skeleton, Switch } from "antd";
import { useState } from "react";
import { AiFillLock } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDeleteApiMutation, useGetApiQuery, usePostApiMutation } from "../../Api/CommonApi";
import { FormButton, FormInput, FormSelect } from "../../Attribute/FormFields";
import { CardHeader } from "../../Components/Common/CardHeader";
import { HTTP_STATUS, ImagePath, ROUTES, URL_KEYS } from "../../Constants";
import { AccountTypeOptions } from "../../Data";
import { useAppSelector } from "../../Store/hooks";
import type { BankAccountApiResponse, BankAccountData } from "../../Types";
import BankAccountModal from "./BankAccountModal";

const GetScholarship = () => {
  const [amount, setAmount] = useState("");
  const [isBankAccount, setBankAccount] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [BankAccountModalOpen, setBankAccountModalOpen] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { genderWiseProfileImage, user } = useAppSelector((state) => state.auth);
  const [PostApi, { isLoading }] = usePostApiMutation({});
  const [DeleteApi] = useDeleteApiMutation({});

  const { data: kyc } = useGetApiQuery({ url: `${URL_KEYS.KYC.ALL}?page=1&limit=1` });
  const KYCData = kyc?.data?.kyc_data[0];

  const { data } = useGetApiQuery({ url: `${URL_KEYS.USER.ID}${user._id}` });
  const userData = data?.data;

  const { data: bankAccount, isLoading: bankAccountLoading, refetch } = useGetApiQuery<BankAccountApiResponse>({ url: URL_KEYS.BANK_ACCOUNT.ALL });
  const bankAccountData = bankAccount?.data;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setAmount(value);
  };

  const handleFormSubmit = async (values: BankAccountData) => {
    const res = await PostApi(editId ? { url: URL_KEYS.BANK_ACCOUNT.EDIT, data: { bankAccountId: editId, ...values } } : { url: URL_KEYS.BANK_ACCOUNT.ADD, data: values });
    if (res?.data?.status === HTTP_STATUS.OK) {
      form.resetFields();
      setBankAccount(false);
      setEditId(null);
      refetch();
    }
  };

  const handleEdit = (item: BankAccountData) => {
    setEditId(item._id);
    setBankAccount(true);
    form.setFieldsValue({
      accountHolderName: item.accountHolderName,
      bankName: item.bankName,
      branchName: item.branchName,
      accountNumber: item.accountNumber,
      ifscCode: item.ifscCode,
      accountType: item.accountType,
      isDefault: item.isDefault,
    });
  };

  const openDeleteModal = (id: string) => {
    setEditId(id);
    setBankAccountModalOpen(true);
  };

  const handleDelete = async () => {
    if (!editId) return;
    const res = await DeleteApi({ url: `${URL_KEYS.BANK_ACCOUNT.DELETE}/${editId}`, method: "DELETE" });
    if (res?.data?.status === HTTP_STATUS.OK) {
      setBankAccountModalOpen(false);
      setEditId(null);
      refetch();
    }
  };

  const handleCashWithdrawal = async () => {
    const bankData = bankAccountData?.bank_account_data.find((item: BankAccountData) => item.isDefault === true);
    const res = await PostApi({ url: URL_KEYS.WITHDRAW.REQUEST, data: { amount, bankAccountId: bankData?._id } });
    if (res?.data?.status === HTTP_STATUS.OK) {
      form.resetFields();
      refetch();
    }
  };

  return (
    <div className="sub-container pt-4 scholarship">
      <CardHeader title="Get Scholarship" />
      <hr className="text-card-border mt-4" />
      {!["verified"].includes(KYCData?.status) ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="rounded-xl p-8 max-w-sm text-center shadow-xl bg-input-box">
            <div className="flex justify-center mb-4">
              <div className="bg-linear-to-r from-(--primary) to-(--success) text-white p-4 rounded-full">
                <AiFillLock className="w-10 h-10 opacity-80" />
              </div>
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-2">You are not verified</h2>
            <p className="text-gray-600 mb-6 capitalize">Please complete your KYC process.</p>
            <FormButton onClick={() => navigate(ROUTES.KYC.KYC)} text="Go to KYC Verification" className="custom-button w-full button button--mimas text-center !p-4 !h-13" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6 pt-7">
          <div className="relative bg-input-box rounded-xl shadow-sm p-3 sm:p-7 border border-gray-200 lg:w-1/3 h-fit">
            <div className="relative bg-white p-4 rounded-lg z-20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img src={userData?.profileImage || genderWiseProfileImage} alt="profile" className="w-12 h-12 rounded-xl" />
                  <div>
                    <p className="text-sm text-gray-600 capitalize">
                      {userData?.firstName} {userData?.lastName}
                    </p>
                    <h3 className="text-lg font-semibold text-gray-900">₹{userData?.walletBalance.toFixed(2)}</h3>
                  </div>
                </div>
                <Link to={ROUTES.HISTORY.HISTORY} className="bg-input-box font-semibold text-sm p-2 px-4 rounded">
                  History
                </Link>
              </div>
              <hr className="my-4 text-card-border" />
              <div className="text-center font-normal p-5">
                <input type="text" value={amount} onChange={handleAmountChange} placeholder="₹0.0" className="text-center text-3xl font-semibold text-gray-800 w-full outline-none border-none focus:ring-0" />
                <p className="mt-2 text-base ">Enter The Amount You Want To Withdraw</p>
                {amount && +amount < 1 && (
                  <div className="mt-4 border border-red-300 bg-red-50 text-red-700 text-sm rounded-md px-4 py-2 inline-flex items-center gap-2">
                    <span>⚠️</span> minimum withdrawal amount ₹1.00
                  </div>
                )}
                {amount && Number(amount) > userData?.walletBalance && (
                  <div className="mt-4 border border-red-300 bg-red-50 text-red-700 text-sm rounded-md px-4 py-2 inline-flex items-center gap-2">
                    <span>⚠️</span> You cannot withdraw more than your wallet balance.
                  </div>
                )}
              </div>
              {amount && Number(amount) >= 1 && Number(amount) <= Number(userData?.walletBalance) && <FormButton onClick={() => handleCashWithdrawal()} text="Cash Withdrawal" className="custom-button w-full button button--mimas text-center !p-4 !h-13 uppercase" />}
            </div>
            <div className="absolute bottom-0 left-0 w-full">
              <img src={`${ImagePath}Union.png`} alt="Menu bg" className="w-full h-full object-cover z-0" />
            </div>
          </div>

          <div className="bg-input-box rounded-xl shadow-sm p-3 sm:p-7 border border-gray-200 lg:w-2/3">
            <div className="flex justify-end">
              <FormButton onClick={() => setBankAccount(!isBankAccount)} text="Add Bank Account" className="custom-button w-full sm:w-fit button button--mimas text-center !p-4 !h-12 uppercase" />
            </div>
            {isBankAccount && (
              <Form form={form} layout="vertical" onFinish={handleFormSubmit} className="!w-full">
                <Row gutter={16}>
                  <Col span={24} md={12}>
                    <FormInput name="accountHolderName" label="Account Holder Name" placeholder="Enter Your Account Holder Name" className="!bg-white" rules={[{ required: true, message: "Account holder name is required" }]} />
                  </Col>
                  <Col span={24} md={12}>
                    <FormInput
                      name="accountNumber"
                      label="Account Number"
                      type="number"
                      placeholder="Enter Your Account Number"
                      className="!bg-white"
                      rules={[
                        { required: true, message: "Account number is required" },
                        { pattern: /^[0-9]{9,18}$/, message: "Enter a valid account number" },
                      ]}
                    />
                  </Col>
                  <Col span={24} md={12}>
                    <FormInput name="bankName" label="Bank Name" placeholder="Enter Your Bank Name" className="!bg-white" rules={[{ required: true, message: "Bank name is required" }]} />
                  </Col>
                  <Col span={24} md={12}>
                    <FormInput name="branchName" label="Branch Name" placeholder="Enter Your Branch Name" className="!bg-white" rules={[{ required: true, message: "Branch name is required" }]} />
                  </Col>
                  <Col span={24} md={12}>
                    <FormInput
                      name="ifscCode"
                      label="IFSC Code"
                      placeholder="Enter Your IFSC Code"
                      className="!bg-white"
                      rules={[
                        { required: true, message: "IFSC code is required" },
                        {
                          pattern: /^[A-Z]{4}0[A-Z0-9]{6}$/,
                          message: "Enter a valid IFSC code (e.g., HDFC0001234)",
                        },
                      ]}
                    />
                  </Col>
                  <Col span={24} md={12}>
                    <FormSelect name="accountType" label="Account Type" options={AccountTypeOptions} rules={[{ required: true, message: "Account type is required" }]} />
                  </Col>
                  <Col span={24}>
                    <Form.Item label="default Back" name="isDefault" valuePropName="checked" initialValue={false}>
                      <Switch />
                    </Form.Item>
                  </Col>
                  <span className="border-t border-primary flex w-full mb-6" />
                  <Col span={24}>
                    <Form.Item label={null} className="text-center">
                      <FormButton loading={isLoading} htmlType="submit" text={editId ? "Update" : "Save"} className="custom-button w-full sm:w-40 button button--mimas text-center !p-4 !h-13 uppercase" />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            )}
            <div className={`grid ${bankAccountData?.bank_account_data?.length !== 0 ? "xl:grid-cols-2" : "grid-cols-1"}  gap-4 pt-4`}>
              {bankAccountLoading ? (
                [...Array(2)].map((_, i) => <Skeleton.Node key={i} active style={{ width: "100%", height: 140, borderRadius: 10 }} />)
              ) : bankAccountData?.bank_account_data?.length !== 0 ? (
                bankAccountData?.bank_account_data?.map((item, index) => (
                  <div key={index} className="relative bg-white p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <p className="font-medium text-lg capitalize">{item?.bankName}</p>
                      {item?.isDefault && <div className="bg-linear-to-r from-(--primary) to-(--success) text-white font-medium text-sm p-1 px-4 rounded">Default</div>}
                    </div>
                    <hr className="my-4 text-card-border" />
                    <div className="font-medium">
                      <ul className="space-y-1 text-stone-900">
                        {item?.bankName && (
                          <li className="capitalize">
                            Bank Name :- <span className="text-normal text-stone-500">{item?.bankName}</span>
                          </li>
                        )}
                        {item?.accountHolderName && (
                          <li className="capitalize">
                            Account Holder Name :- <span className="text-normal text-stone-500">{item?.accountHolderName} </span>
                          </li>
                        )}
                        {item?.branchName && (
                          <li className="capitalize">
                            Bank Branch Name :- <span className="text-normal text-stone-500">{item?.branchName}</span>
                          </li>
                        )}
                        {item?.accountNumber && (
                          <li className="capitalize">
                            Account Number :- <span className="text-normal text-stone-500">{item?.accountNumber}</span>
                          </li>
                        )}
                        {item?.ifscCode && (
                          <li className="capitalize">
                            IFSC Code :- <span className="text-normal text-stone-500">{item?.ifscCode}</span>
                          </li>
                        )}
                        {item?.accountType && (
                          <li className="capitalize">
                            Account Type :- <span className="text-normal text-stone-500">{item?.accountType}</span>
                          </li>
                        )}
                      </ul>
                      <div className="flex items-center justify-end gap-3 pt-3">
                        <div className="bg-input-box font-semibold text-sm p-2 px-4 rounded" onClick={() => handleEdit(item)}>
                          Edit
                        </div>
                        <div className="bg-red-100 text-red-500 font-semibold text-sm p-2 px-4 rounded" onClick={() => openDeleteModal(item._id)}>
                          Delete
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full flex justify-center">
                  <Empty />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <BankAccountModal BankAccountModalOpen={BankAccountModalOpen} setBankAccountModalOpen={setBankAccountModalOpen} onConfirm={handleDelete} />
    </div>
  );
};

export default GetScholarship;
