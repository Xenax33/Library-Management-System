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
    else if(item == "Profile")
    {
        navigate('/profile')
    }
    else if(item == "Reserved")
    {
        navigate('/reserved')
    }
    else if(item == "Return")
    {
        navigate('/returnbook')
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
            className={selectedItem === "Reserved" ? "active" : ""}
            onClick={() => handleItemClick("Reserved")}
          >
            Reserved
          </a>
        </li>
        <li>
          <a
            className={selectedItem === "Return" ? "active" : ""}
            onClick={() => handleItemClick("Return")}
          >
            Return
          </a>
        </li>
        <li className="right d-flex" style={{display:"flex"}}>
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
