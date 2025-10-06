import { useGetApiQuery } from "../../Api/CommonApi";
import { FormButton } from "../../Attribute/FormFields";
import { ImagePath, URL_KEYS } from "../../Constants";
import { useAppDispatch } from "../../Store/hooks";
import { setSubjectDrawer } from "../../Store/Slices/DrawerSlice";
import SubjectDrawer from "./SubjectDrawer";

const Classes = () => {
  const dispatch = useAppDispatch();

  const { data: ClassesData } = useGetApiQuery({
    url: `${URL_KEYS.CLASSES.ALL}?page=1&limit=10`,
  });

  const classes = ClassesData?.data.classes_data;

  console.log(classes);

  return (
    <>
      <div className="p-5 pt-0">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          <div
            className="flex flex-col items-center gap-4 w-full h-full rounded-2xl p-6 shadow-sm lg:flex-row bg-cover bg-center"
            data-aos-duration={1200}
            data-aos="fade-up"
            style={{
              backgroundImage: `url(${ImagePath}classic/Classic-bg.png)`,
            }}
          >
            <img
              className="object-cover w-30 lg:w-40 rounded-xl border-2 border-white"
              src={`${ImagePath}classic/Classic.png`}
            />
            <div className="grid grid-cols-1 2xl:grid-cols-3 gap-1 lg:gap-3 w-full">
              <div className="col-span-2">
                <h3 className="text-2xl 2xl:text-4xl text-center lg:text-left font-bold tracking-tight text-white">
                  Bharat Exam Fest
                </h3>
                <p className="text-lg font-normal text-center lg:text-left text-white">
                  Daily quizzes, smart analysis.
                </p>
              </div>
              <div className="flex items-end-safe">
                <FormButton
                  text="explore now"
                  className="custom-button button button--mimas text-center w-full !p-4 !h-12 uppercase flex items-end-safe"
                  onClick={() =>
                    dispatch(setSubjectDrawer({ open: true, id: "sdfgh" }))
                  }
                />
              </div>
            </div>
          </div>
          <div
            className="flex flex-col items-center gap-4 w-full h-full rounded-2xl p-6 shadow-sm lg:flex-row bg-cover bg-center"
            data-aos-duration={1200}
            data-aos="fade-up"
            style={{
              backgroundImage: `url(${ImagePath}classic/Classic-bg.png)`,
            }}
          >
            <img
              className="object-cover w-30 lg:w-40 rounded-xl border-2 border-white"
              src={`${ImagePath}classic/Classic1.png`}
            />
            <div className="grid grid-cols-1 2xl:grid-cols-3 gap-1 lg:gap-3 w-full">
              <div className="col-span-2">
                <h3 className="text-2xl 2xl:text-4xl text-center lg:text-left font-bold tracking-tight text-white">
                  Delhi UPSC Secrets
                </h3>
                <p className="text-lg font-normal text-center lg:text-left text-white">
                  Daily quizzes, smart analysis.
                </p>
              </div>
              <div className="flex items-end-safe">
                <FormButton
                  text="explore now"
                  className="custom-button button button--mimas text-center w-full !p-4 !h-12 uppercase flex items-end-safe"
                  onClick={() =>
                    dispatch(setSubjectDrawer({ open: true, id: "hyy" }))
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <SubjectDrawer />
    </>
  );
};

export default Classes;
