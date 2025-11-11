import { Drawer } from "antd";
import { FormButton } from "../../../Attribute/FormFields";
import { ImagePath, STORAGE_KEYS } from "../../../Constants";
import { useAppDispatch, useAppSelector } from "../../../Store/hooks";
import { setEndTestDrawer } from "../../../Store/Slices/DrawerSlice";
import { Storage } from "../../../Utils";
import { useEffect, useState, type FC } from "react";

const EndTestDrawer: FC<{ handleEndTest: () => void ,loading:boolean}> = ({ handleEndTest ,loading}) => {
  const [isAnswers, setAnswers] = useState({ total: 0, answered: 0, unanswered: 0, notVisited: 0, skip: 0, marked: 0 });
  const dispatch = useAppDispatch();
  const { isEndTestDrawer } = useAppSelector((state) => state.drawer);

  useEffect(() => {
    const readStorage = () => {
      const data = JSON.parse(Storage.getItem(STORAGE_KEYS.EXAM_QA_ALL) || "{}");

      let answered = 0,
        unanswered = 0,
        skip = 0,
        marked = 0;

      data?.answers?.forEach((item: any) => {
        const type = item?.userAnswer?.answersType ?? [];

        if (type.includes("answered")) answered++;
        if (type.includes("unanswered")) unanswered++;
        if (type.includes("skip")) skip++;
        if (type.includes("marked")) marked++;
      });

      const total = data?.answers?.length ?? 0;

      setAnswers({
        total,
        answered,
        unanswered,
        skip,
        notVisited: total - (answered + unanswered + skip),
        marked,
      });
    };

    readStorage(); // first call

    window.addEventListener("examStorageUpdate", readStorage);
    return () => window.removeEventListener("examStorageUpdate", readStorage);
  }, []);

  return (
    <Drawer placement="right" size="large" onClose={() => dispatch(setEndTestDrawer())} open={isEndTestDrawer} className="!p-0">
      <div className="flex flex-col items-center justify-center min-h-full">
        <div className="rounded-lg overflow-hidden shadow-2xl bg-white bg-cover bg-top" style={{ backgroundImage: `url(${ImagePath}confirmation/Confirmation-bg.png)` }}>
          {/* Header */}
          <div className="text-white text-center p-3 sm:p-6 !pb-0">
            <h2 className="text-2xl font-semibold">Want to End the Test ?</h2>
            <p className="mt-2 text-white text-sm">No Changes would be allowed after submission.</p>
          </div>

          {/* Body */}
          <div className="p-3 sm:p-6">
            <div className="space-y-3">
              <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 place-items-center">
                <div className="flex flex-row items-center bg-input-box gap-4 w-full h-full rounded-xl py-2 px-4 border-2 border-gray-200">
                  <img className="object-cover w-15 max-sm:w-10" src={`${ImagePath}question/Total.png`} />
                  <div className="grid w-full">
                    <h3 className="text-lg text-left font-medium tracking-tight text-black capitalize">Total Questions</h3>
                    <p className="text-xl font-bold text-left">{isAnswers?.total}</p>
                  </div>
                </div>

                <div className="flex flex-row items-center bg-input-box gap-4 w-full h-full rounded-xl py-2 px-3 border-2 border-gray-200">
                  <span className="w-15 h-10 border answered" />
                  <div className="grid w-full">
                    <h3 className="text-lg text-left font-medium tracking-tight text-black capitalize">Answered</h3>
                    <p className="text-xl font-bold text-left">{isAnswers?.answered}</p>
                  </div>
                </div>
                <div className="flex flex-row items-center bg-input-box gap-4 w-full h-full rounded-xl py-2 px-3 border-2 border-gray-200">
                  <span className="w-15 h-10 border unanswered" />
                  <div className="grid w-full">
                    <h3 className="text-lg text-left font-medium tracking-tight text-black capitalize">unanswered</h3>
                    <p className="text-xl font-bold text-left">{isAnswers?.unanswered}</p>
                  </div>
                </div>
                <div className="flex flex-row items-center bg-input-box gap-4 w-full h-full rounded-xl py-2 px-3 border-2 border-gray-200">
                  <span className="w-15 h-10 border-3 not-visited" />
                  <div className="grid w-full">
                    <h3 className="text-lg text-left font-medium tracking-tight text-black capitalize">Not Visited</h3>
                    <p className="text-xl font-bold text-left">{isAnswers?.notVisited}</p>
                  </div>
                </div>
                <div className="flex flex-row items-center bg-input-box gap-4 w-full h-full rounded-xl py-2 px-3 border-2 border-gray-200">
                  <span className="w-15 h-10 border skip" />
                  <div className="grid w-full">
                    <h3 className="text-lg text-left font-medium tracking-tight text-black capitalize">Skip</h3>
                    <p className="text-xl font-bold text-left">{isAnswers?.skip}</p>
                  </div>
                </div>
                <div className="flex flex-row items-center bg-input-box gap-4 w-full h-full rounded-xl py-2 px-3 border-2 border-gray-200">
                  <span className="w-14 h-10 border-2 marked relative">
                    <span className="absolute -top-1 -right-1 size-2.5 rounded-full bg-success" />
                  </span>
                  <div className="grid w-full">
                    <h3 className="text-lg text-left font-medium tracking-tight text-black capitalize">Marked</h3>
                    <p className="text-xl font-bold text-left">{isAnswers?.marked}</p>
                  </div>
                </div>
              </div>
              <div className="grid !gap-3 grid-cols-1 sm:grid-cols-2 mt-10">
                <FormButton onClick={() => dispatch(setEndTestDrawer())} text="Resume" className="custom-button-light button button--mimas text-center w-full !p-4 !h-12 uppercase flex items-end-safe" />
                <FormButton onClick={() => handleEndTest()} loading={loading} text="END TEST" className="custom-button button button--mimas text-center w-full !p-4 !h-12 uppercase flex items-end-safe" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default EndTestDrawer;
