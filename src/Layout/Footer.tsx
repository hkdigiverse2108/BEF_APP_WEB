import { FaInstagram, FaTelegramPlane, FaTwitter } from "react-icons/fa";
import { ImagePath } from "../Constants";
import { PiPhoneCallLight } from "react-icons/pi";

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center mb-4">
            <img src={`${ImagePath}logo/Logo.png`} alt="Bharat Exam Fest" className="w-14 h-14 mr-3" />
            <div>
              <h3 className="text-lg font-bold">Bharat Exam Fest</h3>
              <p className="text-sm">Learn & Earn</p>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <p>info@bharatexamfest.com</p>
            <a href="tel:+91 8585858585" className="flex">
              <h5 className="flex">
                <PiPhoneCallLight className="text-xl me-1"/>
                Call
              </h5>
              <div className="pl-1">+91 8585858585</div>
            </a>
            <a href="tel:+91 8585858585" className="flex">
              <h5 className="flex">
                <PiPhoneCallLight className="text-xl me-1"/>
                Call
              </h5>
              <div className="pl-1">+91 1111111111</div>
            </a>
          </div>

          <div className="flex gap-3 mt-4">
            <a href="#" className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white hover:text-[#e98241] transition">
              <FaInstagram />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white hover:text-[#e98241] transition">
              <FaTwitter />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white hover:text-[#e98241] transition">
              <FaTelegramPlane />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-3">Help & Support</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:underline">
                About us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Legality
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Terms & conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Privacy policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Refund policy
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-3">Let’s Try Out</h4>
          <div className="flex flex-col gap-4">
            <img src="/images/appstore.png" alt="App Store" className="w-40 cursor-pointer" />
            <img src="/images/googleplay.png" alt="Google Play" className="w-40 cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="text-center mt-10 text-sm bg-black border-t border-white/20 py-4">
        © Copyrights 2024 All rights reserved by <span className="font-medium">Nexify Learning Solutions LLP</span>.
      </div>
    </footer>
  );
};

export default Footer;
