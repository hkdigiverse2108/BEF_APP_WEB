import { Drawer } from "antd";
import { useState } from "react";
import { FormButton } from "../../Attribute/FormFields";
import { setContestFilterDrawer } from "../../Store/Slices/DrawerSlice";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";

const ContestFilterDrawer = () => {
  const dispatch = useAppDispatch();
  const { isContestFilterDrawer } = useAppSelector((state) => state.drawer);
  const [isEntry, setEntry] = useState("");
  const [isSpots, setSpots] = useState("");
  const [isPrizePool, setPrizePool] = useState("");
  const [isContestType, setContestType] = useState("");

  const EntryData = ["0 to $10", "₹10 to $30", "₹30 to $50", "₹50 to $100", "₹100 & Above"];
  const SpotsData = ["0 to 2", "0 to 5", "0 to 10", "0 to 50", "0 to 100", "100 & Above"];
  const PrizePoolData = ["0 to ₹100", "₹10,000 to ₹50,000", "₹50,000 to ₹1 Lakh", "₹1 Lakh & Above"];
  const ContestTypeData = ["Abcd", "₹10,000 to ₹50,000", "₹50,000 to ₹1 Lakh", "₹1 Lakh & Above"];

  return (
    <Drawer title="Contest Filter" placement="right" size={"default"} onClose={() => dispatch(setContestFilterDrawer({ open: false }))} open={isContestFilterDrawer.open} className="text-theme">
      <div className="flex flex-col ite">
        <div>
          <h3 className="text-lg font-bold">Entry</h3>
          <ul className="flex flex-wrap gap-3 pt-3">
            {EntryData.map((item, i) => (
              <li key={i} onClick={() => setEntry(item)} className={`border py-2 px-3 w-fit rounded-full cursor-pointer transition-colors duration-200 text-theme bg-input-box ${isEntry === item ? "border-primary !text-primary !bg-bg-light" : "border-box-border hover:border-theme"}`}>
                <p className="font-normal text-base flex items-center">{item}</p>
              </li>
            ))}
          </ul>
        </div>
        <hr className="w-full mx-auto text-theme my-4 opacity-20" />
        <div>
          <h3 className="text-lg font-bold">Spots</h3>
          <ul className="flex flex-wrap gap-3 pt-3">
            {SpotsData.map((item, i) => (
              <li key={i} onClick={() => setSpots(item)} className={`border py-2 px-3 w-fit rounded-full cursor-pointer transition-colors duration-200 text-theme bg-input-box ${isSpots === item ? "border-primary !text-primary !bg-bg-light" : "border-box-border hover:border-theme"}`}>
                <p className="font-normal text-base flex items-center">{item}</p>
              </li>
            ))}
          </ul>
        </div>
        <hr className="w-full mx-auto text-theme my-4 opacity-20" />
        <div>
          <h3 className="text-lg font-bold">Prize Pool</h3>
          <ul className="flex flex-wrap gap-3 pt-3">
            {PrizePoolData.map((item, i) => (
              <li key={i} onClick={() => setPrizePool(item)} className={`border py-2 px-3 w-fit rounded-full cursor-pointer transition-colors duration-200 text-theme bg-input-box ${isPrizePool === item ? "border-primary !text-primary !bg-bg-light" : "border-box-border hover:border-theme"}`}>
                <p className="font-normal text-base flex items-center">{item}</p>
              </li>
            ))}
          </ul>
        </div>
        <hr className="w-full mx-auto text-theme my-4 opacity-20" />
        <div>
          <h3 className="text-lg font-bold">Contest Type</h3>
          <ul className="flex flex-wrap gap-3 pt-3">
            {ContestTypeData.map((item, i) => (
              <li key={i} onClick={() => setContestType(item)} className={`border py-2 px-3 w-fit rounded-full cursor-pointer transition-colors duration-200 text-theme bg-input-box ${isContestType === item ? "border-primary !text-primary !bg-bg-light" : "border-box-border hover:border-theme"}`}>
                <p className="font-normal text-base flex items-center">{item}</p>
              </li>
            ))}
          </ul>
        </div>
        <FormButton htmlType="submit" text="Apply" className="custom-button button button--mimas w-full !h-auto !mt-10" />
      </div>
    </Drawer>
  );
};

export default ContestFilterDrawer;
