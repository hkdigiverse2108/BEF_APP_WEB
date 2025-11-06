import { Skeleton } from "antd";
import { useGetApiQuery } from "../../Api/CommonApi";
import { CardHeader } from "../../Components/Common/CardHeader";
import CourseCard from "../../Components/Course/CourseCard";
import { URL_KEYS } from "../../Constants";
import type { CourseApiResponse } from "../../Types";
import { useState } from "react";
import { FormButton } from "../../Attribute/FormFields";

const Course = () => {
  const [tabOneLimit, setTabOneLimit] = useState(3);

  const { data, isLoading } = useGetApiQuery<CourseApiResponse>({ url: `${URL_KEYS.COURSE.ALL}?page=1&limit=${tabOneLimit}` });
  const CourseData = data?.data;

  return (
    <>
      <div className="sub-container">
        {CourseData?.course_data?.length !== 0 && (
          <>
            <div className="flex justify-between items-center py-2 md:py-5">
              <CardHeader title="Your Course" />
            </div>
            <hr className="text-card-border mb-5" />
            <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">{isLoading ? [...Array(3)].map((_, i) => <Skeleton.Node key={i} active style={{ width: "100%", height: 300, borderRadius: 15 }} />) : CourseData?.course_data?.map((item, index) => <CourseCard key={index} data={item} onCallClick={() => console.log("Counsellor clicked")} />)}</div>
            {CourseData?.totalData >= tabOneLimit && (
              <div className="w-full flex justify-center pt-10">
                <FormButton loading={isLoading} text="View More" className="custom-button-light button button--mimas text-center w-fit !p-4 !px-8 !h-12 uppercase flex items-end-safe" onClick={() => setTabOneLimit(tabOneLimit + 3)} />
              </div>
            )}
          </>
        )}
        {CourseData?.course_data?.length !== 0 && (
          <>
            <div className="flex justify-between items-center py-2 md:py-5">
              <CardHeader title="All Course" />
            </div>
            <hr className="text-card-border mb-5" />
            <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">{isLoading ? [...Array(3)].map((_, i) => <Skeleton.Node key={i} active style={{ width: "100%", height: 300, borderRadius: 15 }} />) : CourseData?.course_data?.map((item, index) => <CourseCard key={index} data={item} onCallClick={() => console.log("Counsellor clicked")} />)}</div>
            {CourseData?.totalData >= tabOneLimit && (
              <div className="w-full flex justify-center pt-10">
                <FormButton loading={isLoading} text="View More" className="custom-button-light button button--mimas text-center w-fit !p-4 !px-8 !h-12 uppercase flex items-end-safe" onClick={() => setTabOneLimit(tabOneLimit + 3)} />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Course;
