import { A11y, Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ImagePath } from "../../Constants";

const HeroBanner = () => {
  return (
    <div className="p-5">
      <Swiper
        // install Swiper modules
        modules={[Pagination, A11y, Autoplay, EffectFade]}
        spaceBetween={50}
        slidesPerView={1}
        centeredSlides={true}
        loop={true}
        effect="fade"
        autoplay={{ delay: 1000 }}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide>
          <img src={`${ImagePath}banner/Banner1.png`} alt="logo" className="w-full" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={`${ImagePath}banner/Banner1.png`} alt="logo" className="w-full" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={`${ImagePath}banner/Banner1.png`} alt="logo" className="w-full" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={`${ImagePath}banner/Banner1.png`} alt="logo" className="w-full" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HeroBanner;
