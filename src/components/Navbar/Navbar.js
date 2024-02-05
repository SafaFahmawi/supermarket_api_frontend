import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import "./Navbar.css";
import logo from '../../assets/logo.png';
import ClockComponent from "../Sidebar/clock";
import { SidebarData, getPageTitle } from '../Sidebar/SidebarData';
import Logout from '../logout';

function Navbar() {
  const location = useLocation();
  const showNavbar = ['/', '/Login', '/Home', '/Signup', '/Contact', '/ResetPassword'];

  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('user');
    if (storedUsername) {
      try {
        const parsedUsername = JSON.parse(storedUsername);
        const capitalizedUsername = parsedUsername.username.charAt(0).toUpperCase() + parsedUsername.username.slice(1);
        setUsername(capitalizedUsername);
      } catch (error) {
        console.error('Error parsing stored username:', error);
        // Handle the error (e.g., clear localStorage, display a message)
      }
    }
  }, []);

  if (!showNavbar.includes(location.pathname)) {
    return null;
  }

  return (
    <div className="navbar">
      <div className="leftSide">
        <img src={logo} alt="Logo" style={{ width: '40px', marginRight: '10px', height: '45px' }} />
        <h1>Supermarket </h1>
      </div>
      <div className="rightSide">
        <Link to="/Home" className="nav-link">
          <HomeIcon className="nav-icon" /> Home
        </Link>
        {username ? (
          <Link to="/dataset" className="nav-link">
            <AccountCircleIcon className="nav-icon" /> {username}
          </Link>
        ) : (
          <Link to="/Login" className="nav-link">
            <AccountCircleIcon className="nav-icon" /> Login
          </Link>
        )}
        <ScrollLink to="secondSection" smooth={true} duration={500} className="nav-link">
          <InfoIcon className="nav-icon" /> About
        </ScrollLink>
        <Link to="/Contact" className="nav-link">
          <MailOutlineIcon className="nav-icon" /> Contact
        </Link>
        <Logout setUsername={setUsername}/>
      </div>
    </div>
  );
}

function Navbar2() {
  const location = useLocation();
  const showNavbar = ['/dataset', '/products', '/Orders'];

  if (!showNavbar.includes(location.pathname)) {
    return null;
  }

  return (
    <div className="navbar2">
      <h2 className='h2'>{getPageTitle(location.pathname, SidebarData)}</h2>
      <ClockComponent />
    </div>
  );
}

export { Navbar, Navbar2 };