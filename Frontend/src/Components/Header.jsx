import React, { useState } from "react";
import { FaSearch, FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Avatar, Dropdown } from 'flowbite-react'
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(3); // Example cart count

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-white shadow-md w-full">
      <div className="container mx-auto flex items-center px-1 py-2 justify-between  top-0 z-50  ">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-700">
          <Link to="/"><span className="px-3 py-1 rounded bg-blue-700 text-white">Tech</span><span className="">Orbite</span></Link>
        </div>

        {/* Search Bar for Mobile Screens */}
        <div className="block md:hidden w-2/6">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search pro..."
              className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button className="bg-blue-700 text-white px-4 py-3 rounded-r-md hover:bg-blue-800">
              <FaSearch />
            </button>
          </div>
        </div>



        {/* Search Bar for Larger Screens */}
        <div className="hidden md:flex items-center w-1/3">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button className="bg-blue-700 text-white px-4 py-3 rounded-r-md hover:bg-blue-800">
            <FaSearch />
          </button>
        </div>

        {/* Navigation and Cart for Larger Screens */}
        <div className="flex justify-center items-center md:gap-10 gap-3  mr-0">
          <div className="hidden md:flex items-center space-x-6 w-full justify-center">
            {/* Navigation Links */}
            <nav className="flex items-center space-x-6">
              <Link to="/" className="text-gray-600 hover:text-blue-700">
                Home
              </Link>
              <Link to="/shop" className="text-gray-600 hover:text-blue-700">
                Shop
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-blue-700">
                About
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-blue-700">
                Contact
              </Link>
            </nav>
          </div>

          {/* Cart Icon */}
          <div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <FaShoppingCart className="text-blue-700 text-2xl cursor-pointer" />
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
                  {cartCount}
                </span>
              </div>
              <div className='w-10'>
                <Dropdown
                  arrowIcon={false}
                  inline
                  label={
                    <Avatar alt="User" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                  }
                >
                  <Dropdown.Header>
                    Mohd Suhel
                  </Dropdown.Header>
                  <Dropdown.Item>Dashboard</Dropdown.Item>
                  <Dropdown.Item>View Cart</Dropdown.Item>
                  <Dropdown.Item>Orders</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item>Account</Dropdown.Item>
                </Dropdown>
              </div>
            </div>
          </div>
          {/* Hamburger Menu */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-blue-700 text-2xl focus:outline-none"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>
      {/* Navigation Links for Mobile Screens */}
      {menuOpen && (
        <nav className="block md:hidden bg-white shadow-md">
          <ul className="flex flex-col space-y-4 px-4 py-4">
            <li>
              <Link to="/" className="text-gray-600 hover:text-blue-700">
                Home
              </Link>
            </li>
            <li>
              <Link to="/shop" className="text-gray-600 hover:text-blue-700">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-600 hover:text-blue-700">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-600 hover:text-blue-700">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
