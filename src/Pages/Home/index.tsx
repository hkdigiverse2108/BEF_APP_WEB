import Classes from "../../Components/Home/Classes";
import Course from "../../Components/Home/Course";
import HeroBanner from "../../Components/Home/HeroBanner";
import Workshop from "../../Components/Home/Workshop";
import YoutubeValues from "../../Components/Home/YoutubeValues";

const Home = () => {
  return (
    <div className="sub-container">
      <HeroBanner />
      <Classes />
      <hr className="w-[95%] mx-auto text-theme mt-2 mb-4 sm:my-8 opacity-20" />
      <Workshop />
      <Course />
      <hr className="w-[95%] mx-auto text-theme mt-2 mb-4 sm:my-8 opacity-20" />
      <YoutubeValues />
    </div>
  );
};

export default Home;
