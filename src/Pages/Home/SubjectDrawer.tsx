import { Drawer } from "antd";
import { ImagePath } from "../../Constants";
import { setSubjectDrawer } from "../../Store/Slices/DrawerSlice";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";

const SubjectDrawer = () => {
  const dispatch = useAppDispatch();
  const { isSubjectDrawer } = useAppSelector((state) => state.drawer);

  const subjects = [
    { id: 1, img: `${ImagePath}classic/subject/Subject1.png`, title: "Bharat Exam Fest", desc: "Practice full-length quizzes to simulate real exam conditions." },
    { id: 2, img: `${ImagePath}classic/subject/Subject2.png`, title: "Bharat Exam Fest", desc: "Practice full-length quizzes to simulate real exam conditions." },
    { id: 3, img: `${ImagePath}classic/subject/Subject3.png`, title: "Bharat Exam Fest", desc: "Practice full-length quizzes to simulate real exam conditions." },
    { id: 4, img: `${ImagePath}classic/subject/Subject2.png`, title: "Bharat Exam Fest", desc: "Practice full-length quizzes to simulate real exam conditions." },
    { id: 3, img: `${ImagePath}classic/subject/Subject2.png`, title: "Bharat Exam Fest", desc: "Practice full-length quizzes to simulate real exam conditions." },
    { id: 3, img: `${ImagePath}classic/subject/Subject2.png`, title: "Bharat Exam Fest", desc: "Practice full-length quizzes to simulate real exam conditions." },
  ];
  return (
    <Drawer title="Explore Topics" placement="right" size={"large"} onClose={() => dispatch(setSubjectDrawer({ open: false }))} open={isSubjectDrawer.open}>
      <div className="grid gap-3 grid-cols-[repeat(auto-fit,minmax(300px,1fr))] place-items-center">
        {subjects.map((s, i) => (
          <a
            key={s.id}
            href="#"
            className={`flex flex-row max-sm:flex-col items-center !bg-input-box gap-4 max-sm:gap-0 w-full h-full rounded-xl p-3 border-2 border-gray-200
        ${subjects.length % 2 !== 0 && i === subjects.length - 1 ? "col-span-full" : ""}`}
          >
            <img className="object-cover w-25 max-sm:w-15 rounded-full border-2 border-white" src={s.img} />
            <div className="grid gap-1 w-full">
              {isSubjectDrawer.id}
              <h3 className="text-xl max-sm:text-center text-left font-medium tracking-tight text-black">{s.title}</h3>
              <p className="text-sm font-normal max-sm:text-center text-left text-gray-600">{s.desc}</p>
            </div>
          </a>
        ))}
      </div>
    </Drawer>
  );
};

export default SubjectDrawer;
