import React from "react";
import { Link } from "react-router-dom";
import './SideBar.css';

function AdminMenuLinks() {
  return (
    <div className="menu-links">
      <li>
        <Link to={"/dashboard/dashboard"}>
          <i className="bx bx-home-alt icon"></i>
          <span className="text nav-text">Dashboard</span>
        </Link>
      </li>
      <li>
        <Link to={"/dashboard/members"}>
          <i className="bx bxs-user-detail icon"></i>
          <span className="text nav-text">Members</span>
        </Link>
      </li>

      <li>
        <Link to={"/dashboard/books"}>
          <i className="bx bxs-book icon"></i>
          <span className="text nav-text">Books</span>
        </Link>
      </li>
    </div>
  );
}

export default AdminMenuLinks;
