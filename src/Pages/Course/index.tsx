import { Skeleton } from "antd";
import { useState } from "react";
import { FormButton } from "../../Attribute/FormFields";
import { useGetApiQuery } from "../../Api/CommonApi";
import SectionHeader from "../../Components/Common/SectionHeader";
import CourseCard from "../../Components/Course/CourseCard";
import { URL_KEYS } from "../../Constants";
import type { CourseApiResponse } from "../../Types";

const Course = () => {
  const [myCourseLimit, setMyCourseLimit] = useState(6);

  const { data, isLoading } = useGetApiQuery<CourseApiResponse>({
    url: `${URL_KEYS.COURSE.ALL}`,
  });

  const CourseData = data?.data;

  const MyCourse = CourseData?.course_data?.filter(
    (course) => course?.isUnlocked === true
  );
  const AllCourse = CourseData?.course_data?.filter(
    (course) => course?.isUnlocked === false
  );

  return (
    <>
      <div className="sub-container">
        {MyCourse?.length !== 0 && (
          <>
            <div className="py-2 md:py-4">
              <SectionHeader title="My Course" />
            </div>
            <div className="grid gap-4 sm:gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {isLoading
                ? [...Array(3)]?.map((_, i) => (
                    <Skeleton.Node
                      key={i}
                      active
                      style={{ width: "100%", height: 300, borderRadius: 12 }}
                    />
                  ))
                : MyCourse?.filter(
                    (_, i: number) => i + 1 <= myCourseLimit
                  )?.map((item, index) => (
                    <CourseCard key={index} data={item} />
                  ))}
            </div>

            {MyCourse?.length >= myCourseLimit && (
              <div className="w-full flex justify-center pt-8 sm:pt-10">
                <FormButton
                  loading={isLoading}
                  text="View More"
                  className="bef-btn-primary text-center w-fit uppercase"
                  onClick={() => setMyCourseLimit(myCourseLimit + 6)}
                />
              </div>
            )}
          </>
        )}
        {AllCourse?.length !== 0 && (
          <>
            <div className="py-2 md:py-4">
              <SectionHeader title="All Course" />
            </div>
            <div className="grid gap-4 sm:gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {isLoading
                ? [...Array(3)]?.map((_, i) => (
                    <Skeleton.Node
                      key={i}
                      active
                      style={{ width: "100%", height: 300, borderRadius: 12 }}
                    />
                  ))
                : AllCourse?.map((item, index) => (
                    <CourseCard key={index} data={item} />
                  ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Course;
