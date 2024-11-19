import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import SignIn from './Pages/SignIn';
import LognIn from './Pages/LogIn';
import Header from './Components/Header';
function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<SignIn/>}/>
      <Route path='/login' element={<LognIn/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App