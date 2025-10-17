import { CardHeader } from "../../Components/Common/CardHeader";
import CourseCard from "../../Components/Course/CourseCard";

const Course = () => {
  const data = [
    {
      title: "Have questions about this batch?",
      subtitle: "Talk to a counsellor",
      img: "assets/images/4.png",
    },
    {
      title: "Have questions about this batch?",
      subtitle: "Talk to a counsellor",
      img: "assets/images/4.png",
    },
    {
      title: "Have questions about this batch?",
      subtitle: "Talk to a counsellor",
      img: "assets/images/4.png",
    },
  ];

  return (
    <>
      <div className="sub-container">
        <div className="flex justify-between items-center py-2 md:py-5">
          <CardHeader title="Your Course" />
        </div>
        <hr className="text-card-border mb-5" />
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data.map((item, index) => (
            <CourseCard key={index} title={item.title} subtitle={item.subtitle} btnTitle={"Start Learning"} image={`${item.img}`} onCallClick={() => console.log("Counsellor clicked")} onViewDetails={() => console.log("View Batch clicked")} />
          ))}
        </div>
        <div className="flex justify-between items-center py-2 md:py-5 mt-5">
          <CardHeader title="All Course" />
        </div>
        <hr className="text-card-border mb-5" />
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data.map((item, index) => (
            <CourseCard key={index} title={item.title} subtitle={item.subtitle} btnTitle={"View Batch Details"} image={`${item.img}`} onCallClick={() => console.log("Counsellor clicked")} onViewDetails={() => console.log("View Batch clicked")} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Course;
