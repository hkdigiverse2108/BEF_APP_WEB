import { CardHeader } from "../../Components/Common/CardHeader";
import { useGetApiQuery } from "../../Api/CommonApi";
import { URL_KEYS } from "../../Constants";
import HeroBanner from "../../Components/Home/HeroBanner";
import { useRef } from "react";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay } from "swiper/modules";
import ContestDetailCatd from "../../Components/Contest/ContestDetailCatd";
import { Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { FormSelect } from "../../Attribute/FormFields";

const Contest = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  const { data: ContestData } = useGetApiQuery({
    url: `${URL_KEYS.CONTEST.ALL}?page=1&limit=10`,
  });

  const Contest = ContestData?.data.contest_data;

  // console.log(Contest);

  return (
    <div className="sub-container contestPage">
      <HeroBanner />
      <div className="flex justify-between h-fit rounded-md border border-input-box  ">
        <span className="h-fit">
          {" "}
          <Space.Compact size="large" >
            <Input addonBefore={<SearchOutlined />} placeholder="large size"  />
          </Space.Compact>
        </span>
        <span className=" !p-0 !h-fit">
          <FormSelect
            name="Filter By"
            placeholder="Filter By"
            options={[{ label: "1", value: "one" }]}
            className="!mb-0"
          />
        </span>
      </div>
      <div className="my-12 flex flex-col gap-8">
        <CardHeader
          title="Trending Now"
          sliderButton={{ swiperRefs: swiperRef }}
        />

        <Swiper
          modules={[A11y, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          className="w-full !px-1"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          breakpoints={{
            1024: { slidesPerView: 2 }, // lg: ≥1024px
            1380: { slidesPerView: 3 }, // xl: ≥1280px
          }}
        >
          {Contest?.map((item, i) => (
            <SwiperSlide key={i}>
              <ContestDetailCatd />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="my-12 flex flex-col gap-8">
        <CardHeader
          title="multiplier contest"
          sliderButton={{ swiperRefs: swiperRef }}
        />

        <Swiper
          modules={[A11y, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          className="w-full !px-1"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          breakpoints={{
            1024: { slidesPerView: 2 }, // lg: ≥1024px
            1380: { slidesPerView: 3 }, // xl: ≥1280px
          }}
        >
          {Contest?.map((item, i) => (
            <SwiperSlide key={i}>
              <ContestDetailCatd />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Contest;
