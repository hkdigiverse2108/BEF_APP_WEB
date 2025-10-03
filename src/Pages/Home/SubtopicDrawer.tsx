import { Drawer } from "antd";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { setSubtopicDrawer } from "../../Store/Slices/DrawerSlice";
import { FormDateTime, FormInput, FormSelect } from "../../Attribute/FormFields";
import { GenderOptions } from "../../Data";

const SubtopicDrawer = () => {
  const dispatch = useAppDispatch();
  const { isSubtopicDrawer } = useAppSelector((state) => state.drawer);

  return (
    <Drawer title="Select Subtopic" placement="right" size="large" onClose={() => dispatch(setSubtopicDrawer({ open: false }))} open={!isSubtopicDrawer.open}>
      <div className="space-y-6">
        {/* Dropdown */}
        <FormSelect name="gender" placeholder="Select Subtopic" options={GenderOptions} />

        {/* Title */}
        <div>
          <h2 className="font-semibold text-lg">2x The Stakes, 2x The Thrill</h2>
        </div>

        {/* Question Numbers */}
        <div>
          <p className="font-medium mb-2">Select Question No!</p>
          <div className="flex gap-2 flex-wrap">
            {Array.from({ length: 10 }, (_, i) => (
              <button key={i} className={`px-3 py-1 border rounded-md ${i === 1 ? "bg-orange-500 text-white border-orange-500" : "border-orange-400 text-orange-500"}`}>
                {i}
              </button>
            ))}
          </div>
        </div>
        <FormInput name="stack" type="text" disabled defaultValue="2x stack: 1, 11, 21, 31, 41" />

        {/* Instruction */}
        <div className="bg-red-100 text-red-700 border border-red-300 rounded-md px-4 py-2 text-sm">Instruction: Follow the Sample from Word file</div>

        {/* Calendar */}
        <div>
          <FormDateTime name="dob" type="date" required disablePast  defaultOpen />
          {/* <FormDateTime name="appointment" label="Appointment Time" type="time" required /> */}
          <select className="border rounded px-3 py-2 mb-3">
            <option>September 2024</option>
            <option>October 2024</option>
          </select>

          <div className="border rounded-lg p-4">
            <h3 className="uppercase font-medium mb-3">January</h3>
            <div className="grid grid-cols-7 gap-2 text-center text-gray-700">
              {["M", "T", "W", "T", "F", "S", "S"].map((d) => (
                <span key={d} className="font-medium">
                  {d}
                </span>
              ))}
              {Array.from({ length: 31 }, (_, i) => (
                <div key={i} className={`p-2 rounded ${i + 1 === 2 ? "bg-black text-white font-bold" : "hover:bg-gray-200"}`}>
                  {String(i + 1).padStart(2, "0")}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Date + Time Slots */}
        <div className="border rounded-lg p-4">
          <p className="font-medium">
            Selected : <span className="text-gray-600">Monday , Sep 18</span>
          </p>
          <p className="text-sm text-gray-500 mb-3">Pick Your Time For Playing Quiz</p>
          <div className="grid grid-cols-4 gap-2">
            {["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM", "12:00 PM", "1:00 AM", "2:00 AM", "3:00 AM"].map((time, i) => (
              <button key={time} className={`px-2 py-1 rounded-md border text-sm ${[0, 4, 8].includes(i) ? "bg-orange-500 text-white border-orange-500" : "border-gray-300 text-gray-700 hover:bg-gray-100"}`}>
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button className="w-full bg-black text-white py-3 rounded-lg font-medium">NEXT</button>
      </div>
    </Drawer>
  );
};

export default SubtopicDrawer;
