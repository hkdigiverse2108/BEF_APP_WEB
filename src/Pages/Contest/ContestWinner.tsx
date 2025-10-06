import { BsFillAlarmFill } from "react-icons/bs";
import { FaAward } from "react-icons/fa";
import { CardHeader } from "../../Components/Common/CardHeader";
import { IoIosArrowBack, IoIosArrowForward, IoMdTrophy } from "react-icons/io";
import { ImagePath } from "../../Constants";
import { FormButton, FormSelect } from "../../Attribute/FormFields";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay } from "swiper/modules";
import { useRef } from "react";

const winnersData = [
  {
    period: "Last Week",
    prize: "₹11.56 Lakhs",
    time: "28 Sep, 12:00 PM",
    winners: [
      {
        name: "Rashmi Better",
        rank: "#1",
        amount: "₹11,000",
        img: "https://api.dicebear.com/7.x/miniavs/svg?seed=4",
      },
      {
        name: "Rashmi Better",
        rank: "#2",
        amount: "₹11,000",
        img: "https://api.dicebear.com/7.x/miniavs/svg?seed=5",
      },
      {
        name: "Rashmi Better",
        rank: "#3",
        amount: "₹11,000",
        img: "https://api.dicebear.com/7.x/miniavs/svg?seed=6",
      },
      {
        name: "Rashmi Better",
        rank: "#4",
        amount: "₹11,000",
        img: "https://api.dicebear.com/7.x/miniavs/svg?seed=6",
      },
      {
        name: "Rashmi Better",
        rank: "#5",
        amount: "₹11,000",
        img: "https://api.dicebear.com/7.x/miniavs/svg?seed=6",
      },
      {
        name: "Rashmi Better",
        rank: "#6",
        amount: "₹11,000",
        img: "https://api.dicebear.com/7.x/miniavs/svg?seed=6",
      },
      {
        name: "Rashmi Better",
        rank: "#7",
        amount: "₹11,000",
        img: "https://api.dicebear.com/7.x/miniavs/svg?seed=6",
      },
      {
        name: "Rashmi Better",
        rank: "#8",
        amount: "₹11,000",
        img: "https://api.dicebear.com/7.x/miniavs/svg?seed=6",
      },
    ],
  },
  {
    period: "Last Week",
    prize: "₹11.56 Lakhs",
    time: "28 Sep, 12:00 PM",
    winners: [
      {
        name: "Rashmi Better",
        rank: "#1",
        amount: "₹11,000",
        img: "https://api.dicebear.com/7.x/miniavs/svg?seed=4",
      },
      {
        name: "Rashmi Better",
        rank: "#2",
        amount: "₹11,000",
        img: "https://api.dicebear.com/7.x/miniavs/svg?seed=5",
      },
      {
        name: "Rashmi Better",
        rank: "#3",
        amount: "₹11,000",
        img: "https://api.dicebear.com/7.x/miniavs/svg?seed=6",
      },
      {
        name: "Rashmi Better",
        rank: "#4",
        amount: "₹11,000",
        img: "https://api.dicebear.com/7.x/miniavs/svg?seed=6",
      },
      {
        name: "Rashmi Better",
        rank: "#5",
        amount: "₹11,000",
        img: "https://api.dicebear.com/7.x/miniavs/svg?seed=6",
      },
      {
        name: "Rashmi Better",
        rank: "#6",
        amount: "₹11,000",
        img: "https://api.dicebear.com/7.x/miniavs/svg?seed=6",
      },
      {
        name: "Rashmi Better",
        rank: "#7",
        amount: "₹11,000",
        img: "https://api.dicebear.com/7.x/miniavs/svg?seed=6",
      },
      {
        name: "Rashmi Better",
        rank: "#8",
        amount: "₹11,000",
        img: "https://api.dicebear.com/7.x/miniavs/svg?seed=6",
      },
    ],
  },
  {
    period: "Last Month",
    prize: "₹11.56 Lakhs",
    time: "28 Sep, 12:00 PM",
    winners: [
      {
        name: "Rashmi Better",
        rank: "#1",
        amount: "₹11,000",
        img: "https://api.dicebear.com/7.x/miniavs/svg?seed=7",
      },
      {
        name: "Rashmi Better",
        rank: "#1",
        amount: "₹11,000",
        img: "https://api.dicebear.com/7.x/miniavs/svg?seed=8",
      },
      {
        name: "Rashmi Better",
        rank: "#1",
        amount: "₹11,000",
        img: "https://api.dicebear.com/7.x/miniavs/svg?seed=9",
      },
      {
        name: "Rashmi Better",
        rank: "#1",
        amount: "₹11,000",
        img: "https://api.dicebear.com/7.x/miniavs/svg?seed=9",
      },
    ],
  },
];

const ContestWinner = () => {
  const swiperRefs = useRef<SwiperType[]>([]);

  console.log(swiperRefs.current[1]);

  return (
    <div className="w-full px-4 md:px-8 py-6 bg-white rounded-xl shadow-sm flex flex-col gap-3">
      <div className="flex justify-between mb-1 flex-wrap">
        <h2 className="text-sm sm:text-xl md:text-2xl font-bold">
          Mega Contest Winners
        </h2>
        <FormSelect
          name="Filter By"
          placeholder="Filter By"
          options={[{ label: "1", value: "one" }]}
        />
      </div>

      {winnersData.map((section, index) => (
        <>
          <span className="border border-b border-gray-100 flex w-full"></span>

          <div key={index} className="my-6 flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between gap-3">
              <CardHeader
                title={section.period}
                icon={<BsFillAlarmFill />}
                pricePool={{ icon: <IoMdTrophy />, price: section.prize }}
                time={section.time}
              />
              <div className="flex flex-nowrap   justify-end  ">
                <FormButton
                  text={<IoIosArrowBack />}
                  onClick={() => swiperRefs.current[index]?.slidePrev()}
                  className="!bg-input-box !border-none !rounded-r-none "
                />
                <FormButton
                  text={<IoIosArrowForward />}
                  onClick={() => swiperRefs.current[index]?.slideNext()}
                  className="!bg-black !text-white !rounded-l-none"
                />
              </div>
            </div>

            <Swiper
              modules={[A11y, Autoplay]}
              spaceBetween={20}
              slidesPerView={4}
              pagination={{ clickable: true }}
              className="w-full !px-1"
              onSwiper={(swiper) => {
                swiperRefs.current[index] = swiper;
              }}
            >
              {section.winners.map((winner, i) => (
                <SwiperSlide key={i}>
                  <div className="flex flex-col bg-white border border-primary rounded-xl shadow-sm w-full overflow-hidden">
                    {/* Header */}
                    <div className="flex justify-between items-center bg-input-box rounded-lg overflow-hidden m-2 p-4 relative">
                      <div className="flex items-center gap-3">
                        <span className="absolute bg-primary left-0 h-[70%] w-1 rounded-r-2xl"></span>
                        <img
                          src={winner.img}
                          alt={winner.name}
                          className="w-12 h-12 rounded-full object-cover border border-gray-200"
                        />
                        <div>
                          <h4 className="font-bold text-gray-800">
                            Rank {winner.rank}
                          </h4>
                          <p className="text-sm text-gray-600">{winner.name}</p>
                        </div>
                      </div>

                      <img
                        src={`${ImagePath}/contest/Contest-Trophy-2.png`}
                        alt="Trophy"
                        className="h-full absolute right-0 top-0"
                      />
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-center bg-orange-500 text-white px-4 py-2 text-sm font-semibold">
                      <span className="flex items-center gap-2">
                        <FaAward /> Won
                      </span>
                      <span className="text-lg">{winner.amount}</span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      ))}
    </div>
  );
};

export default ContestWinner;
