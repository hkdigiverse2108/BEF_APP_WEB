import { FaInstagram, FaTelegramPlane, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white flex flex-wrap justify-center md:justify-between items-center p-5 gap-3 px-9">
      <div className="text-center text-base flex gap-3">
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
      <div className="text-center text-base">
        © Copyrights {new Date().getFullYear()} All rights reserved by
        <Link to="https://hkdigiverse.com/" className="font-medium underline ps-1">
          HK Digiverse & IT Consultancy Pvt Ltd.
        </Link>
      </div>
    </footer>
  );
};

export default Footer;