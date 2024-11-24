import React, { useState } from 'react'
import axios from 'axios';
import {Button, FileInput, Label, TextInput} from 'flowbite-react';
import Swal from 'sweetalert2';
function Logo() {
const [imagePath,setImagePath] = useState('')

  const handleSubmit = async(e)=>{
    e.preventDefault();
const formData = new FormData();
formData.append("name",e.target.name.value);
formData.append("image",imagePath);

const newFormData = Object.fromEntries(formData.entries());
console.log(newFormData);

try{
  const res = await axios.post('http://localhost:3000/logo/add',newFormData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});
Swal.fire('Changed', 'Logo has been Changed.', 'success');
}
catch(err){
  console.log(err);
  Swal.fire('Failed', 'Logo has not been Changed.', 'failure');
}

  }

const handleImageChange =(e)=>{
const file = e.target.files[0];
setImagePath(file)
}
  return (
    <div className='m-12 p-4 min-h-[60vh] shadow-xl'>
<div className='text-center text-2xl font-bold my-2'>Logo</div>
<div className='text-ceter flex flex-col justify-center items-center'>
<form onSubmit={handleSubmit} className='flex flex-col w-96  gap-4'>
  <Label value='Name Of Logo' className='text-xl'/>
  <TextInput type='text' name="name" required/>
  <Label value='Logo' className='text-xl'/>
  <FileInput name='image'onChange={handleImageChange}/>
  <Button color='dark' type='submit' outline>Change Logo</Button>
</form>
</div>
    </div>
  )
}

export default Logo