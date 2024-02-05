import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import { Navbar, Navbar2 } from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import Products from './components/Products/Products';
import Orders from './components/Graphs/Graphs';
import Dataset from './components/Dataset/Dataset';
import SignUp from './components/SignUp/SignUp';
import Predict from './components/Predict';
import DarkModeToggle from './components/Mode/Mode';
import Contact from './components/Contact/Contact';
import ResetPassword from './components/ResetPassword/ResetPassword';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Navbar2 />
      <Routes>

        <Route path="/" element={<Home />}/>
        <Route path="/Home" element={<Home />}/>
        <Route path="/Login" element={<Login />}/>
        <Route path="/Orders" element={<Orders />}/>
        <Route path="/products" element={<Products />}/>
        <Route path="/dataset" element={<Dataset />}/>
        <Route path="/Signup" element={<SignUp />}/>
        <Route path='/logout' element={<Login />}/>
        <Route path='/Contact' element={<Contact />}/>
        <Route path='/ResetPassword' element={<ResetPassword />}/>
        {/* Define a nested route for the Predict component */}
        <Route path="/products/:itemId/*" element={<Predict />} />
      </Routes>

      <DarkModeToggle />
    </div>
  );
}

export default App;
