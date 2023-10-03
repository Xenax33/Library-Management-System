import React, {useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Sidebar.css";


function CustomerMenuLinks() {
  return (
    <>
      <div className="menu-links">
        <li>
          <Link to={"/dashboard/productlist"}>
            <i className="bx bxs-store-alt icon"></i>
            <span className="text nav-text">Products</span>
          </Link>
        </li>

        <li>
          <Link to = {"/dashboard/cart"}>
            <i className="bx bxs-cart icon"></i>
            <span className="text nav-text">Cart</span>
          </Link>
        </li>

        <li>
        <Link to = {"/dashboard/history"}>
            <i className="bx bx-history icon"></i>
            <span className="text nav-text">History</span>
            </Link>
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

export default CustomerMenuLinks;
