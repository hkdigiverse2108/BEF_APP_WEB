import { Drawer, Empty, Form } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FormButton, FormInput } from "../../Attribute/FormFields";
import { STORAGE_KEYS } from "../../Constants";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { setConfirmationDrawer, setSubtopicDrawer } from "../../Store/Slices/DrawerSlice";
import type { ContestCore, PayloadTime } from "../../Types";
import { Storage } from "../../Utils";
import ConfirmationDrawer from "../Common/ConfirmationDrawer";

const SubtopicDrawer = () => {
  const [form] = Form.useForm();

  const dispatch = useAppDispatch();
  const { isSubtopicDrawer } = useAppSelector((state) => state.drawer);

  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(0);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [payloadTime, setPayloadTime] = useState<PayloadTime>({});

  const { contest }: { contest: ContestCore } = isSubtopicDrawer;

  const existingLsData = JSON.parse(Storage.getItem(STORAGE_KEYS.CONTEST_QA) || "{}");

  const handleSelect = (time: string) => {
    setSelectedTime(time);
    const start = dayjs(time);
    const end = start.add(1, "hour");
    setPayloadTime({
      startTime: start.toISOString(),
      endTime: end.toISOString(),
    });
    form.setFieldsValue({ time });

    // console.log("payload", payloadTime);
  };

  const generateStack = (num: number) => {
    const list = Array.from({ length: 10 }, (_, i) => num + i * 10);
    return `2x stack: ${list.join(", ")}`;
  };

   useEffect(() => {
    const stack = generateStack(0);
    form.setFieldValue("stack", stack);
  }, [form]);

  const handleQuestionClick = (num: number) => {
    setSelectedQuestion(num);
    const stack = generateStack(num);
    form.setFieldValue("stack", stack);
  };

  const handleDrawerSubmit = () => {
    try {
      Storage.setItem(
        STORAGE_KEYS.CONTEST_QA,
        JSON.stringify({
          ...existingLsData,
          contestId: contest?._id,
        })
      );

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
      dispatch(setSubtopicDrawer({ open: false, contest: {} }));
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
          form.resetFields();
          dispatch(setSubtopicDrawer({ open: false, contest: {} }));
        }}
        open={isSubtopicDrawer.open}
        className="text-theme"
      >
        <div className="space-y-6">
          {/* Title */}
          <div className="relative">
            <h2 className="font-normal text-lg">2x The Stakes, 2x The Thrill</h2>
          </div>

          {/* Question Numbers */}
          <Form form={form} className="space-y-6 " onFinish={handleDrawerSubmit}>
            <p className="font-medium mb-2">Select Question No!</p>
            <div className="flex gap-2 flex-wrap">
              {Array.from({ length: 10 }, (_, i) => i)?.map((num) => (
                <button key={num} type="button" onClick={() => handleQuestionClick(num)} className={`px-3 py-1 border rounded-md transition-all duration-200 ${selectedQuestion === num ? "bg-orange-500 text-white border-orange-500" : "border-orange-400 text-orange-500 hover:bg-orange-50"}`}>
                  {num}
                </button>
              ))}
            </div>

            <FormInput
              name="stack"
              placeholder="Auto generated"
              disabled
              rules={[
                {
                  required: true,
                  validator: () => (selectedQuestion !== null ? Promise.resolve() : Promise.reject(new Error("Please select a question No!"))),
                },
              ]}
              className="!border-theme/40"
            />
            <div className="p-4 bg-input-box border-1 rounded-md border-theme/40">
              <p className="font-normal text-lg text-theme">
                Selected:&nbsp;
                <span>{selectedTime ? (dayjs(selectedTime).isValid() ? dayjs(selectedTime).format("dddd, MMM D • h:mm A") : selectedTime) : "No time selected"}</span>
              </p>
              <p className="text-base font-medium text-theme/60 mb-3">Pick Your Time For Playing Quiz</p>
              <span className="border-t-2 border-theme/30 flex w-full my-4" />
              <div className="space-y-6">
                {Object.keys(groupedSlots).length > 0 ? (
                  Object?.entries(groupedSlots ?? {})?.map(([date, times]) => (
                    <div key={date}>
                      {/* 🗓️ Date Header */}
                      <p className="font-normal text-lg mb-2">{dayjs(date).format("dddd, MMM D")}</p>
                      {/* 🕒 Time Buttons */}
                      <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
                        {times?.map((time) => {
                          const displayTime = dayjs(time).format("h:mm A");
                          return (
                            <button type="button" key={time} onClick={() => handleSelect(time)} className={`p-2 text-sm font-normal rounded-lg ${selectedTime === time ? "bg-primary text-white" : "bg-white hover:bg-primary-light"}`}>
                              {displayTime}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500 font-medium">
                    <Empty />
                  </div>
                )}
              </div>

              <FormInput name="time" type="hidden" rules={[{ required: true, message: "Please select a time!" }]} />
            </div>
            <FormButton
              text="Next"
              htmlType="submit"
              className="custom-button button button--mimas text-center w-full !p-4 !h-14 uppercase flex items-end-safe"
              // onClick={handleDrawerSubmit}
            />
          </Form>
        </div>
      </Drawer>
      <ConfirmationDrawer />
    </>
  );
};

export default SubtopicDrawer;
