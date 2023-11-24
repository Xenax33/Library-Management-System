import React, { useState, useEffect } from "react";
import "./NavBar.css";
import { Link, Outlet, useNavigate } from "react-router-dom";

function NavBar( {Active}) {
  const [selectedItem, setSelectedItem] = useState(Active);
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    setSelectedItem(item);
    if(item === "Sign Out")
    {
        navigate('/')
    }
    else if(item == "Search Book")
    {
        navigate('/showbooks')
    }
    else if(item == "Home")
    {
        navigate('/member')
    }
  };
  return (
    <div>
      <ul className="topnav">
        <li>
          <div
            className={selectedItem === "Home" ? "active" : ""}
            onClick={() => handleItemClick("Home")}
            style={{transition: "none" , cursor:"pointer"}}
          >
            <img className="logoo" src="Logo.png" alt="Logo" style={{textDecoration: "none"}}/>
          </div>
        </li>
        <li>
          <a
            className={selectedItem === "Search Book" ? "active" : ""}
            onClick={() => handleItemClick("Search Book")}
          >
            Search Books
          </a>
        </li>
        <li>
          <a
            className={selectedItem === "Contact" ? "active" : ""}
            onClick={() => handleItemClick("Contact")}
          >
            Reserved
          </a>
        </li>
        <li>
          <a
            className={selectedItem === "Contact" ? "active" : ""}
            onClick={() => handleItemClick("Contact")}
          >
            Return
          </a>
        </li>
        <li className="right d-flex">
          <a
            className={selectedItem === "Profile" ? "active" : ""}
            onClick={() => handleItemClick("Profile")}
          >
            Profile
          </a>
          <a
            className={selectedItem === "Sign Out" ? "active mx-3" : "mx-3"} 
            onClick={() => handleItemClick("Sign Out")}
          >
            Sign Out
          </a>
        </li>
      </ul>
      <div>
      </div>
    </div>
  );
}

export default NavBar;
