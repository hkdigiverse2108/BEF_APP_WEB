import { Link } from "react-router-dom";
import { SOCIAL_MEDIA } from "../Data/Links";

const Footer = () => {
  return (
    <footer className="bg-black text-white flex flex-wrap justify-center md:justify-between items-center p-5 gap-3 px-9">
      {/* Social Icons */}
      <div className="flex gap-3 mt-4">
        {SOCIAL_MEDIA?.map((item) => {
          const Icon = item?.icon;
          return (
            <Link
              key={item?.title}
              to={item?.link}
              className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white hover:text-orange-500 transition"
            >
              <Icon />
            </Link>
          );
        })}
      </div>

      <div className="text-center text-base">
        © Copyrights {new Date().getFullYear()} All rights reserved by
        <Link
          to="https://hkdigiverse.com/"
          className="font-medium underline ps-1"
        >
          HK DigiVerse LLP
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
