import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useGetApiQuery } from "../../Api/CommonApi";
import { URL_KEYS } from "../../Constants";
import SpinLoader from "../Common/SpinLoader";

const HeroBanner = () => {
  const { data: BannersData, isLoading } = useGetApiQuery({
    url: URL_KEYS.BANNER.ALL,
  });

  const Banners = BannersData?.data?.banner_data;

  return (
    <div className="mb-8 overflow-hidden rounded-xl border border-border bg-card shadow-box-shadow">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        effect={"fade"}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
      >
        {isLoading ? (
          <div className="flex w-full h-full justify-center items-center">
            <SpinLoader />
          </div>
        ) : (
          Banners?.map((item: any) => {
            return (
              <SwiperSlide>
                <img
                  src={item?.image}
                  alt="banner"
                  className="w-full overflow-hidden object-cover"
                />
              </SwiperSlide>
            );
          })
        )}
      </Swiper>
    </div>
  );
};

export default HeroBanner;
