import Classes from "../../Components/Home/Classes";
import Contest from "../../Components/Home/Contest";
import Course from "../../Components/Home/Course";
import HeroBanner from "../../Components/Home/HeroBanner";
import Workshop from "../../Components/Home/Workshop";
import YoutubeValues from "../../Components/Home/YoutubeValues";

const Home = () => {
  return (
    <div className="sub-container">
      <HeroBanner />
      <Classes />
      <Contest />
      <Workshop />
      <Course />
      <YoutubeValues />
    </div>
  );
};

export default Home;
