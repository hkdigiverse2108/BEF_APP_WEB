import { useLocation } from "react-router-dom";
import { useGetApiQuery } from "../../../Api/CommonApi";
import { ImagePath, URL_KEYS } from "../../../Constants";
import type { FC } from "react";
import type { RanksApiResponse, WinnersRankType } from "../../../Types";
import { useCountDown } from "../../../Utils/Hook";
import { useAppSelector } from "../../../Store/hooks";
import { Empty } from "antd";

const Leaderboard: FC<{ contest: { endDate: string; startDate: string } }> = ({ contest }) => {
  const { search } = useLocation();
  const { user } = useAppSelector((store) => store.auth);
  const { hours, minutes, seconds } = useCountDown(contest?.startDate || "", contest?.endDate || "");

  const { data } = useGetApiQuery<RanksApiResponse>({
    url: `${URL_KEYS.QA.CONTEST_RANKS}${search}`,
  });
  const RanksData = data?.data[0]?.ranks;

  const LeaderboardData = data?.data?.[0]?.ranks?.flatMap((rank) => rank?.winners?.filter((win) => win?.userId === user?._id) || []);

  const getBackgroundStyle = (rank: number) => {
    if (rank === 1) {
      return { backgroundImage: `url(${ImagePath}/winner/Winner1.png)` };
    } else if (rank === 2) {
      return { backgroundImage: `url(${ImagePath}/winner/Winner2.png)` };
    } else if (rank === 3) {
      return { backgroundImage: `url(${ImagePath}/winner/Winner3.png)` };
    }
  };

const TimeBox: FC<{ title: string; value: string }> = ({ title, value }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  const percent = title === "HOUR" ? (Number(value) / 24) * 100 : title === "MIN" ? (Number(value) / 60) * 100 : title === "SEC" ? (Number(value) / 60) * 100 : 0;

  const progress = (percent / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      {/* Circular container */}
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
        {/* Background Circle */}
        <svg className="absolute -rotate-90" width="100%" height="100%">
          <circle cx="64" cy="64" r={radius} stroke="white" strokeWidth="5" fill="transparent" />
        </svg>

        {/* Gradient Progress Line */}
        <svg className="absolute -rotate-90" width="100%" height="100%">
          <defs>
            <linearGradient id="gradientBorder" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--primary)" />
              <stop offset="100%" stopColor="var(--success)" />
            </linearGradient>
          </defs>

          <circle cx="64" cy="64" r={radius} stroke="url(#gradientBorder)" strokeWidth="5" strokeLinecap="round" fill="transparent" strokeDasharray={circumference} strokeDashoffset={circumference - progress} className="transition-all duration-700" />
        </svg>

        {/* VALUE */}
        <p className="text-3xl sm:text-4xl font-semibold text-success z-10">{value}</p>
      </div>

      {/* Label */}
      <p className="text-black font-bold mt-3">{title}</p>
    </div>
  );
};

  const genderWiseProfileImage = (gender = "male") => {
    return gender === "female" ? `${ImagePath}user/User_Female.png` : `${ImagePath}user/User_Male.png`;
  };

  if (!data?.data || data?.data?.length === 0)
    return (
      <div className="w-full h-[330px] flex justify-center items-center">
        <Empty />
      </div>
    );

  return (
    <>
      {!data?.data ? (
        <div className="w-full h-[400px] flex flex-col items-center justify-center bg-cover bg-center rounded-2xl" style={{ backgroundImage: `url(${ImagePath}CountDown1.jpg)` }}>
          {/* Timer Wrapper */}
          <div>
            <div className="flex items-center gap-6 justify-between">
              {/* ITEM */}
              <TimeBox title="HOUR" value={hours} />
              <TimeBox title="MIN" value={minutes} />
              <TimeBox title="SEC" value={seconds} />
            </div>

            {/* Message */}
             <p className="mt-8 px-5 py-3 rounded-md font-semibold text-center uppercase">Result will be announced soon</p>
          </div>
        </div>
      ) : (
        <>
          <div className={`relative bg-[url(/assets/images/result/Leaderboard-bg.png)] bg-cover bg-center w-full flex flex-col items-center p-5 rounded-xl`}>
            {/* Top message */}
            {LeaderboardData && (
              <div className="bg-white text-gray-900 p-3 rounded-lg shadow font-normal w-full flex flex-wrap max-sm:justify-center items-center gap-2">
                <div className="bg-primary text-white w-10 h-10 flex items-center justify-center rounded-xl font-semibold text-lg">{LeaderboardData[0]?.rank || "1"}</div>
                🏅 {LeaderboardData[0]?.firstName || ""} {LeaderboardData[0]?.lastName || ""}
              </div>
            )}

            <div className="mt-10 grid max-sm:grid-cols-1 grid-cols-3 justify-center items-end gap-5 w-full">
              {RanksData?.map((list) =>
                list.winners
                  ?.filter((item) => item.rank <= 3)
                  ?.map((item, i) => (
                    <div key={i} className={`flex flex-col items-center max-sm:w-full ${item.rank === 1 ? "sm:order-1" : item.rank === 3 ? "sm:order-2" : ""}`}>
                      <img src={`${ImagePath}result/Trophy.png`} alt="Trophy" className={`${item.rank === 1 ? "w-50 h-45" : item.rank === 2 ? "w-40 h-35" : item.rank === 3 ? "w-35 h-30" : ""}`} />
                      <div className={`w-full rounded-t-lg text-white font-semibold py-3 text-center bg-cover ${item.rank === 1 ? "text-6xl" : item.rank === 2 ? "text-4xl" : item.rank === 3 ? "text-2xl" : ""}`} style={getBackgroundStyle(item.rank)}>
                        {item.rank}
                      </div>
                      <div className="w-full bg-white text-center rounded-b-xl shadow p-4">
                        <img src={item.profileImage || genderWiseProfileImage(item?.gender?.toLocaleLowerCase())} alt={item.firstName} className="w-12 h-12 rounded-full mx-auto mb-2" />
                        <p className="font-semibold text-sm capitalize">
                          {item.firstName} {item.lastName}
                        </p>
                        {list.price !== 0 && <p className="text-sm text-gray-700 font-semibold">₹{list.price}</p>}
                        <p className="text-xs text-gray-600">{item.points}</p>
                      </div>
                    </div>
                  ))
              )}
             
            </div>
          </div>
          {RanksData?.some((list) => list?.winners?.some((item) => item.rank > 3)) && (
            <div className="pt-7">
              <div className="bg-input-box rounded-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-5 w-full max-h-[450px] overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-0">
                {RanksData?.map((list) =>
                  list.winners
                    ?.filter((item) => item.rank > 3)
                    ?.map((user: WinnersRankType, index) => (
                      <div key={index} className="w-full mx-auto flex items-center gap-x-4 rounded-xl bg-white p-3 sm:p-6 shadow-lg ">
                        <img className="size-12 rounded-full" src={user.profileImage || genderWiseProfileImage(user?.gender?.toLocaleLowerCase())} alt="ChitChat Logo" />
                        <div>
                          <div className="max-sm:text-sm text-gray-500">{user.rank} TH RANK</div>
                          <p className="text-md sm:text-xl font-medium capitalize">
                            {user.firstName} {user.lastName}
                          </p>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Leaderboard;
