import React from "react";
import { Heart, Globe } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white/80 backdrop-blur-sm border-t border-gray-100 py-4 px-8 fixed bottom-0">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>© {currentYear} Tinder Clone</span>
          <Heart size={12} className="fill-pink-500 text-pink-500" />
        </div>

        <div className="flex items-center gap-6 text-[10px] font-bold text-gray-700 uppercase tracking-wider">
          <div className="flex items-center gap-1 cursor-pointer hover:text-black">
            <Globe size={12} />
            <span>English</span>
          </div>
          <a href="#" className="hover:text-black transition-colors">
            FAQ
          </a>
          <a href="#" className="hover:text-black transition-colors">
            Safety Tips
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
