import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from "axios";

function Category() {
    const [category, setCategory] = useState([]);
    //category data fetch
    const getData = async () => {
        try {
            const res = await axios.get('http://localhost:3000/category/get');
            setCategory(res.data.categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };


    useEffect(() => {
        getData();
    }, []);
    return (
        <div className='px-4'>
            <div className='text-center font-bold text-lg mb-4'><span className='text-blue-600'>TOP</span> CATEGORY</div>
            <div className=' w-full px-4 mb-4'>
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation={false}
                    pagination={{ clickable: true, dynamicBullets: true, }}
                    autoplay={{ delay: 2000 }}
                    loop={true}
                    breakpoints={{
                        1024: {
                            spaceBetween: 20,
                            slidesPerView: 6.5
                        },
                        768: {
                            spaceBetween: 5,
                            slidesPerView: 3,
                        },
                        480: {
                            spaceBetween: 5,
                            slidesPerView: 2,
                        }
                    }}
                    className=" mx-auto mySwiper"
                >
                    {category.map((category, index) => (
                        <SwiperSlide key={index} className=" rounded-full w-12 h-12 mb-4  ">
                            <div className="flex flex-col justify-center items-center">
                                <div>
                                    <img
                                        src={`http://localhost:3000/uploads/category/${category.logo}`}
                                        loading='lazy'
                                        alt={`Slide ${index + 1}`}
                                        className="w-24 h-24 rounded-full shadow-lg hover:scale-105 transition ease-in-out object-cover"
                                    />
                                </div>
                                <div className=""></div>
                                <div className=" flex-col flex justify-center items-center ">
                                    <h2 className="text-lg  text-center font-semibold mb-2">{category.name}</h2>

                                </div>
                            </div>

                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default Category