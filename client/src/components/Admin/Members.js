import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Outlet, useNavigate } from "react-router-dom";

function Members() {
  const [Members, setMembers] = useState([]);
  const navigate = useNavigate();
  let filteredUsers = Members; // Initialize filteredBooks with Books initially
  const [searchTitle, setsearchTitle] = useState("");


  // ...

  if (Members) {
    filteredUsers = Members.filter((member) => {
      return member.Email.toLowerCase().includes(searchTitle.toLowerCase());
    });
  }

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

  const handleDelete = async (member) =>
  {
    if(window.confirm("Are you sure you want to delete?"))
    {
      try
      {
        console.log(member._id)
        const response = await axios.put("/api/User/delete/" + member._id);
        if(response.data.success)
        {
          alert("Member successfully deleted")
          getData()
        }
        else
        {
          alert("There was an error deleting the member");
        }
      }
      catch(err)
      {
        alert("There was an error deleting the member");
      }
    }
  }

  const handleInfo = (member) =>
  {
    navigate("/dashboard/membersinfo", { state: { member } });
  }

  useEffect(() => {
    getData();
  }, []);

  const onSearchChange = (e) => {
    setsearchTitle(e.target.value);
  };

  const getDate = (date) => {
    const dateObject = new Date(date); // Replace this with the Date object you retrieved from the database
    const dateOnly = dateObject.toISOString().split("T")[0];
    return dateOnly;
  };

  return (
    <>
      <div className="text-center ">
        <h1 style={{fontWeight: "bolder" , paddingTop: "2%"}} >MEMBERS</h1>
      </div>
      <div className="my-5 d-flex justify-content-between">
        <div>
          <div className="mb-2 Search-box">
            <div className="flex">
              <i className="bx bx-search icon"></i>
              <input
                type="text"
                placeholder="Search Email..."
                onChange={onSearchChange}
                autoComplete="new-password"
              />
            </div>
          </div>
        </div>

        <div className="px-2">
          <h5>Filters</h5>
        </div>
      </div>

      <div className="d-flex" style={{fontSize: "14pt"}}>
        <div className="container mt-5 px-2">
          <div className="table-responsive">
            <table className="table table-responsive table-borderless" id="Table">
              <thead>
                <tr className="bg text">
                  <th className="text-center" scope="col">
                    Name
                  </th>
                  <th scope="col">Email</th>
                  <th scope="col">CNIC</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Joined On</th>
                  <th scope="col"> </th>
                </tr>
              </thead>
              <tbody >
                {filteredUsers &&
                  Array.isArray(filteredUsers) &&
                  filteredUsers.map((member) => (
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
                      <td>
                        <div class="dropdown">
                          <button class="dropbtn">
                            {" "}
                            <i>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                              >
                                <g style={{ fill: "var(--toggle-color)" }}>
                                  <circle cx="10" cy="15" r="2" />
                                  <circle cx="10" cy="10" r="2" />
                                  <circle cx="10" cy="5" r="2" />
                                </g>
                              </svg>
                            </i>
                          </button>
                          <div class="dropdown-content">
                            <button onClick={()=> handleInfo(member)}>Info</button>
                            <button onClick={() => handleDelete(member)}>Delete</button>
                          </div>
                        </div>
                      </td>
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
