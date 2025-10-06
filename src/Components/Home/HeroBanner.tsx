import { A11y, Autoplay, EffectCards, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { URL_KEYS } from "../../Constants";
import { useGetApiQuery } from "../../Api/CommonApi";

const HeroBanner = () => {
  const { data: BannersData, isLoading } = useGetApiQuery({
    url: URL_KEYS.BANNER.ALL,
  });

  const Banners = BannersData?.data?.banner_data;

  console.log(BannersData?.data?.banner_data);

  return (
    <div className="p-5">
      {isLoading ? (
        <div className="h-[30rem] flex justify-center items-center">
        </div>
      ) : (
        <Swiper
          // install Swiper modules
          modules={[Pagination, A11y, Autoplay, EffectCards]}
          spaceBetween={50}
          slidesPerView={1}
          centeredSlides={true}
          loop={true}
          effect="fade"
          autoplay={{ delay: 1000 }}
          pagination={{ clickable: true }}
        >
          {Banners?.map((item: any) => {
            return (
              <SwiperSlide>
                <img
                  src={item?.image}
                  alt="banner"
                  className="w-full rounded-2xl overflow-hidden"
                />
              </SwiperSlide>
            );
          })}

          {/* <SwiperSlide>
          <img
            src={`${ImagePath}banner/Banner1.png`}
            alt="logo"
            className="w-full"
          />
        </SwiperSlide> */}
          {/*<SwiperSlide>
          <img
            src={`${ImagePath}banner/Banner1.png`}
            alt="logo"
            className="w-full"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={`${ImagePath}banner/Banner1.png`}
            alt="logo"
            className="w-full"
          /> */}
          {/* </SwiperSlide> */}
        </Swiper>
      )}
    </div>
  );
};

export default HeroBanner;
