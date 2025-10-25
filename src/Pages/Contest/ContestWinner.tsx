import { Spin } from "antd";
import { useRef } from "react";
import { BsFillAlarmFill } from "react-icons/bs";
import { IoMdTrophy } from "react-icons/io";
import { Swiper as SwiperType } from "swiper";
import { A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useGetApiQuery } from "../../Api/CommonApi";
import { FormSelect } from "../../Attribute/FormFields";
import { CardHeader } from "../../Components/Common/CardHeader";
import ContestWinnerCard from "../../Components/Contest/ContestWinnerCard";
import { URL_KEYS } from "../../Constants";
import type { WinnerApiResponse, WinnersBox } from "../../Types";

const ContestWinner = () => {
  const swiperRefs = useRef<SwiperType[]>([]);
  const { data: winnerData, isLoading } = useGetApiQuery<WinnerApiResponse>({ url: URL_KEYS.USER.WINNER_LIST });

  const Winners = ({ ListData, title, index }: WinnersBox) => {
    return (
      <div className="flex flex-col gap-3">
        <span className="border border-b border-gray-100 flex w-full my-6 "></span>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between gap-3">
            <CardHeader title={title} icon={<BsFillAlarmFill />} pricePool={{ icon: <IoMdTrophy />, price: "11111" }} sliderButton={{ swiperRefs, index }} />
          </div>

          <Swiper
            modules={[A11y]}
            spaceBetween={20}
            slidesPerView={1}
            className="w-full !px-1"
            onSwiper={(swiper) => (swiperRefs.current[index] = swiper)}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {ListData.map((winner, i) => (
              <SwiperSlide key={i}>
                <ContestWinnerCard winner={winner} rank={i + 1} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    );
  };

  return (
    <div className="sub-container pt-6">
      <div className="flex justify-between flex-wrap">
        <h2 className="text-sm sm:text-xl md:text-2xl font-bold">Mega Contest Winners</h2>
        <div className="question-section">
          <FormSelect name="Filter By" placeholder="Filter By" options={[{ label: "1", value: "one" }]} className="!m-0" />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-100">
          <Spin size="large"/>
        </div>
      ) : (
        <>
          <Winners ListData={winnerData?.data?.todayUsers} title={"Last Day"} index={0} />
          <Winners ListData={winnerData?.data?.lastWeekUsers} title={"Last Week"} index={1} />
          <Winners ListData={winnerData?.data?.lastMonthUsers} title={"Last Month"} index={2} />
          <Winners ListData={winnerData?.data?.lastYearUsers} title={"Last Year"} index={3} />
        </>
      )}
    </div>
  );
};

export default ContestWinner;
