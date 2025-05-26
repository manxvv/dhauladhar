import React from 'react';
import { AiFillInstagram } from 'react-icons/ai';
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaHome, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-emerald-700 text-white py-8">
      <div className="mx-auto px-4 sm:px-8">
        {/* Top Section */}
        <div className="flex flex-wrap justify-between gap-6">
    
          <div className="w-full md:w-1/4">
            <div className="flex items-center gap-2">
              {/* Logo icon */}
              <div className="bg-white rounded-full p-2">
                <FaHome className="w-6 h-6 text-emerald-700" />
              </div>
              <h3 className="font-bold text-lg">DHAULADHAR ESTATE</h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed">
              Your trusted partner for finding dream properties in the scenic landscapes of Himachal Pradesh.
            </p>
           
          </div>

          {/* Properties */}
          <div className="w-full md:w-1/4">
            <h4 className="font-bold my-2">Contact Us</h4>
            <ul className="text-sm space-y-2">
              <li className="flex items-center gap-2">
                <FaEnvelope size={14} />
                <span>rakeshguleria001@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <FaPhoneAlt size={14} />
                <span>+91-9816027737</span>
              </li>
              <li className="flex items-center gap-2">
                <FaMapMarkerAlt size={14} />
                <span>Palampur, Himachal Pradesh</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="w-full md:w-1/4">
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>About Us</li>
              <li>Client Testimonials</li>
              <li>Property Valuation</li>
            </ul>
          </div>

          {/* Newsletter */}
        </div>

        {/* Divider */}
        <div className="border-t border-emerald-600 my-6"></div>

        {/* Bottom Section */}
        <div className="flex flex-wrap items-center justify-between text-sm">
          <p className="text-emerald-200">
            Copyright © 2025 Dhauladhar Estate Realty Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex gap-4">
            {/* Social Icons */}
            <a href="#" className="text-emerald-200 hover:text-white transition">
              <FaFacebook size={20}/>
            </a>
            <a href="#" className="text-emerald-200 hover:text-white transition">
              <FaYoutube size={20}/>
            </a>
            <a href="#" className="text-emerald-200 hover:text-white transition">
              <AiFillInstagram size={20}/>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;