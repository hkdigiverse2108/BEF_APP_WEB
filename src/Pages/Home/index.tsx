import Classes from "../../Components/Home/Classes";
import Contest from "../../Components/Home/Contest";
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
      <YoutubeValues />
    </div>
  );
};

export default Home;
