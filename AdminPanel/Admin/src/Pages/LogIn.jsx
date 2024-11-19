import React from 'react'
import { Button, Label, TextInput } from 'flowbite-react'
import { Link } from 'react-router-dom'
function LogIn() {
  return (
    <>
     <div className=' w-screen flex items-center justify-center min-h-[90vh] bg-gray-100 '>
        <form className=' rounded-lg shadow-xl bg-white w-96 p-3   flex flex-col gap-2 '>
          <div className='text-center text-xl '>LOG IN</div>
          <div>
            <Label value='Email' />
            <TextInput type='email'  />
          </div>
          <div>
            <Label value='Password' />
            <TextInput type='password' />
          </div>
          <div>
            <Button className='w-full mt-2' gradientDuoTone='purpleToBlue'>LOG IN</Button>
          </div>
          <div className=''>
            <span>Don't have an account? </span> <span className='text-blue-800 hover:text-blue-500'><Link to='/'> sign In </Link></span>
          </div>
        </form>
      </div>
    </>
  )
}

export default LogIn