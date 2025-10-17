import { ImagePath } from "../../../Constants";

const Leaderboard = () => {
  const players = [
    { id: 2, name: "MADELYN DIAS", score: "1,469 QP", color: "bg-success", img: `${ImagePath}user/User2.png`, size: "w-40 h-35 text-3xl" },
    { id: 1, name: "DAVIS CURTIS", score: "1,469 QP", color: "bg-primary", img: `${ImagePath}user/User3.png`, size: "w-50 h-45 text-6xl" },
    { id: 3, name: "CRAIG GOUSE", score: "1,469 QP", color: "bg-purple-dark", img: `${ImagePath}user/User4.png`, size: "w-35 h-30 text-2xl" },
  ];
  const getBackgroundStyle = (rank: number) => {
    if (rank === 1) {
      return { backgroundImage: `url(${ImagePath}/winner/Winner1.png)` };
    } else if (rank === 2) {
      return { backgroundImage: `url(${ImagePath}/winner/Winner2.png)` };
    } else if (rank === 3) {
      return { backgroundImage: `url(${ImagePath}/winner/Winner3.png)` };
    }
  };

  const Users = [
    { name: "DAVIS CURTIS", rank: 4, img: `${ImagePath}user/User3.png` },
    { name: "MADELYN DIAS", rank: 5, img: `${ImagePath}user/User2.png` },
    { name: "CRAIG GOUSE", rank: 6, img: `${ImagePath}user/User4.png` },
    { name: "DAVIS CURTIS", rank: 4, img: `${ImagePath}user/User3.png` },
    { name: "DAVIS CURTIS", rank: 4, img: `${ImagePath}user/User3.png` },
    { name: "MADELYN DIAS", rank: 5, img: `${ImagePath}user/User2.png` },
    { name: "CRAIG GOUSE", rank: 6, img: `${ImagePath}user/User4.png` },
    { name: "DAVIS CURTIS", rank: 4, img: `${ImagePath}user/User3.png` },
    { name: "MADELYN DIAS", rank: 5, img: `${ImagePath}user/User2.png` },
    { name: "CRAIG GOUSE", rank: 6, img: `${ImagePath}user/User4.png` },
    { name: "DAVIS CURTIS", rank: 4, img: `${ImagePath}user/User3.png` },
    { name: "DAVIS CURTIS", rank: 4, img: `${ImagePath}user/User3.png` },
    { name: "MADELYN DIAS", rank: 5, img: `${ImagePath}user/User2.png` },
    { name: "CRAIG GOUSE", rank: 6, img: `${ImagePath}user/User4.png` },
    { name: "DAVIS CURTIS", rank: 4, img: `${ImagePath}user/User3.png` },
    { name: "MADELYN DIAS", rank: 5, img: `${ImagePath}user/User2.png` },
    { name: "CRAIG GOUSE", rank: 6, img: `${ImagePath}user/User4.png` },
    { name: "DAVIS CURTIS", rank: 4, img: `${ImagePath}user/User3.png` },
    { name: "DAVIS CURTIS", rank: 4, img: `${ImagePath}user/User3.png` },
    { name: "MADELYN DIAS", rank: 5, img: `${ImagePath}user/User2.png` },
    { name: "CRAIG GOUSE", rank: 6, img: `${ImagePath}user/User4.png` },
    { name: "DAVIS CURTIS", rank: 4, img: `${ImagePath}user/User3.png` },
    { name: "MADELYN DIAS", rank: 5, img: `${ImagePath}user/User2.png` },
    { name: "CRAIG GOUSE", rank: 6, img: `${ImagePath}user/User4.png` },
    { name: "DAVIS CURTIS", rank: 4, img: `${ImagePath}user/User3.png` },
    { name: "DAVIS CURTIS", rank: 4, img: `${ImagePath}user/User3.png` },
    { name: "MADELYN DIAS", rank: 5, img: `${ImagePath}user/User2.png` },
    { name: "CRAIG GOUSE", rank: 6, img: `${ImagePath}user/User4.png` },
    { name: "DAVIS CURTIS", rank: 4, img: `${ImagePath}user/User3.png` },
    { name: "MADELYN DIAS", rank: 5, img: `${ImagePath}user/User2.png` },
    { name: "CRAIG GOUSE", rank: 6, img: `${ImagePath}user/User4.png` },
    { name: "DAVIS CURTIS", rank: 4, img: `${ImagePath}user/User3.png` },
    { name: "DAVIS CURTIS", rank: 4, img: `${ImagePath}user/User3.png` },
    { name: "MADELYN DIAS", rank: 5, img: `${ImagePath}user/User2.png` },
    { name: "CRAIG GOUSE", rank: 6, img: `${ImagePath}user/User4.png` },
  ];

  return (
    <>
      <div className={`relative bg-[url(/assets/images/result/Leaderboard-bg.png)] bg-cover bg-center w-full flex flex-col items-center p-5 rounded-xl`}>
        {/* Top message */}
        <div className="bg-white text-gray-900 p-3 rounded-lg shadow font-semibold w-full flex flex-wrap max-sm:justify-center items-center gap-2">
          <div className="bg-primary text-white w-10 h-10 flex items-center justify-center rounded-xl font-bold text-lg">4</div>
          🏅 You are doing better than <span className="text-orange-600 px-1">60%</span> of other players!
        </div>

        {/* Podium */}
        <div className="mt-10 flex max-sm:flex-wrap justify-center items-end gap-5 w-full">
          {players.map((p, i) => (
            <div key={p.id} className={`flex flex-col items-center w-1/3 max-sm:w-full ${i === 0 ? "max-sm:order-1" : i === 2 ? "max-sm:order-2" : ""}`}>
              <img src={`${ImagePath}result/Trophy.png`} alt="Trophy" className={`${p.size.split(" ")[0]}`} />
              <div className={`w-full rounded-t-lg text-white ${p.size.split(" ")[2]} font-bold py-3 text-center`} style={getBackgroundStyle(p.id)}>
                {p.id}
              </div>
              <div className="w-full bg-white text-center rounded-b-xl shadow p-4">
                <img src={p.img} alt={p.name} className="w-12 h-12 rounded-sm mx-auto mb-2" />
                <p className="font-bold text-sm">{p.name}</p>
                <p className="text-xs text-gray-600">{p.score}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pt-7">
        <div className="bg-input-box rounded-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-5 w-full min-h-[200px] max-h-[450px] overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-0">
          {Users.map((user, index) => (
            <div key={index} className="w-full mx-auto flex items-center gap-x-4 rounded-xl bg-white p-3 sm:p-6 shadow-lg ">
              <img className="size-12 rounded-sm" src={user.img} alt="ChitChat Logo" />
              <div>
                <div className="max-sm:text-sm text-gray-500">{user.rank}TH RANK</div>
                <p className="text-md sm:text-xl font-medium capitalize">{user.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
