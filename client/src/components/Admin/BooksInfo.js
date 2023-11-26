import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";

function BooksInfo() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [ReservedUsers, setReservedUsers] = useState(null);
  const [Reservedusers, setReservedusers] = useState([]);
  const [UsersPresent, setUsersPresent] = useState(false);
  const { book } = location.state || {};

  const getUserId = async () => {
    const response = await axios.get("/api/RentBook/rentedCheck/" + book._id);
    if (response.data.success) {
      setUserId(response.data.data);
    }
  };

  const getUser = async () => {
    if (userId !== null) {
      const response = await axios.get("/api/User/get/" + userId[0].UserId);
      if (response.data.success) {
        setUser(response.data.data);
      }
    }
  };

  const getReservedUsers = async () => {
    const response = await axios.get("/api/Reserved/getUsers/" + book._id);
    if (response.data.success) {
      setReservedUsers(response.data.data);
    }
  };

  const getReservedUsersFromId = async () => {
    if (ReservedUsers !== null) {
      const usersData = await Promise.all(
        ReservedUsers.map(async (user) => {
          const response = await axios.get("/api/User/get/" + user.UserId);
          if (response.data.success) {
            return response.data.data; // Return the user data
          }
          return null; // Return null if API call is unsuccessful
        })
      );

      // Filter out null values (unsuccessful API calls)
      const filteredUsersData = usersData.filter((user) => user !== null);

      // Update the state with the new data
      setReservedusers(filteredUsersData);
    }
  };

  useEffect(() => {
    getUserId();
    getReservedUsers();
  }, []);

  useEffect(() => {
    getUser();
  }, [userId]);

  useEffect(() => {
    getReservedUsersFromId();
  }, [ReservedUsers]);

  useEffect(() => {
    if (Reservedusers.length > 0) {
      setUsersPresent(true);
    }
  }, [Reservedusers]);

  const getDate = (date) => {
    const dateObject = new Date(date); // Replace this with the Date object you retrieved from the database
    const dateOnly = dateObject.toISOString().split("T")[0];
    return dateOnly;
  };

  return (
    <div style={{ fontWeight: "bold" }}>
      <h1
        className="text-center"
        style={{ fontWeight: "bolder", paddingTop: "2%" }}
      >
        BOOK INFORMATION
      </h1>
      <div className="row text-center my-3">
        <div className="col-md-6">Title: {book.Title}</div>
        <div className="col-md-6">Author: {book.Author}</div>
      </div>
      <div className="row text-center my-3">
        <div className="col-md-6">Rent Price: {book.RentPrice}</div>
        <div className="col-md-6">Fine Per Day: {book.Fine}</div>
      </div>
      <div className="row text-center my-3">
        <div className="col-md-6">Total Earning: {book.TotalEarning}</div>
        <div className="col-md-6">Language: {book.Language}</div>
      </div>
      <div className="row text-center my-3">
        <div className="col-md-6">Category: {book.CategoryId}</div>
        <div className="col-md-6">ISBN Number: {book.ISBN}</div>
      </div>

      {user ? (
        <div>
          <h1 className="text-center my-3" style={{ fontWeight: "bolder" }}>
            CURRENTLY RENTED TO
          </h1>
          <div className="square-image-box">
            <img
              src={user.Image}
              alt="Book Cover"
              className="square-image"
              style={{ borderRadius: "50%" }}
            />
          </div>
          <div className="row text-center my-3">
            <div className="col-md-6">Name: {user.Name || "N/A"}</div>
            <div className="col-md-6">Email: {user.Email || "N/A"}</div>
          </div>
          <div className="row text-center my-3">
            <div className="col-md-6">CNIC Number: {user.CNIC || "N/A"}</div>
            <div className="col-md-6">
              Phone Number: {user.PhoneNo || "N/A"}
            </div>
          </div>
        </div>
      ) : (
        <h1  className="text-center my-3">CURRENTLY RENTED TO NO ONE</h1>
      )}

      {UsersPresent ? (
        <>
          <h1 className="text-center my-3" style={{ paddingTop: "2%" }}>
            USERS WHICH HAVE RESERVED THIS BOOK
          </h1>
          <div className="d-flex" style={{ fontWeight: "normal" }}>
            <div className="container mt-5 px-2">
              <div className="table-responsive">
                <table
                  className="table table-responsive table-borderless"
                  id="Table"
                >
                  <thead>
                    <tr className="bg text">
                      <th className="text-center" scope="col">
                        Name
                      </th>
                      <th scope="col">Email</th>
                      <th scope="col">CNIC</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Joined On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Reservedusers &&
                      Array.isArray(Reservedusers) &&
                      Reservedusers.map((member) => (
                        <tr className="text" key={member._id}>
                          <td className="d-flex">
                            <img
                              className="mx-3"
                              src={member.Image}
                              width={30}
                              height={30}
                              alt="Logo"
                            />
                            {member.Name}
                          </td>
                          <td>{member.Email}</td>
                          <td>{member.CNIC}</td>
                          <td>{member.PhoneNo}</td>
                          <td>{getDate(member.CreatedAt)}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h1 className="text-center">NO USERS HAVE RESERVED THIS BOOK YET</h1>
      )}
    </div>
  );
}

export default BooksInfo;
