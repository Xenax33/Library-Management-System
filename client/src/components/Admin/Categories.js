import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Outlet, useNavigate } from "react-router-dom";

function Categories() {
  const [categories, setCategories] = useState(null);
  const navigate = useNavigate();
  const [searchTitle, setSearchTitle] = useState("");

  const getData = async () => {
    try {
      const response = await axios.get("/api/Category/");
      setCategories(response.data.data);
    } catch (err) {
      alert("There was an error fetching the data");
      navigate("/dashboard");
    }
  };

  const handleDelete = async (category) => {
    try
    {
        const response = await axios.delete("/api/Category/delete/" + category._id);
        if(response.data.success)
        {
            alert("Data deleted successfully")
            getData()
        }
    }
    catch(err)
    {
        alert("There was an error in deleting the data")
    }
  };

  const onSearchChange = (e) => {
    setSearchTitle(e.target.value);
  };

  useEffect(() => {
    getData();
  }, []);

  const filteredCategories =
    categories &&
    Array.isArray(categories) &&
    categories.filter((category) =>
      category?.Name?.toLowerCase().includes(searchTitle.toLowerCase())
    );

  return (
    <div className="text-center">
      <h1 className="my-3" style={{ fontWeight: "bold" }}>
        CATEGORIES
      </h1>

      <div className="my-5 d-flex justify-content-between">
        <div>
          <div className="mb-2 Search-box">
            <div className="flex">
              <i className="bx bx-search icon"></i>
              <input
                type="text"
                className="input"
                placeholder="Search Category..."
                onChange={onSearchChange}
                autoComplete="new-password"
              />
            </div>
          </div>
        </div>

        <Link to={"/dashboard"}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              className="button2"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              //   onClick={AddBook}
            >
              Add Category
            </button>
          </div>
        </Link>
      </div>

      <div className="d-flex">
        <div className="container mt-5 px-2">
          <div className="table-responsive">
            <table className="table table-responsive" id="Table">
              <thead>
                <tr className="bg text">
                  <th className="text-center" scope="col">
                    Name
                  </th>
                  <th scope="col"> </th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories &&
                  Array.isArray(filteredCategories) &&
                  filteredCategories.map((category) => (
                    <tr className="text" key={category._id}>
                      <td className="text-center align-items-center ">
                        {category.Name}
                      </td>
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
                            <button onClick={() => handleDelete(category)}>
                              Delete
                            </button>
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
    </div>
  );
}

export default Categories;
