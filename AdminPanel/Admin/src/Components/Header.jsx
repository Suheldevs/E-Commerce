import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react'
import React from 'react'
import { IoReorderThree } from "react-icons/io5";
import { Link } from 'react-router-dom';
function Header() {
  return (
    <Navbar className=''>
    <Navbar.Brand>
        <div className=''><span className=''><Button gradientDuoTone='purpleToBlue' className='inline'>Admin</Button> Pannel</span></div>
 </Navbar.Brand>
 <div className='flex md:order-2 gap-2'>
        <Dropdown
        arrowIcon={false}
        inline
        label={
            <Avatar rounded></Avatar>
        }
        >
            <Dropdown.Item><Link to='/'>Sign In</Link></Dropdown.Item>
            <Dropdown.Item><Link to='/login'>Log In</Link></Dropdown.Item>
            
        </Dropdown>
        <Navbar.Toggle/>
        </div>  
        <Navbar.Collapse>
            <Navbar.Link as={Link} to='/'>Sign In</Navbar.Link>
            <Navbar.Link as={Link} to='/Login'>Log In</Navbar.Link>
            <Navbar.Link as={Link} to='/abouts'>Abouts</Navbar.Link>
        </Navbar.Collapse>

        </Navbar>
  )
}

export default Header