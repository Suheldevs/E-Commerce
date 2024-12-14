import React, { useContext, useEffect, useState } from "react";
import { FaSearch, FaBars, FaTimes, FaShoppingCart, FaSun, FaMoon } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Avatar, Dropdown } from 'flowbite-react'
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../Context/ThemeContext";
const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartItem, setCartItem] = useState(0)
  const [searchText,setSearchText] = useState('')

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
useEffect(()=>{
  const storedItems = JSON.parse(localStorage.getItem('CartItems')) || [];
  setCartItem(storedItems.length)
  const handleStorage = ()=>{
setCartItem(storedItems.length);
  }

  window.addEventListener("storage",handleStorage)
  return ()=>{
    window.addEventListener("storage",handleStorage)
    
  }
  
})
const handleSearch = ()=>{
  console.log('h')
console.log(searchText);

}
const test = useContext(ThemeContext)

  return (
    <header className=" shadow-md w-full">
      <div className="container mx-auto flex items-center px-1 py-2 justify-between  top-0 z-50  ">
        {/* Logo */}
        <div className="text-2xl font-bold ">
          <Link to="/"><span className="px-3 py-1 rounded bg-blue-700 text-white">Tech</span><span className=""> Orbite</span></Link>
        </div>

        {/* Search Bar for Mobile Screens */}
        <div className="block md:hidden w-2/6">
          <div className="flex items-center">
            <input
              name="searchtext"
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
            name="search"
            placeholder="Search products..."
            className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring focus:ring-blue-300"
            onChange={(e)=>setSearchText(e.target.value)}
          />
          <button className="bg-blue-700 text-white px-4 py-3 rounded-r-md hover:bg-blue-800" type="submit" onClick={handleSearch} >
            <FaSearch />
          </button>
        </div>

        {/* Navigation and Cart for Larger Screens */}
        <div className="flex justify-center items-center md:gap-10 gap-3  mr-0">
          <div className="hidden md:flex items-center space-x-6 w-full justify-center">
            {/* Navigation Links */}
            <nav className="flex items-center space-x-6 ">
              <Link to="/" className=" text-semibold hover:text-blue-700">
                Home
              </Link>
              <Link to="/products" className=" hover:text-blue-700">
                Products
              </Link>
              <Link to="/about" className=" hover:text-blue-700">
                About
              </Link>
              <Link to="/contact" className=" hover:text-blue-700">
                Contact
              </Link>
              <button onClick={test.toggelTheme} className="border-2 p-2 rounded-full">{test.theme == 'light'?(<FaSun/>):(<FaMoon/>)}</button>
            </nav>
          </div>

          {/* Cart Icon */}
          <div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Link to='/cart'>
                <FaShoppingCart className="text-blue-700 text-2xl cursor-pointer" />
                <span className="absolute -top-2 -right-2 bg-red-600  text-xs rounded-full px-2">
                  {cartItem}
                </span>
                </Link>
              </div>
              <div className='w-10'>
                <Dropdown
                  arrowIcon={false}
                  inline
                  label={
                    <Avatar alt="User" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                  }
                >
                  <Dropdown.Header className="dark:text-white">
                    Mohd Suhel
                  </Dropdown.Header>
                  <Dropdown.Item className="dark:text-white">Dashboard</Dropdown.Item>
                  <Dropdown.Item className="dark:text-white">View Cart</Dropdown.Item>
                  <Dropdown.Item className="dark:text-white">Orders</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item className="dark:text-white">Account</Dropdown.Item>
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
        <nav className="block md:hidden  shadow-md">
          <ul className="flex flex-col space-y-1 px-4 py-4">
            <li className="dark:bg-slate-700 p-2">
              <Link to="/" className=" hover:text-blue-700">
                Home
              </Link>
            </li>
            <li className="dark:bg-slate-700 p-2">
              <Link to="/shop" className=" hover:text-blue-700">
                Shop
              </Link>
            </li>
            <li className="dark:bg-slate-700 p-2">
              <Link to="/about" className=" hover:text-blue-700">
                About
              </Link>
            </li>
            <li className="dark:bg-slate-700 p-2">
              <Link to="/contact" className=" hover:text-blue-700">
                Contact
              </Link>
            </li>
            <li className="dark:bg-slate-700 p-2">
            <button onClick={test.toggelTheme} className="border-2 p-2 rounded-full">{test.theme == 'light'?(<FaSun/>):(<FaMoon/>)}</button>
            </li>
          </ul>
        </nav>
      )}
      <hr/>
    </header>
  );
};

export default Header;
