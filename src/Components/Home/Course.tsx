import { Link } from "react-router-dom";
import { useGetApiQuery } from "../../Api/CommonApi";
import { ROUTES, URL_KEYS } from "../../Constants";
import type { CourseApiResponse } from "../../Types";
import CourseCard from "../Course/CourseCard";
import { Skeleton } from "antd";

const Course = () => {
  const { data, isLoading } = useGetApiQuery<CourseApiResponse>({ url: URL_KEYS.COURSE.ALL });
  const CourseData = data?.data?.course_data;
  const MyCourse = CourseData?.filter((course) => course?.isUnlocked === true).slice(0, 3);
  const AllCourse = CourseData?.filter((course) => course?.isUnlocked === false).slice(0, 3);

  return (
    <>
      {MyCourse?.length !== 0 && (
        <>
          <div className="pb-5">
            <div className="flex justify-between items-center pb-5">
              <p className="text-lg font-semibold">My Course</p>
              {(MyCourse?.length || 0) > 3 && (
                <Link to={ROUTES.COURSE.COURSE} className="text-base font-semibold bg-primary m-0 py-1 px-3 rounded text-white">
                  View All
                </Link>
              )}
            </div>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">{isLoading ? [...Array(3)].map((_, i) => <Skeleton.Node key={i} active style={{ width: "100%", height: 300, borderRadius: 5 }} />) : MyCourse?.map((item, index) => <CourseCard key={index} data={item} />)}</div>
          </div>
          <hr className="w-[95%] mx-auto text-theme mt-2 mb-4 sm:my-8 opacity-20" />
        </>
      )}
      {AllCourse?.length !== 0 && (
        <div className="pb-5">
          <div className="flex justify-between items-center pb-5">
            <p className="text-lg font-semibold">All Course</p>
            <Link to={ROUTES.COURSE.COURSE} className="text-base font-semibold bg-primary m-0 py-1 px-3 rounded text-white">
              View All
            </Link>
          </div>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">{isLoading ? [...Array(3)].map((_, i) => <Skeleton.Node key={i} active style={{ width: "100%", height: 300, borderRadius: 5 }} />) : AllCourse?.map((item, index) => <CourseCard key={index} data={item} />)}</div>
        </div>
      )}
    </>
  );
};

export default Course;
