import { useGetApiQuery } from "../../Api/CommonApi";
import { ROUTES, URL_KEYS } from "../../Constants";
import type { CourseApiResponse } from "../../Types";
import CourseCard from "../Course/CourseCard";
import SectionHeader from "../Common/SectionHeader";
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
            <SectionHeader title="My Course" link={ROUTES.COURSE.COURSE} showViewAll={(MyCourse?.length || 0) >= 3} />
            <div className="grid gap-4 sm:gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">{isLoading ? [...Array(3)].map((_, i) => <Skeleton.Node key={i} active style={{ width: "100%", height: 300, borderRadius: 12 }} />) : MyCourse?.map((item, index) => <CourseCard key={index} data={item} />)}</div>
          </div>
          <div className="mt-8 sm:mt-12 border-t border-border" />
        </>
      )}
      {AllCourse?.length !== 0 && (
        <>
          <div className="pb-5">
            <SectionHeader title="All Course" link={ROUTES.COURSE.COURSE} showViewAll={(AllCourse?.length || 0) >= 3} />
            <div className="grid gap-4 sm:gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">{isLoading ? [...Array(3)].map((_, i) => <Skeleton.Node key={i} active style={{ width: "100%", height: 300, borderRadius: 12 }} />) : AllCourse?.map((item, index) => <CourseCard key={index} data={item} />)}</div>
          </div>
          <div className="mt-8 sm:mt-12 border-t border-border" />
        </>
      )}
    </>
  );
};

export default Course;
