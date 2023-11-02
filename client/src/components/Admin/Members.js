import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Outlet, useNavigate } from "react-router-dom";

function Members() {
  const [Members, setMembers] = useState([]);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await axios.get("/api/User/getMembers");
      setMembers(response.data.data);
    } catch (error) {
      // Handle error appropriately
      console.error("Error fetching data:", error);
      alert("Error occured while reading data");
      navigate("/dashboard");    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getDate = (date) => {
    const dateObject = new Date(date); // Replace this with the Date object you retrieved from the database
    const dateOnly = dateObject.toISOString().split("T")[0];
    return dateOnly;
  };

  return (
    <>
      <div className="text-center my-3">
        <h1 style={{fontWeight: "bolder"}} >MEMBERS</h1>
      </div>
      <div className="my-5 d-flex justify-content-between">
        <div>
          <div className="mb-2 Search-box">
            <div className="flex">
              <i className="bx bx-search icon"></i>
              <input
                type="text"
                placeholder="Search Email..."
                // onChange={onSearchChange}
                autoComplete="new-password"
              />
            </div>
          </div>
        </div>

        <div className="px-2">
          <h5>Filters</h5>
        </div>
      </div>

      <div className="d-flex">
        <div className="container mt-5 px-2">
          <div className="table-responsive">
            <table className="table table-responsive table-borderless">
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
                {Members &&
                  Array.isArray(Members) &&
                  Members.map((member) => (
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
                      <td>{member.Email}</td>{" "}
                      {/* Note the correct spelling of 'Email' */}
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
  );
}

export default Members;
