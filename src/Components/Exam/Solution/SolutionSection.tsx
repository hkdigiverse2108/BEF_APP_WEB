import { RxCross2 } from "react-icons/rx";
import { ImagePath } from "../../../Constants";
import { FormButton } from "../../../Attribute/FormFields";
import { IoFlagOutline } from "react-icons/io5";
import { Empty } from "antd";
import { useAppDispatch } from "../../../Store/hooks";
import { setReportModal } from "../../../Store/Slices/DrawerSlice";
import type { QuestionLang } from "../../../Types";

{
  /* <div className="py-3 space-y-3!">
  <FormButton
    text="See Solution"
    onClick={() => setOpenSolution(!isOpenSolution)}
    className="custom-button w-full sm:w-40 button button--mimas text-center !p-4 !h-13 uppercase"
  />
  {/* <Button className="2xl:hidden flex gap-2 bg-input-box font-semibold text-sm p-2 px-4 rounded capitalize cursor-pointer"></Button> */
}
//   <SolutionSection
//     setOpenSolution={setOpenSolution}
//     isOpenSolution={isOpenSolution}
//     isQaAnswers={isQaAnswers}
//     currentQuestionLanguage={currentQuestionLanguage}
//     isImage={isImage}
//   />
// </div>; */}

export interface SolutionSectionProps {
  setOpenSolution: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenSolution: boolean;
  isQaAnswers: any[] | null; // adjust type if you know the exact structure
  currentQuestionLanguage: QuestionLang | undefined;
  isImage: (value: string) => boolean;
}

const SolutionSection: React.FC<SolutionSectionProps> = ({
  isOpenSolution,
  isQaAnswers,
  currentQuestionLanguage,
  isImage,
}) => {
  const dispatch = useAppDispatch();
  return (
    <div
      className="bg-white max-2xl:shadow-xl border border-gray-200 2xl:bg-input-box p-1 2xl:p-6 rounded-2xl 2xl:sticky 2xl:top-32 col-span-2 h-fit max-2xl:h-full  2xl:!flex   "
      style={{ display: isOpenSolution ? "block" : "none" }}
    >
      {/* Legend */}
      <div className="2xl:gap-x-10 max-2xl:space-y-3  w-full max-2xl:px-5 max-2xl:py-4 h-fit max-2xl:h-full ">
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-base mb-1">Solution</p>
          </div>
          <span className="border-t border-card-border flex w-full mt-4 " />
        </div>

        {isQaAnswers?.length !== 0 ? (
          <>
            <div
              className="p-3 rounded-lg border border-primary my-6"
              style={{
                backgroundImage: `url(${ImagePath}/question/Solution-bg.png)`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <p className="font-semibold text-lg text-white">
                Correct Answer: {currentQuestionLanguage?.answer}
              </p>
            </div>
            <span className="border-t border-card-border flex w-full my-4" />

            <div className="max-h-[550px] 2xl:h-100 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-0">
              {isImage(currentQuestionLanguage?.solution || "") ? (
                <img
                  src={currentQuestionLanguage?.solution}
                  alt="solution"
                  className="mb-2 transparent-img"
                />
              ) : (
                <p
                  className="font-semibold text-base mb-1 text-neutral-500"
                  dangerouslySetInnerHTML={{
                    __html:
                      currentQuestionLanguage?.solution?.replace(
                        /\n/g,
                        "<br/>"
                      ) || "",
                  }}
                ></p>
              )}
            </div>

            {/* End Test Button */}
            <div className="flex justify-end items-end gap-3 !mt-3">
              <FormButton
                text="REPORT AN ISSUE"
                icon={<IoFlagOutline />}
                onClick={() => dispatch(setReportModal())}
                className="custom-button w-fit text-center !p-4 !h-10 uppercase  !bg-danger !text-white !text-base"
              />
            </div>
          </>
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
};

export default SolutionSection;
