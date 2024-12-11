import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from "axios";
import { FaArrowAltCircleRight, FaBoxOpen, FaCartPlus, FaCashRegister, FaEye, FaRedo, FaRupeeSign, FaShoppingCart, FaStar, FaTruck } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
const ProductSlider = () => {
    const navigate = useNavigate();
    const [sliderData, setSliderData] = useState([]);
    const [product, setproduct] = useState([]);
    const getSliderData = async () => {
        try {
            const res = await axios.get("http://localhost:3000/slider/get");
            setSliderData(res.data.sliderData);
        } catch (error) {
            console.error("Error fetching slider data:", error);
        }
    };
    const getProductData = async () => {
        try {
            const res = await axios.get('http://localhost:3000/product/get');
            setproduct(res.data.ProductData);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        getSliderData();
        getProductData();
    }, []);
    const handleView = (product)=>{
navigate(`/product-view/${product._id}`,{state:product})
    }


    const handleAddToCart = (product) => {
        const cartItem = JSON.parse(localStorage.getItem('CartItems')) || [];
        const len = cartItem.length;
          if(len > 0){
            const addAllready=  cartItem.filter((item)=>(item._id == product._id));
            const length =  addAllready.length ;
            console.log(length);
            if(length == 0 ){
                cartItem.push(product);
                localStorage.setItem("CartItems", JSON.stringify(cartItem))
                toast.success("Product added in cart !!")
            }
            else{
                return toast.error("Product already in cart!")
              }
          }
          else{
            cartItem.push(product);
            localStorage.setItem("CartItems", JSON.stringify(cartItem))
            toast.success("Product added in cart !!")
          }
      }
      const handleSliderBuyNowBtn = ()=>{
        toast.info('Sorry slider product is only for show case, try card products!')
      }
    return (
        <div className="md:flex block">
            <div className="md:w-2/3 w-full md:p-4 p-2">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation={false}
                    pagination={{ clickable: true, dynamicBullets: true, }}
                    autoplay={{ delay: 1500 }}
                    loop={true}
                    spaceBetween={30}
                    slidesPerView={1}
                    className=" mx-auto mySwiper"
                >
                    {sliderData.map((slide, index) => (
                        <SwiperSlide key={index} className=" ">
                            <div className="relative w-full md:h-96 h-72  rounded-lg overflow-hidden shadow-lg">
                                <img
                                    src={`http://localhost:3000/uploads/${slide.sliderImage}`}
                                    alt={`Slide ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent  opacity-75  "></div>
                                <div className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white flex-col flex justify-center items-center ">
                                    <h2 className="text-2xl font-bold mb-2">{slide.sliderName}</h2>
                                    <div >

                                        <button className="bg-blue-600 mt-4 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-300  animate-bounce ease-in-out delay-100"onClick={handleSliderBuyNowBtn}>
                                            BUY NOW
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="md:p-4 p-2 md:mx-10">
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        navigation={true}
                        pagination={{ clickable: true, dynamicBullets: true, }}
                        autoplay={false}
                        loop={true}
                        breakpoints={{
                            1024: {
                                spaceBetween: 20,
                                slidesPerView: 3
                            },
                            768: {
                                spaceBetween: 10,
                                slidesPerView: 1,
                            },
                            480: {
                                spaceBetween: 5,
                                slidesPerView: 1,
                            }
                        }}
                        className=" mx-auto mySwiper "
                    >
                        {product.map((product, index) => (
                            <SwiperSlide
                                key={index}
                                className="border rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300"
                            >
                                <div className="w-full h-72 relative">
                                    <img
                                        src={`http://localhost:3000/uploads/products/${product.ProductImage[0]}`}
                                        alt={`Slide ${index + 1}`}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg">
                                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center p-4 w-11/12 bg-white/80 rounded-lg shadow backdrop-blur">
                                            <h2 className="text-lg font-bold text-gray-800 truncate">
                                                {product.ProductName}
                                            </h2>
                                            <div className="flex justify-between items-center mt-3">
                                                <div className="flex items-center gap-1 bg-blue-600 text-white font-medium px-2 py-1 rounded shadow">
                                                    <FaRupeeSign />
                                                    <span>{product.ProductPrice}</span>
                                                </div>
                                                <button
                                                    className="bg-blue-600 p-2 rounded-md hover:bg-blue-700 transition-colors"
                                                    aria-label="View Product"
                                                    onClick={()=>handleView(product)}
                                                >
                                                    <FaEye className="text-white" />
                                                    
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}

                    </Swiper>



                </div>


                <div className="text-blue-600 font-semibold text-center text-lg underline underline-offset-2"><Link to='/products'>More Products</Link></div>
                <div className="container mx-auto px-4 mt-0 py-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5  text-center">
                        {/* Feature 1 */}
                        <div className="flex flex-col items-center justify-center space-y-2">
                            <div className="bg-gray-100 p-4 rounded-full shadow-md">
                                <FaCashRegister className="text-blue-500 text-2xl" />
                            </div>
                            <p className="text-gray-700 text-sm font-medium">Pay on Delivery</p>
                        </div>
                        {/* Feature 2 */}
                        <div className="flex flex-col items-center justify-center space-y-2">
                            <div className="bg-gray-100 p-4 rounded-full shadow-md">
                                <FaRedo className="text-blue-500 text-2xl" />
                            </div>
                            <p className="text-gray-700 text-sm font-medium">7 Days Replacement</p>
                        </div>
                        {/* Feature 3 */}
                        <div className="flex flex-col items-center justify-center space-y-2">
                            <div className="bg-gray-100 p-4 rounded-full shadow-md">
                                <FaBoxOpen className="text-blue-500 text-2xl" />
                            </div>
                            <p className="text-gray-700 text-sm font-medium">Amazon Delivered</p>
                        </div>
                        {/* Feature 4 */}
                        <div className="flex flex-col items-center justify-center space-y-2">
                            <div className="bg-gray-100 p-4 rounded-full shadow-md">
                                <FaTruck className="text-blue-500 text-2xl" />
                            </div>
                            <p className="text-gray-700 text-sm font-medium">Free Delivery</p>
                        </div>
                        {/* Feature 5 */}
                        <div className="flex flex-col items-center justify-center space-y-2">
                            <div className="bg-gray-100 p-4 rounded-full shadow-md">
                                <FaStar className="text-blue-500 text-2xl" />
                            </div>
                            <p className="text-gray-700 text-sm font-medium">Top Brands</p>
                        </div>
                    </div>
                </div>

            </div>



            <div className="md:w-2/3 p-4 w-full ">
                <div className="font-extrabold text-black text-center text-xl md:mb-4 mb-1 shadow-2xl border px-1 rounded"><sapn className='text-blue-600'>TOP</sapn> DEAL TODAY</div>
                {product.slice(2, 4).map((item) => (

                    <div className="border rounded-lg overflow-visible  shadow-md mb-4">
                        {/* Product Image */}
                        <div className="w-full h-56  hover:scale-105 transition-all duration-100 ease-in-out flex items-center justify-center">
                            <img
                                src={`http://localhost:3000/uploads/products/${item.ProductImage[1]}`}
                                alt='title'
                                className="h-full object-cover "
                            />
                        </div>

                        {/* Product Info */}
                        <div className="px-4  text-center text-whit">
                            <h3 className="text-xl font-semibold">{item.ProductName}</h3>
                            <p className="mt-4 text-lg font-bold">INR {item.ProductPrice}</p>
                        </div>

                        {/* Add to Cart Button */}
                        <div className="rounded-xl m-4 bg-white text-blue-700 text-center">
                        <button className="  font-semibold uppercase bg-slate-200 hover:text-blue-500 flex justify-center items-center w-full py-2 rounded" onClick={() => handleAddToCart(item)}>
                                        <FaCartPlus className="mr-2" />Add to Cart <ToastContainer/>
                                    </button>
                        </div>
                    </div>
                ))}


                {/* <div className=" bg-blue-700 mt-24 rounded-lg overflow-visible shadow-md p-4">
                    <div className="w-full h-56  flex items-center justify-center">
                        <img
                            src={`http://localhost:3000/uploads/1733298480713_car1.png`}
                            alt='title'
                            className="h-full object-contain mt-[-50%]"
                        />
                    </div>

                    <div className="px-4 mt-[-30%] text-center text-white">
                        <h3 className="text-xl font-semibold">title</h3>
                        <p className="text-sm mt-2">description</p>
                        <p className="mt-4 text-lg font-bold">$price</p>
                    </div>

                    <div className="rounded-xl m-4 bg-white text-center">
                        <button className="text-blue-700  hover:bg-slate-200 hover:text-blue-500 font-semibold uppercase w-full py-2 rounded">
                            Add to Cart
                        </button>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default ProductSlider;
