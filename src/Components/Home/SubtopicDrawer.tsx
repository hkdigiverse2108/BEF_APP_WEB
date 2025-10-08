import { Drawer, Form } from "antd";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import {
  setConfirmationDrawer,
  setSubtopicDrawer,
} from "../../Store/Slices/DrawerSlice";
import { FormButton, FormInput } from "../../Attribute/FormFields";

import { useState } from "react";
import ConfirmationDrawer from "../Common/ConfirmationDrawer";
import { Storage } from "../../Utils";
import { STORAGE_KEYS } from "../../Constants";
import dayjs from "dayjs";

const SubtopicDrawer = () => {
  const [form] = Form.useForm();

  const dispatch = useAppDispatch();
  const { isSubtopicDrawer } = useAppSelector((state) => state.drawer);

  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [payloadTime, setPayloadTime] = useState<string | object>({}); // default selected

  const { contest } = isSubtopicDrawer;

  const existingLsData = JSON.parse(
    Storage.getItem(STORAGE_KEYS.CONTEST_QA) || "{}"
  );

  const handleSelect = (time: string) => {
    setSelectedTime(time);
    const start = dayjs(time);
    const end = start.add(1, "hour");
    // form.setFieldsValue({ time });
    setPayloadTime({
      startTime: start.toISOString(),
      endTime: end.toISOString(),
    });
    // console.log("payload", payloadTime);
  };

  const generateStack = (num: number) => {
    const list = Array.from({ length: 10 }, (_, i) => num + i * 10);
    return `2x stack: ${list.join(", ")}`;
  };

  const handleQuestionClick = (num: number) => {
    setSelectedQuestion(num);
    const stack = generateStack(num);
    form.setFieldValue("stack", stack);
  };

  const handleDrawerSubmit = () => {
    try {
      // console.log(selectedTime, selectedQuestion);

      Storage.setItem(
        STORAGE_KEYS.CONTEST_QA,
        JSON.stringify({
          ...existingLsData,
          contestId: contest._id,
        })
      );
      // console.log("payloadTime", payloadTime);
      dispatch(
        setConfirmationDrawer({
          open: true,
          data: {
            ...isSubtopicDrawer.contest,
            payload: {
              stackNumber: selectedQuestion,
              contestStartDate: payloadTime?.startTime,
              contestEndDate: payloadTime?.endTime,
            },
          },
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const groupedSlots =
    contest?.slots?.reduce((acc, time) => {
      const dateKey = dayjs(time).format("YYYY-MM-DD");
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(time);
      return acc;
    }, {} as Record<string, string[]>) ?? {};

  // console.log("Con", isSubtopicDrawer, contest?.slots);

  return (
    <>
      <Drawer
        title={`${contest?.name || "Contest"}`}
        placement="right"
        size="large"
        onClose={() => {
          setSelectedQuestion(null);
          setSelectedTime(null);
          setPayloadTime({});
          dispatch(setSubtopicDrawer({ open: false, contest: {} }));
        }}
        open={isSubtopicDrawer.open}
      >
        <div className="space-y-6">
          {/* Title */}
          <div className="relative">
            <h2 className="font-semibold text-lg">
              2x The Stakes, 2x The Thrill
            </h2>
          </div>

          {/* Question Numbers */}
          <Form
            form={form}
            className="space-y-6 "
            onFinish={handleDrawerSubmit}
          >
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

            <FormInput
              // required
              name="stack"
              placeholder="Auto generated"
              disabled
              rules={[
                {
                  required: true,
                  validator: () =>
                    selectedQuestion !== null
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error("Please select a question No!")
                        ),
                },
              ]}
            />
          </Form>

          <div className="p-4 bg-input-box border-1 rounded-md border-card-border">
            <p className="font-semibold text-lg">
              Selected:&nbsp;
              <span className="text-black">
                {selectedTime
                  ? dayjs(selectedTime).isValid()
                    ? dayjs(selectedTime).format("dddd, MMM D • h:mm A")
                    : selectedTime // fallback to raw string if not parseable
                  : "No time selected"}
                {/* {dayjs(selectedTime).format("dddd, MMM D • h:mm A")} */}
              </span>
            </p>
            <p className="text-base font-medium text-gray-500 mb-3">
              Pick Your Time For Playing Quiz
            </p>
            <span className="border-t-2 border-card-border flex w-full my-4" />
            <div className="space-y-6">
              {Object?.entries(groupedSlots ?? {})?.map(([date, times]) => (
                <div key={date}>
                  {/* 🗓️ Date Header */}
                  <p className="font-semibold text-lg mb-2">
                    {dayjs(date).format("dddd, MMM D")}
                  </p>

                  {/* 🕒 Time Buttons */}
                  <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
                    {times?.map((time) => {
                      const displayTime = dayjs(time).format("h:mm A");
                      return (
                        <button
                          key={time}
                          onClick={() => handleSelect(time)}
                          className={`p-2 text-sm font-semibold rounded-lg ${
                            selectedTime === time
                              ? "bg-primary text-white"
                              : "bg-white hover:bg-primary-light"
                          }`}
                        >
                          {displayTime}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <Form.Item
              name="time"
              rules={[
                {
                  required: true,
                  message: "Please select a time!",
                },
              ]}
              initialValue={selectedTime} // optional: set initial value
            >
              <input type="hidden" />
            </Form.Item>
          </div>
          <FormButton
            text="Next"
            // disabled={!payloadTime?.startTime}
            className={`${
              payloadTime?.startTime ? "" : " !cursor-not-allowed "
            }  custom-button button button--mimas text-center w-full !p-4 !h-12 uppercase flex items-end-safe`}
            onClick={() => {
              form.submit();
            }}
          />
        </div>
      </Drawer>
      <ConfirmationDrawer />
    </>
  );
};

export default SubtopicDrawer;
