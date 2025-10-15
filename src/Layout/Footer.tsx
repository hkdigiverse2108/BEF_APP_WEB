import { FaInstagram, FaTelegramPlane, FaTwitter } from "react-icons/fa";
import { PiPhoneCallLight } from "react-icons/pi";
import { Link } from "react-router-dom";
import { ImagePath, ROUTES } from "../Constants";

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10 py-10">
        <div>
          <div className="flex gap-4 items-center pb-4">
            <figure className="w-12 sm:w-18 h-full">
              <img src={`${ImagePath}logo/Logo.png`} alt="BEF-Logo" className="w-full h-full object-contain" />
            </figure>
            <section className="flex flex-col justify-center">
              <h1 className="text-sm sm:text-xl text-white font-extrabold">Bharat Exam Fest</h1>
              <p className="text-xs sm:text-sm text-success font-medium">Learn & Earn</p>
            </section>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-lg">info@bharatexamfest.com</p>
            <a href="tel:+91 8585858585" className="flex text-lg">
              <h5 className="flex">
                <PiPhoneCallLight className="text-xl me-1" />
                Call
              </h5>
              <div className="pl-1">+91 8585858585</div>
            </a>
            <a href="tel:+91 8585858585" className="flex text-lg">
              <h5 className="flex">
                <PiPhoneCallLight className="text-xl me-1" />
                Call
              </h5>
              <div className="pl-1">+91 1111111111</div>
            </a>
          </div>

          <div className="flex gap-3 mt-4">
            <a href="#" className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white hover:text-primary transition">
              <FaInstagram />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white hover:text-primary transition">
              <FaTwitter />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white hover:text-primary transition">
              <FaTelegramPlane />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-2xl font-bold mb-0 md:mb-11 pt-5">Help & Support</h4>
          <ul className="space-y-1 text-lg">
            <li>
              <Link to={ROUTES.ABOUT_US.ABOUT_US} className="hover:underline">
                About us
              </Link>
            </li>
            <li>
              <Link to={ROUTES.ILLEGALITY.ILLEGALITY} className="hover:underline">
                Illegality
              </Link>
            </li>
            <li>
              <Link to={ROUTES.TERMS_CONDITIONS.TERMS_CONDITIONS} className="hover:underline">
                Terms & conditions
              </Link>
            </li>
            <li>
              <Link to={ROUTES.PRIVACY_POLICY.PRIVACY_POLICY} className="hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to={ROUTES.KYC.KYC} className="hover:underline">
                KYC Verification
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-2xl font-bold mb-0 md:mb-11 pt-5">Let’s Try Out</h4>
          <div className="flex flex-col gap-4 max-md:pt-3">
            <img src={`${ImagePath}footer/appstore_blue.png`} alt="App Store" className="px-5 py-3 bg-white rounded-lg w-35 cursor-pointer" />
            <img src={`${ImagePath}footer/googleplay_blue.png`} alt="Google Play" className="px-5 py-3 bg-white rounded-lg w-35 cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="text-center text-base bg-black border-t border-white/20 py-5">
        © Copyrights 2024 All rights reserved by <span className="font-medium">Nexify Learning Solutions LLP</span>.
      </div>
    </footer>
  );
};

export default Footer;
