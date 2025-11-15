import { useLocation } from "react-router-dom";
import { useGetApiQuery } from "../../../Api/CommonApi";
import { ImagePath, URL_KEYS } from "../../../Constants";
import type { FC } from "react";
import type { RanksApiResponse } from "../../../Types";
import { useCountDown } from "../../../Utils/Hook";
import { useAppSelector } from "../../../Store/hooks";

const Leaderboard: FC<{ tabIndex: number; contest: { endDate: string; startDate: string } }> = ({ tabIndex, contest }) => {
  const { search } = useLocation();
  const { user } = useAppSelector((store) => store.auth);
  const { hours, minutes, seconds, isFinished } = useCountDown(contest?.startDate || "", contest?.endDate || "");

  const { data } = useGetApiQuery<RanksApiResponse>({ url: `${URL_KEYS.QA.CONTEST_RANKS}${search}` }, { skip: tabIndex === 5 ? false : true });
  const RanksData = data?.data[0]?.ranks;
  console.log(data?.data);

  const LeaderboardData = data?.data?.[0]?.ranks?.flatMap((rank) => rank?.winners?.filter((win) => win?.userId === user?._id) || []);

  console.log("LeaderboardData", LeaderboardData);

  // const players = [
  //   { id: 2, name: "MADELYN DIAS", score: "1,469 QP", color: "bg-success", img: `${ImagePath}user/User2.png`, size: "w-40 h-35 text-3xl" },
  //   { id: 1, name: "DAVIS CURTIS", score: "1,469 QP", color: "bg-primary", img: `${ImagePath}user/User3.png`, size: "w-50 h-45 text-6xl" },
  //   { id: 3, name: "CRAIG GOUSE", score: "1,469 QP", color: "bg-purple-dark", img: `${ImagePath}user/User4.png`, size: "w-35 h-30 text-2xl" },
  // ];

  // const Users = [
  //   { name: "DAVIS CURTIS", rank: 4, img: `${ImagePath}user/User3.png` },
  //   { name: "MADELYN DIAS", rank: 5, img: `${ImagePath}user/User2.png` },
  //   { name: "CRAIG GOUSE", rank: 6, img: `${ImagePath}user/User4.png` },
  //   { name: "DAVIS CURTIS", rank: 4, img: `${ImagePath}user/User3.png` },
  //   { name: "DAVIS CURTIS", rank: 4, img: `${ImagePath}user/User3.png` },
  //   { name: "MADELYN DIAS", rank: 5, img: `${ImagePath}user/User2.png` },
  //   { name: "CRAIG GOUSE", rank: 6, img: `${ImagePath}user/User4.png` },
  //   { name: "DAVIS CURTIS", rank: 4, img: `${ImagePath}user/User3.png` },
  //   { name: "MADELYN DIAS", rank: 5, img: `${ImagePath}user/User2.png` },
  //   { name: "CRAIG GOUSE", rank: 6, img: `${ImagePath}user/User4.png` },
  //   { name: "DAVIS CURTIS", rank: 4, img: `${ImagePath}user/User3.png` },
  //   { name: "DAVIS CURTIS", rank: 4, img: `${ImagePath}user/User3.png` },
  //   { name: "MADELYN DIAS", rank: 5, img: `${ImagePath}user/User2.png` },
  //   { name: "CRAIG GOUSE", rank: 6, img: `${ImagePath}user/User4.png` },
  //   { name: "DAVIS CURTIS", rank: 4, img: `${ImagePath}user/User3.png` },
  //   { name: "MADELYN DIAS", rank: 5, img: `${ImagePath}user/User2.png` },
  //   { name: "CRAIG GOUSE", rank: 6, img: `${ImagePath}user/User4.png` },
  //   { name: "DAVIS CURTIS", rank: 4, img: `${ImagePath}user/User3.png` },
  //   { name: "DAVIS CURTIS", rank: 4, img: `${ImagePath}user/User3.png` },
  //   { name: "MADELYN DIAS", rank: 5, img: `${ImagePath}user/User2.png` },
  //   { name: "CRAIG GOUSE", rank: 6, img: `${ImagePath}user/User4.png` },
  //   { name: "DAVIS CURTIS", rank: 4, img: `${ImagePath}user/User3.png` },
  //   { name: "MADELYN DIAS", rank: 5, img: `${ImagePath}user/User2.png` },
  //   { name: "CRAIG GOUSE", rank: 6, img: `${ImagePath}user/User4.png` },
  //   { name: "DAVIS CURTIS", rank: 4, img: `${ImagePath}user/User3.png` },
  //   { name: "DAVIS CURTIS", rank: 4, img: `${ImagePath}user/User3.png` },
  //   { name: "MADELYN DIAS", rank: 5, img: `${ImagePath}user/User2.png` },
  //   { name: "CRAIG GOUSE", rank: 6, img: `${ImagePath}user/User4.png` },
  //   { name: "DAVIS CURTIS", rank: 4, img: `${ImagePath}user/User3.png` },
  //   { name: "MADELYN DIAS", rank: 5, img: `${ImagePath}user/User2.png` },
  //   { name: "CRAIG GOUSE", rank: 6, img: `${ImagePath}user/User4.png` },
  //   { name: "DAVIS CURTIS", rank: 4, img: `${ImagePath}user/User3.png` },
  //   { name: "DAVIS CURTIS", rank: 4, img: `${ImagePath}user/User3.png` },
  //   { name: "MADELYN DIAS", rank: 5, img: `${ImagePath}user/User2.png` },
  //   { name: "CRAIG GOUSE", rank: 6, img: `${ImagePath}user/User4.png` },
  // ];

  const getBackgroundStyle = (rank: number) => {
    if (rank === 1) {
      return { backgroundImage: `url(${ImagePath}/winner/Winner1.png)` };
    } else if (rank === 2) {
      return { backgroundImage: `url(${ImagePath}/winner/Winner2.png)` };
    } else if (rank === 3) {
      return { backgroundImage: `url(${ImagePath}/winner/Winner3.png)` };
    }
  };

  const TimeBox: FC<{ title: string; value: string }> = ({ title, value }) => (
    <div className="flex flex-col items-center rounded-xl shadow-2xl overflow-hidden bg-white/30 py-2 sm:py-4 backdrop-blur-md px-4 sm:px-11">
      <p className="text-2xl sm:text-4xl font-normal text-green-600">{value}</p>
      <p className="text-black font-semibold text-center text-base">{title}</p>
    </div>
  );

  return (
    <>
      {data?.data.length === 0 || isFinished ? (
        <div className="w-full h-[400px] flex flex-col items-center justify-center  bg-cover bg-center rounded-2xl " style={{ backgroundImage: `url(${ImagePath}CountDown.jpg)` }}>
          {/* Timer Wrapper */}
          <div>
            <div className="flex items-center gap-6 justify-between">
              {/* ITEM */}
              <TimeBox title="HOUR" value={hours} />
              {/* <span className="text-3xl font-semibold text-black">:</span> */}
              <TimeBox title="MIN" value={minutes} />
              {/* <span className="text-3xl font-semibold text-black">:</span> */}
              <TimeBox title="SEC" value={seconds} />
            </div>

            {/* Message */}
            <p className="mt-8 px-5 py-3 rounded-md font-normal text-center bg-white/45 backdrop-blur-md shadow-2xl">Result will be announced soon</p>
          </div>
        </div>
      ) : (
        <>
          <div className={`relative bg-[url(/assets/images/result/Leaderboard-bg.png)] bg-cover bg-center w-full flex flex-col items-center p-5 rounded-xl`}>
            {/* Top message */}
            {LeaderboardData && (
              <div className="bg-white text-gray-900 p-3 rounded-lg shadow font-normal w-full flex flex-wrap max-sm:justify-center items-center gap-2">
                <div className="bg-primary text-white w-10 h-10 flex items-center justify-center rounded-xl font-semibold text-lg">{LeaderboardData[0]?.rank || "1"}</div>
                {/* 🏅 You are doing better than <span className="text-orange-600 px-1">60%</span> of other players! */}
                🏅 {LeaderboardData[0]?.firstName || ""} {LeaderboardData[0]?.lastName || ""}
              </div>
            )}

            <div className="mt-10 grid grid-cols-3 justify-center items-end gap-5 w-full">
              {RanksData?.filter((list) => Number(list.endPlace) <= 3)?.map((list) =>
                list.winners?.map((item, i) => (
                  <div key={i} className={`flex flex-col items-center max-sm:w-full ${i === 0 ? "max-sm:order-1" : i === 2 ? "max-sm:order-2" : ""}`}>
                    <img src={`${ImagePath}result/Trophy.png`} alt="Trophy" className={`${item.rank === 1 ? "w-50 h-45" : item.rank === 2 ? "w-40 h-35" : item.rank === 3 ? "w-35 h-30" : ""}`} />
                    <div className={`w-full rounded-t-lg text-white font-semibold py-3 text-center ${item.rank === 1 ? "text-6xl" : item.rank === 2 ? "text-3xl" : item.rank === 3 ? "text-2xl" : ""}`} style={getBackgroundStyle(item.rank)}>
                      {item.rank}
                    </div>
                    <div className="w-full bg-white text-center rounded-b-xl shadow p-4">
                      <img src={item.profileImage || `${ImagePath}user/User.png`} alt={item.firstName} className="w-12 h-12 rounded-sm mx-auto mb-2" />
                      <p className="font-semibold text-sm">
                        {item.firstName} {item.lastName}
                      </p>
                      <p className="text-xs text-gray-600">{item.points}</p>
                    </div>
                  </div>
                ))
              )}
              {/* {RanksData?.map((item, i) => (
            <div key={i} className={`flex flex-col items-center w-1/3 max-sm:w-full ${i === 0 ? "max-sm:order-1" : i === 2 ? "max-sm:order-2" : ""}`}>
              <img src={`${ImagePath}result/Trophy.png`} alt="Trophy" />
              <div className={`w-full rounded-t-lg text-white  font-semibold py-3 text-center`} style={getBackgroundStyle(Number(item.startPlace))}>
                {item.startPlace}
              </div>
              {item.winners?.map((list, index) => (
                <div key={index} className="w-full bg-white text-center rounded-b-xl shadow p-4">
                  <img src={list.profileImage || `${ImagePath}user/User.png`} alt={list.firstName} className="w-12 h-12 rounded-sm mx-auto mb-2" />
                  <p className="font-semibold text-sm">{list.firstName} {list.lastName}</p>
                  <p className="text-xs text-gray-600">{list.points}</p>
                </div>
              ))}
            </div>
          ))} */}
              {/* {players.map((p, i) => (
            <div key={p.id} className={`flex flex-col items-center w-1/3 max-sm:w-full ${i === 0 ? "max-sm:order-1" : i === 2 ? "max-sm:order-2" : ""}`}>
              <img src={`${ImagePath}result/Trophy.png`} alt="Trophy" className={`${p.size.split(" ")[0]}`} />
              <div className={`w-full rounded-t-lg text-white ${p.size.split(" ")[2]} font-semibold py-3 text-center`} style={getBackgroundStyle(p.id)}>
                {p.id}
              </div>
              <div className="w-full bg-white text-center rounded-b-xl shadow p-4">
                <img src={p.img} alt={p.name} className="w-12 h-12 rounded-sm mx-auto mb-2" />
                <p className="font-semibold text-sm">{p.name}</p>
                <p className="text-xs text-gray-600">{p.score}</p>
              </div>
            </div>
          ))} */}
              {/* </div> */}
            </div>
          </div>
          <div className="pt-7">
            <div className="bg-input-box rounded-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-5 w-full max-h-[450px] overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-0">
              {/* {Users.map((user, index) => (
                <div key={index} className="w-full mx-auto flex items-center gap-x-4 rounded-xl bg-white p-3 sm:p-6 shadow-lg ">
                  <img className="size-12 rounded-sm" src={user.img} alt="ChitChat Logo" />
                  <div>
                    <div className="max-sm:text-sm text-gray-500">{user.rank}TH RANK</div>
                    <p className="text-md sm:text-xl font-medium capitalize">{user.name}</p>
                  </div>
                </div>
              ))} */}
              {RanksData?.filter((list) => Number(list.endPlace) <= 3)?.map((list) =>
                list.winners?.map((user, index) => (
                  <div key={index} className="w-full mx-auto flex items-center gap-x-4 rounded-xl bg-white p-3 sm:p-6 shadow-lg ">
                    <img className="size-12 rounded-sm" src={user.profileImage || `${ImagePath}user/User.png`} alt="ChitChat Logo" />
                    <div>
                      <div className="max-sm:text-sm text-gray-500">{user.rank}TH RANK</div>
                      <p className="text-md sm:text-xl font-medium capitalize">
                        {user.firstName} {user.lastName}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Leaderboard;
