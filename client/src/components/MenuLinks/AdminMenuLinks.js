import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Sidebar.css";

function AdminMenuLinks() {
  return (
    <>
      <div className="menu-links">
        <li>
          <Link to= {"/dashboard/dashboard"}>
            <i className="bx bx-home-alt icon"></i>
            <span className="text nav-text">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to={"/dashboard/customers"}>
            <i className="bx bxs-user-detail icon"></i>
            <span className="text nav-text">Customers</span>
          </Link>
        </li>

        <li>
          <Link to={"/dashboard/products"}>
            <i className="bx bxs-store-alt icon"></i>
            <span className="text nav-text">Products</span>
          </Link>
        </li>

        <li>
          <a href="#">
            <i className="bx bx-pie-chart-alt icon"></i>
            <span className="text nav-text">Stats</span>
          </a>
        </li>

        <li>
          <a href="#">
            <i className="bx bx-wallet icon"></i>
            <span className="text nav-text">Money</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="bx bx-user-circle icon"></i>
            <span className="text nav-text">Profile</span>
          </a>
        </li>
      </div>
    </>
  );
}

export default AdminMenuLinks;
