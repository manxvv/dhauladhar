import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="bg-white font-bold h-fit w-full shadow-md fixed top-0 z-50">
      <div className="mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src="/logo.png" className="h-10 w-16" alt="Agency Logo" />
            <span className="text-lg font-bold text-emerald-700">Dhauladhar Estate</span>
          </div>

          {/* Menu Items (Desktop) */}
          <ul className="hidden md:flex space-x-8 text-emerald-700">
            <Link to="/">
              <li className="cursor-pointer hover:text-emerald-600 transition duration-300">
                Home
              </li>
            </Link>
            <Link to="/properties">
              <li className="cursor-pointer hover:text-emerald-600 transition duration-300">
                Properties
              </li>
            </Link>
            {/* <Link to="/plots">
              <li className="cursor-pointer hover:text-emerald-600 transition duration-300">
                Plots
              </li>
            </Link> */}
            <Link to="/contact">
              <li className="cursor-pointer hover:text-emerald-600 transition duration-300">
                Contact
              </li>
            </Link>
          </ul>

          <div className="hidden md:flex items-center space-x-4">
         
            <Link
              to="/property-search"
              className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition duration-300 flex items-center"
            >
              <span>Find Your Dream Home</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-emerald-700 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-3">
            <ul className="space-y-4 text-emerald-700">
              <Link to="/">
                <li className="block cursor-pointer hover:text-emerald-600 py-2 px-3 hover:bg-emerald-50 rounded transition duration-300">
                  Home
                </li>
              </Link>
              <Link to="/properties">
                <li className="block cursor-pointer hover:text-emerald-600 py-2 px-3 hover:bg-emerald-50 rounded transition duration-300">
                  Properties
                </li>
              </Link>
              <Link to="/services">
                <li className="block cursor-pointer hover:text-emerald-600 py-2 px-3 hover:bg-emerald-50 rounded transition duration-300">
                  Services
                </li>
              </Link>
              <Link to="/agents">
                <li className="block cursor-pointer hover:text-emerald-600 py-2 px-3 hover:bg-emerald-50 rounded transition duration-300">
                  Our Agents
                </li>
              </Link>
              <Link to="/testimonials">
                <li className="block cursor-pointer hover:text-emerald-600 py-2 px-3 hover:bg-emerald-50 rounded transition duration-300">
                  Testimonials
                </li>
              </Link>
              <Link to="/contact">
                <li className="block cursor-pointer hover:text-emerald-600 py-2 px-3 hover:bg-emerald-50 rounded transition duration-300">
                  Contact
                </li>
              </Link>
              <Link to="/property-search">
                <li className="block my-3 bg-emerald-600 text-white text-center px-4 py-2 rounded-md hover:bg-emerald-700 transition duration-300">
                  Find Your Dream Home
                </li>
              </Link>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;