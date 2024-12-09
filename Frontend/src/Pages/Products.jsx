import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaCartPlus } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
function Products() {
    const navigate = useNavigate();
    const [product, setproduct] = useState([]);
    const getProductData = async () => {
        try {
            const res = await axios.get('http://localhost:3000/product/get');
            setproduct(res.data.ProductData);
            console.log(product)
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        getProductData();
    }, []);

    const handleAddToCart = (product) => {
        const cartItem = JSON.parse(localStorage.getItem('CartItems')) || []
        cartItem.push(product);
        localStorage.setItem("CartItems", JSON.stringify(cartItem))
        console.log(cartItem)
    }
    return (
        <div>
            <div className=" p-4 w-full ">
                <div className="font-extrabold text-black text-center  text-xl md:mb-4 mb-1 shadow-2xl  px-1 "><sapn className='text-blue-600'>HOT</sapn> PRODUCTS</div>
                <div className='w-full md:flex block gap-4'>
                    <div className='bg-red-300 md:w-1/5 w-full md:min-h-[90vh] min-h-[20vh] md:mb-0 mb-2'>
                        Fiters
                    </div>
                    <div className='md:w-4/5 w-full grid md:grid-cols-3 grid-cols-1 gap-4'>
                        {product.map((item) => (

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
                                <div className="rounded-xl flex flex-col gap-2 m-4 bg-white text-blue-700 text-center">
                                    <button className="  font-semibold uppercase bg-slate-200 hover:text-blue-500 flex justify-center items-center w-full py-2 rounded" onClick={() => handleAddToCart(item)}>
                                        <FaCartPlus className="mr-2" />Add to Cart
                                    </button>
                                    <button className="  font-semibold uppercase  hover:bg-blue-400 bg-blue-700 text-white w-full py-2 rounded" onClick={() =>
                                        navigate(`/product-view/${item._id}`, {
                                            state: item,
                                        })
                                    }>
                                        BUY NOW
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products