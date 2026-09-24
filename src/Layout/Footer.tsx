import { Link } from "react-router-dom";
import { SOCIAL_MEDIA } from "../Data/Links";
import { HK_DIGIVERSE_URL } from "../Constants";

const Footer = () => {
  return (
    <div className="bg-primary text-white mt-8">
      <footer className="container container-p mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-5 py-5 sm:py-6">
        {/* Social Icons */}
        <div className="flex gap-3">
          {SOCIAL_MEDIA?.map((item) => {
            const Icon = item?.icon;
            return (
              <Link key={item?.title} to={item?.link} className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center hover:bg-white hover:text-primary transition-all duration-300">
                <Icon />
              </Link>
            );
          })}
        </div>

        <div className="text-center text-xs sm:text-sm text-white/80">
          © Copyrights {new Date().getFullYear()} All rights reserved by
          <Link target="_blank" to={HK_DIGIVERSE_URL} className="font-semibold underline ps-1 text-white">
            HK DigiVerse LLP
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
