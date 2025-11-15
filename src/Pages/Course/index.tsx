import { Skeleton } from "antd";
import { useGetApiQuery } from "../../Api/CommonApi";
import { CardHeader } from "../../Components/Common/CardHeader";
import CourseCard from "../../Components/Course/CourseCard";
import { URL_KEYS } from "../../Constants";
import type { CourseApiResponse } from "../../Types";
import { useState } from "react";
import { FormButton } from "../../Attribute/FormFields";

const Course = () => {
  const [myCourseLimit, setMyCourseLimit] = useState(3);

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
            <div className="flex justify-between items-center py-2 md:py-5">
              <CardHeader title="My Course" />
            </div>
            <hr className="text-card-border mb-5" />
            <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {isLoading
                ? [...Array(3)]?.map((_, i) => (
                    <Skeleton.Node
                      key={i}
                      active
                      style={{ width: "100%", height: 300, borderRadius: 15 }}
                    />
                  ))
                : MyCourse?.filter(
                    (_, i: number) => i + 1 <= myCourseLimit
                  )?.map((item, index) => (
                    <CourseCard key={index} data={item} />
                  ))}
            </div>

            {MyCourse?.length >= myCourseLimit && (
              <div className="w-full flex justify-center pt-10">
                <FormButton
                  loading={isLoading}
                  text="View More"
                  className="custom-button-light button button--mimas text-center w-fit p-4! px-8! h-12! uppercase flex items-end-safe"
                  onClick={() => setMyCourseLimit(myCourseLimit + 3)}
                />
              </div>
            )}
          </>
        )}
        {AllCourse?.length !== 0 && (
          <>
            <div className="flex justify-between items-center py-2 md:py-5">
              <CardHeader title="All Course" />
            </div>
            <hr className="text-card-border mb-5" />
            <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {isLoading
                ? [...Array(3)]?.map((_, i) => (
                    <Skeleton.Node
                      key={i}
                      active
                      style={{ width: "100%", height: 300, borderRadius: 15 }}
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
