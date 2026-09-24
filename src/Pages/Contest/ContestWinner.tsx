import { useRef } from "react";
import { BsFillAlarmFill } from "react-icons/bs";
import { Swiper as SwiperType } from "swiper";
import { A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useGetApiQuery } from "../../Api/CommonApi";
import SectionHeader from "../../Components/Common/SectionHeader";
import { CardHeader } from "../../Components/Common/CardHeader";
import ContestWinnerCard from "../../Components/Contest/ContestWinnerCard";
import { URL_KEYS } from "../../Constants";
import type { WinnerApiResponse, WinnersBox } from "../../Types";
import SpinLoader from "../../Components/Common/SpinLoader";

const ContestWinner = () => {
  const swiperRefs = useRef<SwiperType[]>([]);
  const { data: winnerData, isLoading } = useGetApiQuery<WinnerApiResponse>({
    url: URL_KEYS.USER.WINNER_LIST,
  });

  const Winners = ({ ListData, title, index }: WinnersBox) => {
    return (
      <div className="flex flex-col gap-3">
        <div className="border-t border-border w-full mt-6 mb-2"></div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between gap-3">
            <CardHeader
              title={title}
              icon={<BsFillAlarmFill />}
              sliderButton={{ swiperRefs, index }}
            />
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
            {ListData?.map((winner, i) => (
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
    <div className="sub-container">
      <section className="mb-2">
        <SectionHeader title="Mega Contest Winners" />
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">Celebrating students whose dedication turned ambition into achievement.</p>
      </section>

      {isLoading ? (
        <div className="flex justify-center items-center h-100">
          <SpinLoader />
        </div>
      ) : (
        <>
          {winnerData?.data?.todayUsers.length !== 0 && (
            <Winners
              ListData={winnerData?.data?.todayUsers}
              title={"Last Day"}
              index={0}
            />
          )}
          {winnerData?.data?.lastWeekUsers.length !== 0 && (
            <Winners
              ListData={winnerData?.data?.lastWeekUsers}
              title={"Last Week"}
              index={1}
            />
          )}
          {winnerData?.data?.lastMonthUsers.length !== 0 && (
            <Winners
              ListData={winnerData?.data?.lastMonthUsers}
              title={"Last Month"}
              index={2}
            />
          )}
          {winnerData?.data?.lastYearUsers.length !== 0 && (
            <Winners
              ListData={winnerData?.data?.lastYearUsers}
              title={"Last Year"}
              index={3}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ContestWinner;
