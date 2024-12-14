import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-800 dark:bg-slate-700 text-white py-12 mt-1">
      <div className="container mx-auto px-6">
        {/* Footer Top */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Us */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About Us</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your one-stop shop for the latest electronics and gadgets. From smartphones to smart homes, we have everything you need to stay connected and ahead of the curve.
            </p>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-400">Help Center</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">Returns</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">Order Tracking</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">Shipping Info</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <span className="mr-2">📍</span>
                123 Tech Street, Lucknow, India
              </li>
              <li className="flex items-center">
                <span className="mr-2">📞</span>
                +91 9519838720
              </li>
              <li className="flex items-center">
                <span className="mr-2">✉️</span>
                mohdsuhel.dev@gmail.com
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-3 bg-gray-700 rounded-full hover:bg-blue-500"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="p-3 bg-gray-700 rounded-full hover:bg-blue-400"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="p-3 bg-gray-700 rounded-full hover:bg-pink-500"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="p-3 bg-gray-700 rounded-full hover:bg-blue-600"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} TechOrbite. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
