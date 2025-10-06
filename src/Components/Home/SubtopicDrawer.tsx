import { Drawer, Form } from "antd";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import {
  setConfirmationDrawer,
  setSubtopicDrawer,
} from "../../Store/Slices/DrawerSlice";
import { FormButton, FormInput, FormSelect } from "../../Attribute/FormFields";
import { GenderOptions } from "../../Data";
// import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { useState } from "react";
import ConfirmationDrawer from "../Common/ConfirmationDrawer";
import { URL_KEYS } from "../../Constants";
import { useGetApiQuery } from "../../Api/CommonApi";

const SubtopicDrawer = () => {
  const dispatch = useAppDispatch();
  const { isSubtopicDrawer } = useAppSelector((state) => state.drawer);
  // const [value, setValue] = useState<Dayjs | null>(dayjs());

  const [form] = Form.useForm();
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);

  const { data: SubjectData } = useGetApiQuery({
    url: `${URL_KEYS.SUB_TOPIC.ALL}?page=1&limit=10`,
  });

  const subjects = SubjectData?.data.sub_topic_data;

  console.log(subjects);

  // 🔢 Generate stack values like: 1, 11, 21, 31, 41, ...
  const generateStack = (num: number) => {
    const list = Array.from({ length: 10 }, (_, i) => num + i * 10);
    return `2x stack: ${list.join(", ")}`;
  };

  const handleQuestionClick = (num: number) => {
    setSelectedQuestion(num);
    const stack = generateStack(num);
    form.setFieldValue("stack", stack); // ✅ Update AntD form value
  };

  const handleCancel = () => {
    dispatch(setConfirmationDrawer());
    dispatch(setSubtopicDrawer({ open: false }));
  };

  return (
    <>
      <Drawer
        title="Select Subtopic"
        placement="right"
        size="large"
        onClose={() => dispatch(setSubtopicDrawer({ open: false }))}
        open={isSubtopicDrawer.open}
      >
        <div className="space-y-6">
          {/* Dropdown */}
          <FormSelect
            name="gender"
            placeholder="Select Subtopic"
            options={GenderOptions}
          />

          {/* Title */}
          <div>
            <h2 className="font-semibold text-lg">
              2x The Stakes, 2x The Thrill
            </h2>
          </div>
          {isSubtopicDrawer.id}
          {/* Question Numbers */}
          <Form form={form} className="space-y-6">
            <p className="font-medium mb-2">Select Question No!</p>
            <div className="flex gap-2 flex-wrap">
              {Array.from({ length: 10 }, (_, i) => i).map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleQuestionClick(num)}
                  className={`px-3 py-1 border rounded-md transition-all duration-200 ${
                    selectedQuestion === num
                      ? "bg-orange-500 text-white border-orange-500"
                      : "border-orange-400 text-orange-500 hover:bg-orange-50"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
            <FormInput name="stack" placeholder="Auto generated" disabled />
          </Form>

          {/* Dynamic Stack Field */}
          {/* <FormInput name="stack" type="text" disabled defaultValue="2x stack: 1, 11, 21, 31, 41" /> */}

          {/* <div className="bg-red-100 text-red-700 border border-red-300 rounded-md px-4 py-2 text-sm">Instruction: Follow the Sample from Word file</div> */}

          {/* Calendar */}
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                defaultValue={dayjs("2022-04-17")}
                views={["year", "month", "day"]}
                className="full-date"
              />
            </LocalizationProvider>
          </div>

          {/* Selected Date + Time Slots */}
          <div className="p-4 bg-input-box border-1 rounded-md border-card-border">
            <p className="font-semibold text-lg">
              Selected : <span className="text-black">Monday , Sep 18</span>
            </p>
            <p className="text-base font-medium text-gray-500 mb-3">
              Pick Your Time For Playing Quiz
            </p>
            <span className="border-t-2 border-card-border flex w-full my-4" />
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
              {[
                "8:00 AM",
                "9:00 AM",
                "10:00 AM",
                "11:00 AM",
                "12:00 AM",
                "1:00 PM",
                "2:00 PM",
                "3:00 PM",
                "4:00 PM",
                "5:00 PM",
                "6:00 PM",
                "7:00 PM",
                "8:00 PM",
                "9:00 PM",
                "10:00 PM",
                "11:00 PM",
                "12:00 PM",
                "1:00 AM",
                "2:00 AM",
                "3:00 AM",
              ].map((time, i) => (
                <button
                  key={time}
                  className={`p-2 text-sm font-semibold rounded-lg ${
                    [0, 4, 8].includes(i)
                      ? "bg-primary text-white"
                      : "bg-white hover:bg-primary-light"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
          <FormButton
            text="now"
            className="custom-button button button--mimas text-center w-full !p-4 !h-12 uppercase flex items-end-safe"
            onClick={() => handleCancel()}
          />
        </div>
      </Drawer>
      <ConfirmationDrawer />
    </>
  );
};

export default SubtopicDrawer;
