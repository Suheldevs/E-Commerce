import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaCartPlus } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
function ProductCard() {
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
    return (
        <div>
            <div className=" px-4 py-3 w-full mb-2 dark:bg-slate-700">
                <div className="font-extrabold  text-center  text-xl md:mb-4 mb-1 shadow-2xl  px-1 "><sapn className='text-blue-600'>HOT</sapn> PRODUCTS</div>
              
                    <div className=' w-full grid md:grid-cols-4 grid-cols-2 md:gap-4 gap-2'>
                        {product.slice(0,8).map((item) => (

                            <div className="border-2 rounded-lg overflow-visible  shadow-md md:mb-4 mt-0 bg-white">
                                {/* Product Image */}
                                <div className="w-full md:h-56 h-36 hover:scale-105 transition-all duration-100 ease-in-out flex items-center justify-center">
                                    <img
                                        src={`http://localhost:3000/uploads/products/${item.ProductImage[0]}`}
                                        alt='title'
                                        className="h-full object-cover "
                                    />
                                </div>

                                {/* Product Info */}
                                <div className="text-center dark:text-black md:px-4 px-2 mx-2">
                                    <h3 className="text-lg truncate ">{item.ProductName}</h3>
                                    <p className="md:mt-4 mt-2 text-lg md:font-bold font-semibold">INR {item.ProductPrice}</p>
                                </div>

                                {/* Add to Cart Button */}
                                <div className="rounded-xl flex flex-col gap-2 md:m-4 mt-1 m-2 bg-white text-blue-700 text-center">
                                    <button className="  font-semibold uppercase bg-slate-200 hover:text-blue-500 flex justify-center items-center w-full py-2 rounded" onClick={() => handleAddToCart(item)}>
                                        <FaCartPlus className="mr-2" />Add to Cart <ToastContainer />
                                    </button>
                                    <button className="  font-semibold uppercase  hover:bg-blue-400 bg-blue-500 text-white w-full py-2 rounded" onClick={() =>
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
    )
}

export default ProductCard