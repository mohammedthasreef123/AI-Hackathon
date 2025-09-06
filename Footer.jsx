import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

import { Link } from "react-router-dom";
const currentYear = new Date().getFullYear();
const Footer = () => {
  return (
  <>
    <footer className="bg-black/95 text-white py-12 font-[Josefin Sans] w-full mt-auto">
      <div className="flex flex-wrap justify-between gap-8 px-6 sm:px-12 md:px-16 lg:px-20 max-w-[1400px] mx-auto">

        {/* Column 1: Social + Contact */}
        <div className="flex-1 min-w-[250px]">
          <h4 className="text-[17px] font-semibold mb-5 uppercase">
          GROCERY
          </h4>
           <p className="text-[15px] flex items-center gap-2 mb-2">
               CART & CARRY
            </p>
           <p className="text-[15px] flex items-center gap-2 mb-2">
              <FaPhoneAlt className="text-[14px]" /> +91 1234567891
            </p>
            <p className="text-[15px] flex items-center gap-2">
              <FaEnvelope className="text-[14px]" /> cart & carry@gmail.com
            </p>
        </div>

        {/* Column 2: Tips & Guides */}
        <div className="flex flex-col min-w-[250px]">
          <h4 className="text-[17px] font-semibold mb-5 uppercase">
            Quick Links
          </h4>
          <Link to={"/about-us"} className="text-[15px] mb-2 text-[#f1f1f1] cursor-pointer hover:underline">
            About Us
          </Link>
          <Link to={"/about-product"} className="text-[15px] mb-2 text-[#f1f1f1] cursor-pointer hover:underline">
           About Product
          </Link>
          <Link to={"/offices"} className="text-[15px] mb-2 text-[#f1f1f1] cursor-pointer hover:underline">
          Contact Us
          </Link>
        </div>

        {/* Column 3: Eyewear */}
        <div className="flex flex-col min-w-[250px]">
          <h4 className="text-[17px] font-semibold mb-5 uppercase">
           Customer Service
          </h4>
          <Link to={"/terms-and-conditions"} className="text-[15px] mb-2 text-[#f1f1f1] cursor-pointer hover:underline">
          Terms & Conditions
          </Link>
          <Link to={"/faq"} className="text-[15px] mb-2 text-[#f1f1f1] cursor-pointer hover:underline">
           FAQ`s
          </Link>
          <Link to={"/report-issue"} className="text-[15px] mb-2 text-[#f1f1f1] cursor-pointer hover:underline">
           Report Issues
          </Link>
        </div>

         <div>
          <h4 className="uppercase font-semibold mb-2">Contact</h4>
          <input
            type="email"
            placeholder="Enter Email Address"
            className="w-full border border-blue-600 rounded px-3 py-2 mb-2 text-sm outline-none"
          />
          <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600">
            Subscribe
          </button>
          <p className="mt-1 text-xs text-gray-600">We never spam you!</p>
        </div>


      </div>
      
    </footer>
    {/* Bottom Blue Bar */}
        <div className="bg-blue-600 text-white text-center py-3 text-sm">
          ©{currentYear} Cart & Carry. Shop With Us
        </div>
    </>
  );
};

export default Footer;

