import React, { useState, useEffect } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';
import './Mode.css';

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleToggle = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode', !darkMode);
  };

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <div
      className= 'dark-mode-toggle'
      onClick={handleToggle}
    >
      {darkMode ? (
        <FiMoon size={15} className="moon-icon" />
      ) : (
        <FiSun size={15} className="sun-icon" />
      )}
    </div>
  );
};

export default DarkModeToggle;