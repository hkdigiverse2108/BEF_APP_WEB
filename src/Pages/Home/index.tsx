import Classes from "../../Components/Home/Classes";
import Course from "../../Components/Home/Course";
import HeroBanner from "../../Components/Home/HeroBanner";
import SocialMediaEngage from "../../Components/Home/SocialMediaEngage";
import YoutubeValues from "../../Components/Home/YoutubeValues";

const Home = () => {
  return (
    <div className="sub-container">
      <HeroBanner />
      <Classes />
      <hr className="w-[95%] mx-auto text-theme my-8" />
      <Course />
      <hr className="w-[95%] mx-auto text-theme my-8" />
      <YoutubeValues />
      <hr className="w-[95%] mx-auto text-theme my-8" />
      <SocialMediaEngage />
    </div>
  );
};

export default Home;
