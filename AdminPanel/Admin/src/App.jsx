import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import SignIn from './Pages/SignIn';
import LognIn from './Pages/LogIn';
import Header from './Components/Header';
import Dashboard from './Pages/Dashboard';
function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<SignIn/>}/>
      <Route path='/login' element={<LognIn/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App