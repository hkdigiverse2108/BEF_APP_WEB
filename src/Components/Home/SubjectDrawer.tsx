import { Drawer } from "antd";
import { ImagePath, ROUTES, URL_KEYS } from "../../Constants";
import {
  setSubjectDrawer,
  setSubtopicDrawer,
} from "../../Store/Slices/DrawerSlice";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import SubtopicDrawer from "./SubtopicDrawer";
import { useGetApiQuery } from "../../Api/CommonApi";
import { NavLink } from "react-router-dom";
import type { Subject, SubjectApiResponse } from "../../Types";

const SubjectDrawer = () => {
  const dispatch = useAppDispatch();
  const { isSubjectDrawer } = useAppSelector((state) => state.drawer);

  const { data: SubjectData, isLoading } = useGetApiQuery<SubjectApiResponse>(
    {
      url: `${URL_KEYS.SUBJECT.ALL}?page=1&limit=100&classesFilter=${isSubjectDrawer.id}`,
    },
    {
      skip: !isSubjectDrawer.id,
    }
  );

  const Subjects: Subject[] = SubjectData?.data.subject_data;

  // if (Subjects) console.log(Subjects, isSubjectDrawer);

  // const subjects = [
  //   {
  //     id: 1,
  //     img: `${ImagePath}classic/subject/Subject1.png`,
  //     title: "Bharat Exam Fest",
  //     desc: "Practice full-length quizzes to simulate real exam conditions.",
  //   },
  //   {
  //     id: 2,
  //     img: `${ImagePath}classic/subject/Subject2.png`,
  //     title: "Bharat Exam Fest",
  //     desc: "Practice full-length quizzes to simulate real exam conditions.",
  //   },
  //   {
  //     id: 3,
  //     img: `${ImagePath}classic/subject/Subject3.png`,
  //     title: "Bharat Exam Fest",
  //     desc: "Practice full-length quizzes to simulate real exam conditions.",
  //   },
  //   {
  //     id: 4,
  //     img: `${ImagePath}classic/subject/Subject2.png`,
  //     title: "Bharat Exam Fest",
  //     desc: "Practice full-length quizzes to simulate real exam conditions.",
  //   },
  //   {
  //     id: 3,
  //     img: `${ImagePath}classic/subject/Subject2.png`,
  //     title: "Bharat Exam Fest",
  //     desc: "Practice full-length quizzes to simulate real exam conditions.",
  //   },
  //   {
  //     id: 3,
  //     img: `${ImagePath}classic/subject/Subject2.png`,
  //     title: "Bharat Exam Fest",
  //     desc: "Practice full-length quizzes to simulate real exam conditions.",
  //   },
  // ];
  return (
    <>
      <Drawer
        title="Explore Topics"
        placement="right"
        loading={isLoading}
        size={"large"}
        onClose={() => dispatch(setSubjectDrawer({ open: false }))}
        open={isSubjectDrawer.open}
      >
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 place-items-center">
          {Subjects?.map((subject, i) => (
            <NavLink
              key={i}
              to={ROUTES.CONTEST.CONTEST}
              className={`flex flex-row max-sm:flex-col items-center !bg-input-box gap-4 max-sm:gap-0 w-full h-full rounded-xl p-3 border-2 border-gray-200`}
              onClick={() =>
                dispatch(setSubtopicDrawer({ open: true, id: subject._id }))
              }
            >
              <img
                className="object-cover w-25 max-sm:w-15 rounded-full border-2 border-white"
                // src={subject.image}
                src={`${ImagePath}contest/ContestIcon.png`}
              />
              <div className="grid gap-1 w-full">
                {/* {isSubjectDrawer.id} */}
                <h3 className="text-xl max-sm:text-center text-left font-medium tracking-tight text-black">
                  {subject.name}
                </h3>
              </div>
            </NavLink>
          ))}
        </div>
      </Drawer>
      <SubtopicDrawer />
    </>
  );
};

export default SubjectDrawer;
