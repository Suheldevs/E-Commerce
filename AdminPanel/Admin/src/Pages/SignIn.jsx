import React from 'react'
import { Button, Label, TextInput } from 'flowbite-react'
import { Link } from 'react-router-dom'
function SignIn() {
  return (
    <>
      <div className=' w-screen flex items-center justify-center min-h-[90vh] bg-slate-100 '>
        <form className=' rounded-lg shadow-xl bg-white w-96 p-3 flex flex-col gap-3 '>
          <div className='text-center text-2xl  '>SIGN IN</div>
          <div className=''>
            <Label value='Name'></Label>
            <TextInput type='text' />
          </div>
          <div>
            <Label value='Email' />
            <TextInput type='email' />
          </div>
          <div>
            <Label value='Password' />
            <TextInput type='password' />
          </div>
          <div>
            <Button className='w-full mt-2' gradientDuoTone='purpleToBlue'>SIGN IN</Button>
          </div>
          <div className=''>
            <span>Have an account? </span> <span className='text-blue-800 hover:text-blue-500'><Link to='/login'> Log In </Link></span>
          </div>
        </form>
      </div>
    </>
  )
}

export default SignIn