import React, { useContext, useEffect, useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Header from './Components/Header'
import Home from './Pages/Home'
import Cart from './Pages/Cart'
import Products from './Pages/Products'
import ProductView from './Pages/ProductView'
import Footer from './Components/Footer';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeContext } from './Context/ThemeContext'
function App() {
  const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
          
               <div className="flex items-center justify-center min-h-screen text-2xl font-bold text-blue-600">
                LOADING YOUR APP..... &nbsp;
    <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full border-l-0 animate-spin"></div>
</div>
               
            
        );
    }
    const test = useContext(ThemeContext)
  return (
    <div className={`${test.theme === "light"?'bg-slate-800 text-white dark':'bg-slate-50 text-black ' }`}>

   
    <BrowserRouter>
      <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/products' element={<Products/>}/>
      <Route path='/product-view/:id' element={<ProductView/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
    </div>
  )
}

export default App