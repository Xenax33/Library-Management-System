import React, { useState} from "react";
import AdminMenuLinks from "./AdminMenuLinks";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';
import "./SideBar.css";
import 'boxicons/css/boxicons.min.css';

function SideBar() {
  const [Loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
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
    await setLoading(true);
    navigate("/");
    await setLoading(false);
  };
  return (
    <body className={`${isDarkMode ? "dark" : ""}`}>
      <div className="">
        <div className="">
          <nav className={`sidebar ${isSidebarOpen ? "" : "close"}`}>
            <header>
              <div className="image-text">
                <span className="image">
                  <img src='images.jpg' alt="" />
                </span>

                {user.Role === "admin" ? (
                  <div className="text logo-text">
                    <br></br>
                    <span className="name">
                      <h4>Admin</h4>
                    </span>
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
                <AdminMenuLinks />
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
                    {isSidebarOpen && !isDarkMode && (
                      <Icon
                        icon="line-md:moon-rising-twotone-alt-loop"
                        color="white"
                        width="24"
                        height="24"
                        style={{
                          color: "#FFFFF",
                          marginTop: "14px",
                          marginLeft: "8px",
                        }}
                      />
                    )}
                    {isSidebarOpen && isDarkMode && (
                      <Icon
                        icon="line-md:sunny-outline-loop"
                        color="white"
                        width="24"
                        height="24"
                        style={{ marginTop: "14px", marginLeft: "8px" }}
                      />
                    )}
                  </div>
                  <span className="mode-text text">
                    {isDarkMode ? "Light mode" : "Dark mode"}
                  </span>

                  <div className="toggle-switch">
                    <span className="switch" onClick={toggleDarkMode}></span>
                  </div>
                </li>
              </div>
            </div>
          </nav>
        </div>
        <div className="col-sm-12">
          <div
            className="container text"
            style={{
              marginLeft: isSidebarOpen
                ? SIDEBAR_OPEN_WIDTH
                : SIDEBAR_CLOSE_WIDTH,
              transition: "margin 0.3s ease",
            }}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </body>
  );
}

export default SideBar;
