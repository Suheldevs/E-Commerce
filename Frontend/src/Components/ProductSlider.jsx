import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from "axios";
import { FaArrowAltCircleRight, FaEye, FaRupeeSign, FaShoppingCart } from "react-icons/fa";

const ProductSlider = () => {
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
    const discount = 40;
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
                            <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg">
                                <img
                                    src={`http://localhost:3000/uploads/${slide.sliderImage}`}
                                    alt={`Slide ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent  opacity-75  "></div>
                                <div className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white flex-col flex justify-center items-center ">
                                    <h2 className="text-2xl font-bold mb-2">{slide.sliderName}</h2>
                                    <div >

                                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-300  animate-bounce ease-in-out delay-100">
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
                        className=" mx-auto mySwiper"
                    >
                        {product.map((product, index) => (
                            <SwiperSlide key={index} className=" ">
                                <div className=" w-full h-96">
                                    <img
                                        src={`http://localhost:3000/uploads/${product.ProductImage}`}
                                        alt={`Slide ${index + 1}`}
                                        className="w-full opacity-100  hover:opacity-90 h-full object-cover rounded-md "
                                    />
                                    <div className="absolute bottom-0 bg-gradient-to-t to-transparent from-gray-500 w-full flex flex-col items-center justify-center text-center top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/ text-white p-6">
                                        <h2 className="text-xl font-bold mb-2">{product.ProductName}</h2>
                                        <div className="flex justify-around w-full items-center">
                                            <div className="flex justify-center bg-blue-500 p-1 rounded items-center">
                                                <FaRupeeSign /> {product.ProductPrice}
                                            </div>
                                            <div>

                                                <button className=" text-white hover:bg-blue-600 px-4 py-2 border animate-bounce duration-100 delay-100 rounded-md ">
                                                    <FaArrowAltCircleRight />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>



                </div>

            </div>



            <div className="md:w-2/3 p-4 w-full ">
                <div className=" bg-blue-700 rounded-lg mt-24 overflow-visible  shadow-md p-4">
                    {/* Product Image */}
                    <div className="w-full h-56  flex items-center justify-center">
                        <img
                            src={`http://localhost:3000/uploads/1733298480713_car1.png`}
                            alt='title'
                            className="h-full object-contain mt-[-50%]"
                        />
                    </div>

                    {/* Product Info */}
                    <div className="px-4 mt-[-30%] text-center text-white">
                        <h3 className="text-xl font-semibold">title</h3>
                        <p className="text-sm mt-2">description</p>
                        <p className="mt-4 text-lg font-bold">$price</p>
                    </div>

                    {/* Add to Cart Button */}
                    <div className="rounded-xl m-4 bg-white text-blue-700 text-center">
                        <button className="  font-semibold uppercase hover:bg-slate-200 hover:text-blue-500 w-full py-2 rounded">
                            Add to Cart
                        </button>
                    </div>
                </div>
                <div className=" bg-blue-700 mt-24 rounded-lg overflow-visible shadow-md p-4">
                    {/* Product Image */}
                    <div className="w-full h-56  flex items-center justify-center">
                        <img
                            src={`http://localhost:3000/uploads/1733298480713_car1.png`}
                            alt='title'
                            className="h-full object-contain mt-[-50%]"
                        />
                    </div>

                    {/* Product Info */}
                    <div className="px-4 mt-[-30%] text-center text-white">
                        <h3 className="text-xl font-semibold">title</h3>
                        <p className="text-sm mt-2">description</p>
                        <p className="mt-4 text-lg font-bold">$price</p>
                    </div>

                    {/* Add to Cart Button */}
                    <div className="rounded-xl m-4 bg-white text-center">
                        <button className="text-blue-700  hover:bg-slate-200 hover:text-blue-500 font-semibold uppercase w-full py-2 rounded">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductSlider;
