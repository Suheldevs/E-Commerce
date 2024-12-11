import { Button } from 'flowbite-react';
import React, { useEffect, useState } from 'react'


function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem('CartItems')) || [];
        const updateItems = storedItems.map((item) => ({
            ...item,
            quantity: item.quantity || 1,
        }));
        setCartItems(updateItems);
        const initialTotal = updateItems.reduce(
            (total, item) => total + item.ProductPrice * item.quantity,
            0
        );
        setTotalPrice(initialTotal);
        console.log(initialTotal)
    }, [])
    //quantity change
    const handleQuantityChange = (index, newQuanatity) => {
        const updateItems = [...cartItems];
        updateItems[index].quantity = newQuanatity;
        setCartItems(updateItems);
        localStorage.setItem('CartItems', JSON.stringify(updateItems));

        const newTotal = updateItems.reduce((total, item) => total + item.ProductPrice * item.quantity, 0);
        setTotalPrice(newTotal);

    }
    const handleRemoveItem = (index) => {
        const updateItems = cartItems.filter((_, i) => i !== index);
        setCartItems(updateItems);
        alert(updateItems.length)
        localStorage.setItem('CartItems', JSON.stringify(updateItems));

        const newTotal = updateItems.reduce((total, item) => total + item.ProductPrice * item.quantity, 0);
        setTotalPrice(newTotal);
    }

    const handlePayNow = ()=>{
        const options = {
            key:'rzp_live_HGCsLV5PjSYo8F',
            amount:totalPrice*100,
            currency:"INR",
            name:'TechOrbite',
            description:'Order Payment',
            image:'https://yourlogo.com',
            handler:function(response){
                alert('Payment successfull!' + response.razorpay_payment_id);
            },
            prefill:{
                name:'customer Name',
                email:'test@gmail.com',
                contact:'9519838720',

            },
            notes:{
                address:"werty",
            },
            theme:{
                color:'#FFFFF',
            },
        };
        const razorpay = new window.Razorpay(options);
        razorpay.open();
    }
    return (
        <div className="container mx-auto md:p-4 p-2 w-screen mt-4">
    <div className="bg-white shadow-md rounded-lg  md:p-6 p-2">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center uppercase ">Cart Details</h2>
        {cartItems.length > 0 ? (
            <>
                <table className=" border-collapse border  overflow-x-auto md:w-full  border-gray-200 rounded-lg">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="px-4 py-2 border-b text-left font-medium">Product Name</th>
                            <th className="px-4 py-2 hidden md:table-cell border-b text-left font-medium">Price</th>
                            <th className="px-4 py-2 border-b hidden md:table-cell text-left font-medium">Category</th>
                            <th className="px-4 py-2 border-b text-left font-medium">Quantity</th>
                            <th className="px-4 py-2 border-b text-left font-medium">Total</th>
                            <th className="px-4 py-2 border-b text-center font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border-b text-gray-600">{item.ProductName}</td>
                                <td className="px-4 py-2 border-b hidden md:table-cell text-gray-600">&#8377;{item.ProductPrice}</td>
                                <td className="px-4 py-2 border-b hidden md:table-cell text-gray-600">{item.ProductCategory}</td>
                                <td className="px-4 py-2 border-b">
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
                                        className="w-16 border border-gray-300 rounded-md p-1 text-center"
                                    />
                                </td>
                                <td className="px-4 py-2 border-b text-gray-600">
                                &#8377; {item.ProductPrice * item.quantity}
                                </td>
                                <td className="px-4 py-2 border-b text-center">
                                    <button
                                        onClick={() => handleRemoveItem(item)}
                                        className="text-red-500 hover:text-red-700 font-medium"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-6 flex justify-around items-center">
                    <div className="text-lg font-semibold text-gray-800">Total: INR {totalPrice}</div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                    onClick={handlePayNow}
                    >
                        Pay Now
                    </button>
                </div>
            </>
        ) : (
            <div className="text-center text-red-500 mt-10">No Product Here</div>
        )}
    </div>
</div>

    )
}

export default Cart