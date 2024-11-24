import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, Input } from '@headlessui/react'
import { Button, Label, TextInput } from 'flowbite-react';
import Swal from 'sweetalert2';
function Category() {
  const [category, setCategory] = useState([]);
  const [model, setModel] = useState(false)

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

const categoryAdd = async(e)=>{
  e.preventDefault();
 const newCategory ={name:e.target.name.value};
try{
  const res = await axios.post('http://localhost:3000/category/add',newCategory);
  getData();
}
catch(err){
  console.log(err)
}

}

//detele

const handleDelete = async (id) => {
  // Display confirmation alert
  Swal.fire({
    title: 'Are you sure?',
    text: 'Once deleted, you will not be able to recover this category!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        // Send DELETE request to backend
        const res = await axios.delete(`http://localhost:3000/category/delete/${id}`);
        Swal.fire('Deleted!', 'Category has been deleted.', 'success');
        
     getData();
      } catch (error) {
        Swal.fire('Error!', 'There was an issue deleting the category.', 'error');
        console.error('Error deleting category:', error);
      }
    }
  });
};


return (
    <div className='flex  shadow-2xl rounded-xl  flex-col m-5 min-h-[80vh]'>
      <div className='text-2xl font-bold text-center py-4'> Products Categories</div>
      <div className='flex justify-between mx-32 my-4'>
        <div className=''>
          <TextInput type='text' className='w-96' placeholder='Search Category' />
        </div>
        <div>
          <Button className='w-full mt-2' gradientDuoTone='purpleToBlue' onClick={() => setModel(true)}>Add More Categories</Button>
        </div>
      </div>
      <table className="table-auto mx-24 border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Category Name</th>
            <th className="border border-gray-300 px-4 py-2">Operations</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {category.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{item.name}</td>
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
          {category.length <= 0 &&(<div className='text-center mt-4 text-red-600 text-xl'>Not any Category!</div>)}

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
                  <form onSubmit={categoryAdd}>
              <div className="bg-white px-4 pb-4 pt-5 ">


                <DialogTitle as="h3" className="text-center font-semibold text-gray-900">
                  Add Category
                </DialogTitle>
                <div className="mt-2">
                    <Label value='Category Name' />
                    <TextInput type='text' name='name' placeholder='Type Here..' />
          
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

export default Category;
