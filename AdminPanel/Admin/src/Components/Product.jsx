import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, Input } from '@headlessui/react'
import { Button, FileInput, Label, Select, Textarea, TextInput } from 'flowbite-react';
import Swal from 'sweetalert2';
function Product() {
  const [product, setproduct] = useState([]);
  const [images,setImages] = useState([]);
  const [category, setCategory] = useState([]);
  const [model, setModel] = useState(false);
  const [filterData,setFilterData] = useState([])
  //product data fetch
  const getData = async () => {
    try {
      const res = await axios.get('http://localhost:3000/product/get');
      setproduct(res.data.ProductData);
      setFilterData(res.data.ProductData);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  //category data fetch
  const getCategoryData = async () => {
    try {
      const res = await axios.get('http://localhost:3000/category/get');
      setCategory(res.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };


  useEffect(() => {
    getData();
    getCategoryData();
  }, [category.name]);


///handle Image change
const handleImage = (e) => {
  const selectedFiles = Array.from(e.target.files); 
  setImages({ ...images, Images: selectedFiles });
  console.log(selectedFiles); 
};


const productAdd = async (e) => {
  e.preventDefault();

  const ProductName = e.target.name.value;
  const ProductBrand = e.target.brand.value;
  const ProductPrice = e.target.price.value;
  const ProductDescription = e.target.description.value;
  const ProductCategory = e.target.category.value;

  // Check if images are selected
  if (!images || !images.Images || images.Images.length === 0) {
    Swal.fire('Error', 'Please upload at least one image.', 'error');
    return;
  }
  if (images.Images.length >=6) {
    Swal.fire('Error', 'Please upload max 5 images.', 'error');
    return;
  }

  // Create FormData to send images and other fields
  const formData = new FormData();
  formData.append("ProductName", ProductName);
  formData.append("ProductBrand", ProductBrand);
  formData.append("ProductPrice", ProductPrice);
  formData.append("ProductDescription", ProductDescription);
  formData.append("ProductCategory", ProductCategory);

  images.Images.forEach((file) => {
    formData.append("ProductImages", file);
  });

  const productExists = product.find((item) =>
    item.ProductName.toLowerCase().includes(ProductName.toLowerCase())
  );

  if (!productExists) {
    try {
      const res = await axios.post("http://localhost:3000/product/save", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res);
      Swal.fire("Success", "Product has been added successfully.", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to add the Product.", "error");
    }
  } else {
    Swal.fire("Error", "Product already exists.", "error");
  }
};

//detele

const handleDelete = async (id) => {
  // Display confirmation alert
  Swal.fire({
    title: 'Are you sure?',
    text: 'Once deleted, you will not be able to recover this product!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        // Send DELETE request to backend
        const res = await axios.delete(`http://localhost:3000/product/delete/${id}`);
        Swal.fire('Deleted!', 'product has been deleted.', 'success');
        getData();
        
     getData();
      } catch (error) {
        Swal.fire('Error!', 'There was an issue deleting the product.', 'error');
        console.error('Error deleting product:', error);
      }
    }
  });
};

//Update
const handleUpdate= (e,item)=>{

}

//searchHandle

const searchHandle = (e)=>{
const searchText = e.target.value;
const trimText = searchText.trim()
if(trimText){
const filterdata = product.filter((item)=>((item.ProductName.toLowerCase().includes(trimText.toLowerCase())) || (item.ProductCategory.toLowerCase().includes(trimText.toLowerCase()))))
setFilterData(filterdata);}
else{
  setFilterData(product);
}
}


const handlePriceRange = (event) => {
  const selectedOption = event.target.selectedOptions[0]; 
  const min = parseInt(selectedOption.getAttribute("data-min")); 
  const max = parseInt(selectedOption.getAttribute("data-max")); 
  if(max == 0){
    return setFilterData(product);
  }
  console.log(min, max);

  // Filter products based on price range
  const rangedata = product.filter((item) => {
    const price = parseInt(item.ProductPrice); // Convert price to number
    return price >= min && price <= max; // Check if within range
  });

  setFilterData(rangedata); // Update the filtered data state
};

return (
    <div className='flex  shadow-2xl rounded-xl  flex-col m-5 min-h-[80vh]'>
      <div className='text-2xl font-bold text-center py-4'> Products</div>
      <div className='flex justify-between mx-32 my-4'>
        <div className=''>
          <TextInput type='text' className='w-96' placeholder='Search Products' name='search' onChange={searchHandle} />
        </div>
        <div className=''>
          <Select onChange={handlePriceRange}>
            <option disabled selected>--Select Price Range</option>
            <option data-min='0' data-max='1000000000000'>All</option>
            <option data-min='1' data-max='1000'>1 - 1000</option>
            <option data-min='1000' data-max='2000'>1000 - 2000</option>
            <option data-min='2000' data-max='3000'>2000 - 3000</option>
            <option data-min='3000' data-max='4000'>3000 - 4000</option>
            <option data-min='4000' data-max='5000'>4000 - 5000</option>
            <option data-min='5000' data-max='6000'>5000 - 6000</option>
          </Select>
        </div>
        <div>
          <Button className='w-full mt-2' gradientDuoTone='purpleToBlue' onClick={() => setModel(true)}>Add New Product</Button>
        </div>
      </div>
      <table className="table-auto mx-24 border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Product Image</th>
            <th className="border border-gray-300 px-4 py-2">Product Name</th>
            <th className="border border-gray-300 px-4 py-2">Product Price</th>
            <th className="border border-gray-300 px-4 py-2">Product Category</th>
            <th className="border border-gray-300 px-4 py-2">Product description</th>
            <th className="border border-gray-300 px-4 py-2" colSpan={2}>Operations</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {filterData.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 flex justify-center items-center"><img src={`http://localhost:3000/uploads/products/${item.ProductImage[0]}`}  width={'70px'}/></td>
              <td className="border border-gray-300 px-4 py-2">{item.ProductName}</td>
              <td className="border border-gray-300 px-4 py-2">{item.ProductPrice}</td>
              <td className="border border-gray-300 px-4 py-2">{item.ProductCategory}</td>
              <td className="border border-gray-300 px-4 py-2">{item.ProductDescription}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="bg-blue-600 hover:bg-purple-600 text-white font-medium py-1 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                  onClick={() => handleUpdate(item)}
                >
                  Update
                </button>
               
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
               
              </td>
            </tr>
          ))
        }
        </tbody>
      </table>
          {filterData.length <= 0 &&(<div className='text-center mt-4 text-red-600 text-xl'>Products Not found Please add!</div>)}

      {/* model  start*/}
      <Dialog open={model} onClose={setModel} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
                  <form onSubmit={productAdd}>
              <div className="bg-white px-4 pb-4 pt-5 ">


                <DialogTitle as="h3" className="text-center font-semibold text-gray-900">
                  Add New Product Details
                </DialogTitle>
                <div className="mt-2">
                    <Label value='Product Name' />
                    <TextInput type='text' name='name' placeholder='Product Name..'  required/>
                    <Label value='Product Price' />
                    <TextInput type='text' name='price' placeholder='Product Price..' required />
                    <Label value='Product Brand' />
                    <TextInput type='text' name='brand' placeholder='Product Brand..' required />
                    <Label value='Product Category'/>
                  <Select name='category'>
                    <option value=''>--Select a category--</option>
                    {category.length>0?(category.map((item)=>(<option key={item._id} value={item.name}>{item.name}</option>))):(<option value="" disabled>No Category available</option>)}
                  </Select>

                    <Label value='Product description' />
                    <Textarea type='text' name='description' placeholder='Description' required />
                    <Label value='Product Image' />
                    <FileInput type='file' name='ProductImage' multiple onChange={handleImage} required/>
          
                </div>

              </div>
              <div className="bg-gray-50 px-4 py-3 flex justify-end gap-4">
                <Button className='' color='teal' outline onClick={() => setModel(false)}>Cancel</Button>
                <Button className='' gradientDuoTone='purpleToBlue' type='submit' onClick={()=>setModel(false)}>Save</Button>
              </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      {/* model  End*/}
    </div>
  );
}

export default Product;
