import { FormSelect } from "../../Attribute/FormFields";
import { CardHeader } from "../../Components/Common/CardHeader";
import { ImagePath } from "../../Constants";
import { HistoryOptions } from "../../Data";

const History = () => {
  return (
    <div className="sub-container pt-8 question-section">
      <CardHeader title="Transaction History" />
      <div className="bg-input-box rounded-xl p-3 sm:p-6 mt-5">
        <div className="bg-white rounded-xl p-3 sm:p-5">
          <div className="w-full flex justify-end">
            <FormSelect name="Language" placeholder="History" options={HistoryOptions} className="w-fit" value="english" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex flex-wrap justify-between items-center gap-3 bg-input-box border border-card-border p-3 rounded-lg">
              <div className="flex justify-between items-center gap-3">
                <img src={`${ImagePath}user/User1.png`} alt="profile" className="w-10 h-10 rounded-xl" />
                <div>
                  <span className="text-md font-bold capitalize">Shopping Product</span>
                  <p className="capitalize flex text-xs">05 August, 10:00AM</p>
                </div>
              </div>
              <div className="">
                <p className="text-base font-bold text-danger">- ₹2500</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-between items-center gap-3 bg-input-box border border-card-border p-3 rounded-lg">
              <div className="flex justify-between items-center gap-3">
                <img src={`${ImagePath}user/User1.png`} alt="profile" className="w-10 h-10 rounded-xl" />
                <div>
                  <span className="text-md font-bold capitalize">Shopping Product</span>
                  <p className="capitalize flex text-xs">05 August, 10:00AM</p>
                </div>
              </div>
              <div className="">
                <p className="text-base font-bold text-danger">- ₹2500</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-between items-center gap-3 bg-input-box border border-card-border p-3 rounded-lg">
              <div className="flex justify-between items-center gap-3">
                <img src={`${ImagePath}user/User1.png`} alt="profile" className="w-10 h-10 rounded-xl" />
                <div>
                  <span className="text-md font-bold capitalize">Shopping Product</span>
                  <p className="capitalize flex text-xs">05 August, 10:00AM</p>
                </div>
              </div>
              <div className="">
                <p className="text-base font-bold text-danger">- ₹2500</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-between items-center gap-3 bg-input-box border border-card-border p-3 rounded-lg">
              <div className="flex justify-between items-center gap-3">
                <img src={`${ImagePath}user/User1.png`} alt="profile" className="w-10 h-10 rounded-xl" />
                <div>
                  <span className="text-md font-bold capitalize">Shopping Product</span>
                  <p className="capitalize flex text-xs">05 August, 10:00AM</p>
                </div>
              </div>
              <div className="">
                <p className="text-base font-bold text-danger">- ₹2500</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-between items-center gap-3 bg-input-box border border-card-border p-3 rounded-lg">
              <div className="flex justify-between items-center gap-3">
                <img src={`${ImagePath}user/User1.png`} alt="profile" className="w-10 h-10 rounded-xl" />
                <div>
                  <span className="text-md font-bold capitalize">Shopping Product</span>
                  <p className="capitalize flex text-xs">05 August, 10:00AM</p>
                </div>
              </div>
              <div className="">
                <p className="text-base font-bold text-danger">- ₹2500</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-between items-center gap-3 bg-input-box border border-card-border p-3 rounded-lg">
              <div className="flex justify-between items-center gap-3">
                <img src={`${ImagePath}user/User1.png`} alt="profile" className="w-10 h-10 rounded-xl" />
                <div>
                  <span className="text-md font-bold capitalize">Shopping Product</span>
                  <p className="capitalize flex text-xs">05 August, 10:00AM</p>
                </div>
              </div>
              <div className="">
                <p className="text-base font-bold text-danger">- ₹2500</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-between items-center gap-3 bg-input-box border border-card-border p-3 rounded-lg">
              <div className="flex justify-between items-center gap-3">
                <img src={`${ImagePath}user/User1.png`} alt="profile" className="w-10 h-10 rounded-xl" />
                <div>
                  <span className="text-md font-bold capitalize">Shopping Product</span>
                  <p className="capitalize flex text-xs">05 August, 10:00AM</p>
                </div>
              </div>
              <div className="">
                <p className="text-base font-bold text-danger">- ₹2500</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-between items-center gap-3 bg-input-box border border-card-border p-3 rounded-lg">
              <div className="flex justify-between items-center gap-3">
                <img src={`${ImagePath}user/User1.png`} alt="profile" className="w-10 h-10 rounded-xl" />
                <div>
                  <span className="text-md font-bold capitalize">Shopping Product</span>
                  <p className="capitalize flex text-xs">05 August, 10:00AM</p>
                </div>
              </div>
              <div className="">
                <p className="text-base font-bold text-danger">- ₹2500</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-between items-center gap-3 bg-input-box border border-card-border p-3 rounded-lg">
              <div className="flex justify-between items-center gap-3">
                <img src={`${ImagePath}user/User1.png`} alt="profile" className="w-10 h-10 rounded-xl" />
                <div>
                  <span className="text-md font-bold capitalize">Shopping Product</span>
                  <p className="capitalize flex text-xs">05 August, 10:00AM</p>
                </div>
              </div>
              <div className="">
                <p className="text-base font-bold text-danger">- ₹2500</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-between items-center gap-3 bg-input-box border border-card-border p-3 rounded-lg">
              <div className="flex justify-between items-center gap-3">
                <img src={`${ImagePath}user/User1.png`} alt="profile" className="w-10 h-10 rounded-xl" />
                <div>
                  <span className="text-md font-bold capitalize">Shopping Product</span>
                  <p className="capitalize flex text-xs">05 August, 10:00AM</p>
                </div>
              </div>
              <div className="">
                <p className="text-base font-bold text-danger">- ₹2500</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-between items-center gap-3 bg-input-box border border-card-border p-3 rounded-lg">
              <div className="flex justify-between items-center gap-3">
                <img src={`${ImagePath}user/User1.png`} alt="profile" className="w-10 h-10 rounded-xl" />
                <div>
                  <span className="text-md font-bold capitalize">Shopping Product</span>
                  <p className="capitalize flex text-xs">05 August, 10:00AM</p>
                </div>
              </div>
              <div className="">
                <p className="text-base font-bold text-danger">- ₹2500</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-between items-center gap-3 bg-input-box border border-card-border p-3 rounded-lg">
              <div className="flex justify-between items-center gap-3">
                <img src={`${ImagePath}user/User1.png`} alt="profile" className="w-10 h-10 rounded-xl" />
                <div>
                  <span className="text-md font-bold capitalize">Shopping Product</span>
                  <p className="capitalize flex text-xs">05 August, 10:00AM</p>
                </div>
              </div>
              <div className="">
                <p className="text-base font-bold text-danger">- ₹2500</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-between items-center gap-3 bg-input-box border border-card-border p-3 rounded-lg">
              <div className="flex justify-between items-center gap-3">
                <img src={`${ImagePath}user/User1.png`} alt="profile" className="w-10 h-10 rounded-xl" />
                <div>
                  <span className="text-md font-bold capitalize">Shopping Product</span>
                  <p className="capitalize flex text-xs">05 August, 10:00AM</p>
                </div>
              </div>
              <div className="">
                <p className="text-base font-bold text-danger">- ₹2500</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
