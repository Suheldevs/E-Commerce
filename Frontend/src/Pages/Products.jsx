import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { FaCartPlus, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import useCategory from "../ComtomHooks/useCategory";
function Products(searchText, setSearchText) {
  const navigate = useNavigate();
  const categoryData = useCategory();
  const [product, setproduct] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const getProductData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/product/get");
      setproduct(res.data.ProductData);
      setFilterData(res.data.ProductData);
      console.log(product);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);
  const handleAddToCart = (product) => {
    const cartItem = JSON.parse(localStorage.getItem("CartItems")) || [];
    const len = cartItem.length;
    if (len > 0) {
      const addAllready = cartItem.filter((item) => item._id == product._id);
      const length = addAllready.length;
      console.log(length);
      if (length == 0) {
        cartItem.push(product);
        localStorage.setItem("CartItems", JSON.stringify(cartItem));
        toast.success("Product added in cart !!");
      } else {
        return toast.error("Product already in cart!");
      }
    } else {
      cartItem.push(product);
      localStorage.setItem("CartItems", JSON.stringify(cartItem));
      toast.success("Product added in cart !!");
    }
  };

  const handleCategory = (name) => {
    const filter = product.filter((item) => item.ProductCategory == name);
    setFilterData(filter);
  };
  const handlePriceRange = (e) => {
    const { name, value } = e.target;
    setPriceRange({ ...priceRange, [name]: Number(value) });
    console.log(priceRange);
  };

  const rangeFilter = () => {
    const rangedata = product.filter(
      (item) =>
        parseInt(item.ProductPrice) >= priceRange.min &&
        parseInt(item.ProductPrice) <= priceRange.max
    );
    console.log(rangedata);
    setFilterData(rangedata);
  };
  const handleSearch = (e)=>{
    const text = e.target.value;
    const search = text.trim()
    setSearchText(search)
    const filterData = product.filter((item)=>((item.ProductName.toLowerCase().includes( searchText.toLowerCase())) || (item.ProductPrice.includes(searchText))))
    setFilterData(filterData)
  }
  return (
    <div>
      <div className=" p-4 w-full ">
        <ToastContainer />
        <div className="font-extrabold text-black dark:text-white text-center  text-xl md:mb-4 mb-1 shadow-2xl  px-1 ">
          <sapn className="text-blue-600">HOT</sapn> PRODUCTS
        </div>
        <div className="flex items-center justify-center mb-2 ">
          <input
            type="text"
            placeholder="Search products..."
            value={searchText}
            className="w-1/3 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring focus:ring-blue-300"
            onChange={handleSearch}
          />
          <button className="bg-blue-700 text-white px-4 py-3 rounded-r-md hover:bg-blue-800">
            <FaSearch />
          </button>
        </div>
       
        <div className="w-full md:flex block gap-4">
          <div className="bg-gray-300 md:w-1/5 w-full md:min-h-[90vh] min-h-[20vh] md:mb-0 mb-2">
            <div className="bg-white m-2">
              <div className="text-center font-semibold text-lg ">
                Categories
              </div>
              <ul className="list-none m-2 md:h-[30vh] h-[20vh] overflow-y-auto scroll-smooth ">
                {categoryData[0].length > 0 ? (
                  <div className="">
                    {categoryData[0].map((item, i) => (
                      <li
                        key={i}
                        className="p-1 m-1 truncate hover:bg-gray-300 rounded-sm cursor-pointer"
                        onClick={() => handleCategory(item.name)}
                      >
                        {item.name}
                      </li>
                    ))}
                  </div>
                ) : (
                  <div className="">CAtegory not found</div>
                )}
              </ul>
            </div>
            <div className="w-full p-2 flex flex-col justify-center items-center gap-1">
              <div className="text-center font-semibold text-lg ">
                Price Range
              </div>
              <div className="bg-white rounded px-2 font-semibold">
                Min: {priceRange.min}
              </div>
              <div className="text-blue-600 w-full">
                <input
                  type="range"
                  min={0}
                  max={10000}
                  title="Minimum Value"
                  name="min"
                  onChange={handlePriceRange}
                  className="w-full"
                />
              </div>
              <div className="bg-white rounded px-2 font-semibold">
                Max: {priceRange.max}
              </div>
              <div className=" w-full">
                <input
                  type="range"
                  min={0}
                  max={10000}
                  defaultValue={10000}
                  title="Maximum Value"
                  name="max"
                  onChange={handlePriceRange}
                  className="w-full"
                />
              </div>
              <div
                className="bg-white rounded px-2 font-semibold text-blue-600 cursor-pointer hover:bg-slate-100"
                onClick={rangeFilter}
              >
                {" "}
                Apply
              </div>
            </div>
          </div>
          <div className="md:w-4/5 w-full grid md:grid-cols-3 grid-cols-1 gap-4">
            {filterData.length ? (
              filterData.map((item) => (
                <div className="border rounded-lg overflow-visible  shadow-md mb-4">
                  {/* Product Image */}
                  <div className="w-full h-56  hover:scale-105 transition-all duration-100 ease-in-out flex items-center justify-center">
                    <img
                      src={`http://localhost:3000/uploads/products/${item.ProductImage[1]}`}
                      alt="title"
                      className="h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src =
                          "http://localhost:3000/uploads/image_Not_found.jpg";
                      }}
                    />
                  </div>

                  {/* Product Info */}
                  <div className="px-4  text-center text-whit">
                    <h3 className="text-xl font-semibold">
                      {item.ProductName}
                    </h3>
                    <p className="mt-4 text-lg font-bold">
                      INR {item.ProductPrice}
                    </p>
                  </div>

                  {/* Add to Cart Button */}
                  <div className="rounded-xl flex flex-col gap-2 m-4 bg-white text-blue-700 text-center">
                    <button
                      className="  font-semibold uppercase bg-slate-200 hover:text-blue-500 flex justify-center items-center w-full py-2 rounded"
                      onClick={() => handleAddToCart(item)}
                    >
                      <FaCartPlus className="mr-2" />
                      Add to Cart
                    </button>
                    <button
                      className="  font-semibold uppercase  hover:bg-blue-400 bg-blue-700 text-white w-full py-2 rounded"
                      onClick={() =>
                        navigate(`/product-view/${item._id}`, {
                          state: item,
                        })
                      }
                    >
                      BUY NOW
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="uppercase text-center mt-10 text-red-500 font-semibold text-xl">
                <span className="border-4 text-3xl font-extrabold  h-10 flex justify-center items-center w-10 border-red-500 rounded-full">
                  !
                </span>
                <span> no product of this filter!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
