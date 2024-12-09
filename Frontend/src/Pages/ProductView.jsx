import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaBoxOpen, FaCartPlus, FaCashRegister, FaHeart, FaRedo, FaStar, FaTruck } from "react-icons/fa";

const ProductView = () => {
  const location = useLocation();
  const {
    ProductCategory,
    ProductName,
    ProductPrice,
    ProductDescription,
    ProductBrand,
    ProductImage,
  } = location.state;
  const [image, setImage] = useState(ProductImage[0])
  const handleImageChange = (changeImage) => {
    setImage(changeImage)
  }
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images Section */}
        <div>
          <div className="flex space-x-4 justify-center items-center">
            {ProductImage.map((image, index) => (
              <img
                key={index}
                src={`http://localhost:3000/uploads/products/${image}`}
                alt={` ${image + 1}`}
                className="w-20 h-20 object-cover rounded-lg cursor-pointer border hover:border-blue-500"
                onClick={() => handleImageChange(image)}
              />
            ))}
          </div>
          <div className="mt-4">
            <img
              src={`http://localhost:3000/uploads/products/${image}`}
              alt={ProductName}
              className="w-full min-h-[70vh] rounded-lg shadow-md border-4"
            />
          </div>
          {/* Thumbnail Images */}
        </div>

        {/* Product Details Section */}
        <div className="text-center md:min-h-screen md:mt-10">
          <h2 className="text-3xl font-bold text-gray-800">{ProductName}</h2>
          <p className="text-sm text-gray-500 mt-1">{ProductCategory}</p>
          <div className="text-lg text-gray-600 mt-4">
            <span className="font-semibold">Brand:</span> {ProductBrand}
          </div>
          <div className="text-2xl text-blue-600 font-semibold mt-2">
            INR {ProductPrice}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4 mt-6 justify-center">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded flex items-center">
              <FaCartPlus className="mr-2" />
              Add to Cart
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded flex items-center">
              <FaHeart className="mr-2" />
              Buy Now
            </button>
          </div>
          <div className="mt-5 font-bold text-center text-xl uppercase ">Product Description</div>
          <div className="text-start">
          <li className="text-gray-700 mt-2 px-6">{ProductDescription.slice(0, 50)}</li>
          <li className="text-gray-700 mt-2 px-6">{ProductDescription.slice(51, 100)}</li>
          {ProductDescription.slice(101, 150) && (
            <li className="text-gray-700 mt-2 px-6">{ProductDescription.slice(101, 150)}</li>
          )
          }
          {ProductDescription.slice(151, 200) && (
            <li className="text-gray-700 mt-2 px-6">{ProductDescription.slice(151, 200)}</li>
          )}
          {ProductDescription.slice(200, 250) && (
          <li className="text-gray-700 mt-2 px-6">{ProductDescription.slice(200, 250)}</li>
          )}
          {ProductDescription.slice(251, 300) && (
          <li className="text-gray-700 mt-2 px-6">{ProductDescription.slice(251, 300)}</li>
          )}
          {ProductDescription.slice(301, 350) && (
          <li className="text-gray-700 mt-2 px-6">{ProductDescription.slice(301, 350)}</li>
          )}
          </div>
          <div className="container mx-auto px-4 mt-4 py-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-center">
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
      </div>
    </div>
  );
};

export default ProductView;
