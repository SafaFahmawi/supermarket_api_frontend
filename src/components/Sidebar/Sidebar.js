import React, { useState, useEffect } from "react";
import { AccountCircle } from '@mui/icons-material';
import "./Sidebar.css";
import { SidebarData } from "./SidebarData";

function Sidebar() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('user');
    if (storedUsername) {
      const parsedUsername = JSON.parse(storedUsername);
      const capitalizedUsername = parsedUsername.username.charAt(0).toUpperCase() + parsedUsername.username.slice(1);
      setUsername(capitalizedUsername);
    }
  }, []);  

  return (
    <div className="Sidebar">
      <div className="dashboard">
        <h2>Dashboard</h2>
        <AccountCircle style={{ fontSize: 60, marginRight: 10 }} />
      </div>

      <div>
        <h4>
          Welcome, {username}
        </h4>
      </div>

      <ul className="SidebarList">
        {SidebarData.map((val, key) => (
          <li
            className="row"
            id={window.location.pathname === val.link ? "active" : ""}
            key={key}
            onClick={() => {
              window.location.pathname = val.link;
            }}
          >
            <div id="icon">{val.Icon}</div>
            <div id="title">{val.title}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;