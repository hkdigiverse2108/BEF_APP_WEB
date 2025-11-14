import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useGetApiQuery } from "../../Api/CommonApi";
import { URL_KEYS } from "../../Constants";
import Loader from "../Common/Loader";

const HeroBanner = () => {
  const { data: BannersData, isLoading } = useGetApiQuery({
    url: URL_KEYS.BANNER.ALL,
  });

  const Banners = BannersData?.data?.banner_data;

  return (
    <div className="my-5 rounded-lg overflow-hidden">
      <Swiper modules={[Pagination, Autoplay, EffectFade]} spaceBetween={50} slidesPerView={1} loop={true} effect={'fade'} autoplay={{ delay: 10000 }} pagination={{ clickable: true }}>
        {isLoading ? (
          <Loader />
        ) : (
          Banners?.map((item: any) => {
            return (
              <SwiperSlide>
                <img src={item?.image} alt="banner" className="w-full rounded-2xl overflow-hidden" />
              </SwiperSlide>
            );
          })
        )}
        {/* <SwiperSlide>
          <img
            src={`${ImagePath}banner/Banner1.jpg`}
            alt="logo"
            className="w-full max-sm:h-[137px]"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={`${ImagePath}banner/Banner1.jpg`}
            alt="logo"
            className="w-full max-sm:h-[137px]"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={`${ImagePath}banner/Banner1.jpg`}
            alt="logo"
            className="w-full max-sm:h-[137px]"
          />
        </SwiperSlide> */}
      </Swiper>
    </div>
  );
};

export default HeroBanner;
