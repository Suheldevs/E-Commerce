import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../Components/Hero';
import '../app.css'
import Logo from '../Components/Logo';
import Category from '../Components/Category';
import Product from '../Components/Product';
import Slider from '../Components/Slider';
import axios from 'axios';
import { Avatar } from 'flowbite-react';
import HeroSection from '../Components/Hero';
function Dashboard() {
  const location = useLocation();
  const [logo, setLogo] = useState(null);
  const userData = location.state?.userData || {};



  const [currentview, setCurrentview] = useState("Hero");
  const handleMenuClick = (view) => {
    setCurrentview(view)
  }
  const renderContent = () => {
    switch (currentview) {
      case "Hero":
        return <div><HeroSection /></div>
      case "Logo":
        return <div><Logo /></div>
      case "Slider":
        return <div><Slider /></div>
      case "Category":
        return <div><Category /></div>
      case "Product":
        return <div><Product /></div>

    }
  }

  useEffect(() => {
    getlogo();
  }, [])
  ///log fetch

  const getlogo = async () => {
    try {
      const res = await axios.get('http://localhost:3000/logo/get');
      setLogo(res.data.logoData.reverse())
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='dashboard-container'>
      <div className="sidebar">
        <h3>
          Sidebar menu
        </h3>
        <ul>
          <li onClick={() => handleMenuClick('Hero')}>Hero</li>
          <li onClick={() => handleMenuClick('Logo')}>Logo</li>
          <li onClick={() => handleMenuClick('Slider')}>Slider</li>
          <li onClick={() => handleMenuClick('Category')}>Category</li>
          <li onClick={() => handleMenuClick('Product')}>Products</li>
        </ul>
      </div>
      {/* //main dashboard */}
      <div className='main-content'>
        {/* header */}
        <header className='header'>


          <h2 className='view-tittle'>Wellcome! <span className='text-xl font-bold'>{userData.name}</span> </h2>
          <div className='profile-section'>
            <div className='h-[40px] w-[40px] rounded-full'>
              {/* {logo ? (<img src={`http://localhost:3000/uploads/${logo[0].image}`} className='rounded-full' alt={logo[0].image} />) : (<div><Avatar rounded /></div>)} */}
            </div>
          </div>


        </header>
        <main className='content'>
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

export default Dashboard