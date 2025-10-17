import { Link } from "react-router-dom";
import { ROUTES } from "../../Constants";
import CourseCard from "../Course/CourseCard";

const Course = () => {
  const data = [
    {
      title: "Have questions about this batch?",
      btn: "Talk to a counsellor",
      img: "assets/images/4.png",
    },
    {
      title: "Have questions about this batch?",
      btn: "Talk to a counsellor",
      img: "assets/images/4.png",
    },
    {
      title: "Have questions about this batch?",
      btn: "Talk to a counsellor",
      img: "assets/images/4.png",
    },
  ];
  return (
    <div className="pb-5">
      <div className="flex justify-between items-center pb-5">
        <p className="text-lg font-bold">Your Course</p>
        <Link to={ROUTES.COURSE.COURSE} className="text-base font-semibold bg-primary m-0 py-1 px-3 rounded-lg text-white">
          View All
        </Link>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data.map((item, index) => (
          <CourseCard key={index} title={item.title} subtitle={item.btn} image={`${item.img}`} onCallClick={() => console.log("Counsellor clicked")} onViewDetails={() => console.log("View Batch clicked")} />
        ))}
      </div>
    </div>
  );
};

export default Course;
