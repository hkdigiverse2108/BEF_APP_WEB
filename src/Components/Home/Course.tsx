import { Link } from "react-router-dom";
import { useGetApiQuery } from "../../Api/CommonApi";
import { ROUTES, URL_KEYS } from "../../Constants";
import type { CourseApiResponse } from "../../Types";
import CourseCard from "../Course/CourseCard";
import { Skeleton } from "antd";

const Course = () => {
  const { data, isLoading } = useGetApiQuery<CourseApiResponse>({ url: `${URL_KEYS.COURSE.ALL}?page=1&limit=3` });
  const CourseData = data?.data?.course_data;
  return (
    <>
      {CourseData?.length !== 0 && (
        <div className="pb-5">
          <div className="flex justify-between items-center pb-5">
            <p className="text-lg font-bold">Your Course</p>
            <Link to={ROUTES.COURSE.COURSE} className="text-base font-semibold bg-primary m-0 py-1 px-3 rounded-lg text-white">
              View All
            </Link>
          </div>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">{isLoading ? [...Array(3)].map((_, i) => <Skeleton.Node key={i} active style={{ width: "100%", height: 300, borderRadius: 15 }} />) : CourseData?.map((item, index) => <CourseCard key={index} data={item} onCallClick={() => console.log("Counsellor clicked")} />)}</div>
        </div>
      )}
    </>
  );
};

export default Course;
