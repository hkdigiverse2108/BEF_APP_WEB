import { Empty } from "antd";
import { useLocation, useParams } from "react-router-dom";
import { useGetApiQuery } from "../../../Api/CommonApi";
import { CardHeader } from "../../../Components/Common/CardHeader";
import { ImagePath, URL_KEYS } from "../../../Constants";
import { useEffect, type FC, type ReactNode } from "react";
import type { AttemptType, MistakeMapReportApiResponse, ResultApiResponse } from "../../../Types";

const MistakeMapReport = () => {
  const { id } = useParams();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const contestId = params.get("contestId");

  const { data, refetch } = useGetApiQuery<MistakeMapReportApiResponse>({ url: `${URL_KEYS.QA.MISTAKE_MAP}${id}` });
  const MistakeMapData = data?.data;
  const { data: ResultData , refetch: refetchResult} = useGetApiQuery<ResultApiResponse>({ url: `${URL_KEYS.REPORT.REPORT}?qaFilter=${id}&contestFilter=${contestId}` });
  const FearDriverSkipData = ResultData?.data?.sec1?.polity?.qaTypeMetrics?.fearDriverSkip;
  const FearDriverSkipTotal = (...items: AttemptType[]) => {
    const totalCorrect = items.reduce((a, b) => a + (b?.correct ?? 0), 0);
    const totalTotal = items.reduce((a, b) => a + (b?.total ?? 0), 0);
    return totalTotal > 0 ? Math.round(totalTotal - totalCorrect || 0) : 0;
  };

  const compare = [
    {
      title: "Silly Mistakes",
      color: "bg-danger-dark",
      value: MistakeMapData?.categories?.sillyMistake.total || 0,
      items: MistakeMapData?.categories?.sillyMistake?.subtopics,
    },
    {
      title: "Concept Mistakes",
      color: "bg-danger",
      value: MistakeMapData?.categories?.conceptMistake?.total || 0,
      items: MistakeMapData?.categories?.conceptMistake?.subtopics,
    },
    {
      title: "Revision Mistakes",
      color: "bg-warning",
      value: MistakeMapData?.categories?.revisionLacking?.total || 0,
      items: MistakeMapData?.categories?.revisionLacking?.subtopics,
    },
    {
      title: "Out of Material",
      color: "bg-success",
      value: MistakeMapData?.categories?.outOfMaterial?.total || 0,
      items: MistakeMapData?.categories?.outOfMaterial?.subtopics,
    },
    {
      title: "Current Affiars Not Read",
      color: "bg-success-light",
      value: MistakeMapData?.categories?.currentAffairNotRead?.total || 0,
      items: MistakeMapData?.categories?.currentAffairNotRead?.subtopics,
    },
  ];

  const OverviewCard: FC<{ img: ReactNode; label: string; value: number }> = ({ img, label, value }) => (
    <div className="max-sm:py-3 sm:p-3 w-full sm:w-1/2  xl:w-1/3">
      <div className="h-full relative bg-input-box rounded-xl p-7 flex items-center gap-6">
        <div className="w-1 h-[70%] bg-orange-500 rounded-r absolute left-0" />
        <div>
          <img className="object-cover w-15 max-sm:w-10" src={`${ImagePath}${img}`} />
        </div>
        <div className="text-left">
          <p className="text-base font-bold mt-1 uppercase">{label}</p>
          <h3 className="text-xl font-extrabold">{value}</h3>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    refetch();
    refetchResult();
  }, [id]);

  return (
    <div className="sub-container pt-4 md:pt-8 result">
      <CardHeader title="Mistake Map Report" />
      <p className="text-base font-semibold">
        Please, first fill <span className="text-primary">Why false</span> Reason in Each question...
      </p>
      <span className="border-t border-card-border flex w-full my-4 " />
      <section className="flex flex-wrap justify-center">
        <OverviewCard img={"mistakeMap/Incorrect.png"} label="Total incorrect" value={Math.round(MistakeMapData?.totalIncorrect || 0)} />
        <OverviewCard img={"mistakeMap/Fear-driver-skip-incorrect.png"} label="Total Fear Driver Skip incorrect" value={FearDriverSkipTotal(FearDriverSkipData?.direct, FearDriverSkipData?.fiftyFifty, FearDriverSkipData?.oneEliminate)} />
        <OverviewCard img={"mistakeMap/MistakeMapped.png"} label="Mistake mapped" value={Math.round(MistakeMapData?.mistakeMapped || 0)} />
      </section>
      <div className="pt-3">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 w-full">
          {compare.map(({ title, color, items, value }, i) => (
            <div key={i} className="rounded-lg shadow-lg">
              <div className={`${color} px-4 py-2 rounded-t-lg text-lg text-white flex justify-between capitalize`}>
                <h3>{title}</h3>
                <p>{value}</p>
              </div>
              <div className="rounded-b-lg overflow-hidden">
                <ul className="list-disc space-y-2 max-h-100 overflow-y-auto overflow-x-hidden">
                  {items &&
                    Object.entries(items).map(([subtopic, count]) => (
                      <li key={subtopic} className="flex justify-between w-full border-b border-card-border p-3 sm:px-4 m-0">
                        <span>{subtopic}</span>
                        <span>{count}</span>
                      </li>
                    ))}

                  {(!items || Object.keys(items).length === 0) && (
                    <li className="flex justify-center items-center  w-full p-3 sm:px-4">
                      <Empty />
                    </li>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MistakeMapReport;
