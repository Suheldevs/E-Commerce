import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, Input } from '@headlessui/react';
import { Button, FileInput, Label, TextInput } from 'flowbite-react';
import Swal from 'sweetalert2';

function Logo() {
  const [imagePath, setImagePath] = useState('');
  const [logo, setLogo] = useState([]);
  const [model, setModel] = useState(false);

 

  // Fetch the logo data
  const getLogo = async () => {
    try {
      const res = await axios.get('http://localhost:3000/logo/get');
      setLogo(res.data.logoData);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getLogo();
  }, []);
  // Handle form submission
  const handleSubmit = async (e, id) => {
    e.preventDefault();

    if (!imagePath) {
      Swal.fire('Error', 'Please upload an image', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('name', e.target.name.value);
    formData.append('image', imagePath);
 const newFormData = Object.fromEntries(formData.entries());
    try {
      const res = await axios.post(`http://localhost:3000/logo/update/${id}`, newFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Swal.fire('Success', 'Logo has been updated successfully.', 'success');
      setModel(false);
      getLogo(); // Refresh the logo data
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to update the logo.', 'error');
    }
  };

  // Handle file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImagePath(file);
  };

  return (
    <div className="m-12 p-4 min-h-[60vh] shadow-xl">
      {/* Dialog for logo update */}
      <Dialog open={model} onClose={() => setModel(false)} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel className=" relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="text-center text-2xl font-bold my-2">Update Logo</div>
              <div className="text-center flex flex-col justify-center items-center">
                <form
                  onSubmit={(e) => handleSubmit(e, logo[0]?._id)}
                  className="flex flex-col w-96 gap-4 mb-4"
                >
                  <TextInput type="text" name="name" placeholder='Name of Logo or Your Name' required />
                  <FileInput name="image" onChange={handleImageChange} required />
                  <Button color="dark" type="submit" outline >
                    Change Logo
                  </Button>
                </form>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      {/* Main content */}
      <div className="text-center my-4">
        <h2 className="text-2xl font-bold mb-4">Current Logo</h2>
        {logo.length > 0 ? (
          <div className='flex justify-center flex-col'>
            <div className='flex justify-center'>
            <img src={`http://localhost:3000/uploads/${logo[0]?.image}`} alt="Logo" className="my-4 w-52 h-52 border-4 hover:scale-110 border-black p-4 rounded-[50%]" />
            </div>
            <p>{logo[0]?.name}</p>
          </div>
        ) : (
          <p>No logo found.</p>
        )}
      </div>
        <div className='flex justify-center mt-12'> <Button onClick={() => setModel(true)} color='dark' outline>Update Logo</Button></div>
    </div>
  );
}
export default Logo;
