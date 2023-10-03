import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import "./Sidebar.css";
import AdminMenuLinks from "./MenuLinks/AdminMenuLinks";
import CustomerMenuLinks from "./MenuLinks/CustomerMenuLinks";
import Products from "./Admin/Products";
import { Icon } from '@iconify/react';

function Sidebar({setCartToNull}) {
  const [Loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  // State variables for managing the sidebar state and dark mode state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const SIDEBAR_OPEN_WIDTH = '250px'
  const SIDEBAR_CLOSE_WIDTH = '88px'

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Function to handle dark mode toggle
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  //function to LogOut
  const LogOut = async () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/");
      localStorage.removeItem("user");
      setCartToNull();
      setLoading(false);
    }, 1);
  };

  return (
    <>
      {Loading && <Spinner dark={isDarkMode} />}
      <body className={`${isDarkMode ? "dark" : ""}`}>
        <div className="row">
          <div className="">
            <nav className={`sidebar ${isSidebarOpen ? "" : "close"}`}>
              <header>
                <div className="image-text">
                  <span className="image">
                    <img src={user.Image} alt="" />
                  </span>

                  {user.Role === "admin" ? (
                    <div className="text logo-text">
                      <br></br>
                      <span className="name"><h4>Admin</h4></span>
                    </div>
                  ) : (
                    <div className="text logo-text">
                      <span className="name">{user.username}</span>
                      <span className="profession">{user.Role}</span>
                    </div>
                  )}
                </div>

                <i
                  className="bx bx-chevron-right toggle"
                  onClick={toggleSidebar}
                ></i>
              </header>

              <div className="menu-bar">
                <div className="menu">
                  {user.Role === "admin" ? (
                    <AdminMenuLinks />
                  ) : (
                    <CustomerMenuLinks />
                  )}
                </div>

                <div className="bottom-content">
                  <li onClick={LogOut}>
                    <a>
                      <i className="bx bx-log-out icon"></i>
                      <span className="text nav-text" onClick={LogOut}>
                        Logout
                      </span>
                    </a>
                  </li>

                  <li className="mode">
                    <div className="sun-moon text-center align-items-center justify-content-center bx">
                      {/* <i
                        className={`bx ${
                          isDarkMode ? "bx-sun" : "bx-moon"
                        } icon`}
                      ></i> */}
                      {isSidebarOpen && (!isDarkMode && <Icon icon="line-md:moon-rising-twotone-alt-loop" color="white" width="24" height="24" style={{ color : "#FFFFF",marginTop : "14px" ,  marginLeft : "8px"}}/>)}
                      {isSidebarOpen &&(isDarkMode && <Icon icon="line-md:sunny-outline-loop" color="white" width="24" height="24" style={{marginTop : "14px" , marginLeft : "8px"}} />)}
                    </div>
                    <span className="mode-text text">
                      {isDarkMode ? "Light mode" : "Dark mode"}
                    </span>

                    <div className="toggle-switch">
                      <span
                        className="switch"
                        onClick={toggleDarkMode}
                      ></span>
                    </div>
                  </li>
                </div>
              </div>
            </nav>
          </div>
          <div className="col-sm-12">
            <div className="container text" style={{marginLeft: isSidebarOpen ? SIDEBAR_OPEN_WIDTH : SIDEBAR_CLOSE_WIDTH , transition: "margin 0.3s ease"}}>
              <Outlet />
            </div>
          </div>
        </div>

      </body>
    </>
  );
}

export default Sidebar;
