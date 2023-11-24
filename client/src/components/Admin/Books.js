import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Books() {
  const [Books, setBooks] = useState([]);
  const navigate = useNavigate();
  const [searchTitle, setsearchTitle] = useState("");
  let filteredBooks = Books; // Initialize filteredBooks with Books initially

  // ...

  if (Books) {
    filteredBooks = Books.filter((book) => {
      return book.Title.toLowerCase().includes(searchTitle.toLowerCase());
    });
  }

  const getData = async () => {
    try {
      const response = await axios.get("/api/Books/getBooks");
      setBooks(response.data.data);
      filteredBooks = response.data.data;
    } catch (error) {
      // Handle error appropriately
      console.error("Error fetching data:", error);
      alert("Error occured while reading data");
      navigate("/dashboard");
    }
  };

  const handleEdit = (book) =>
  {
    navigate("/dashboard/addbook", { state: { book } });
  }
  const handleInfo = (book) =>
  {
    console.log(book)
  }
  const handleDelete = async (book) =>
  {
    try
    {
      const response = await axios.put("/api/Books/changeavailability/" + book._id);
      if(response.data.success)
      {
        alert("Availability successfully changed")
        getData()
      }
      else
      {
        alert("There was an error in making the changes")
      }
    }
    catch(err)
    {
      alert("There was an error in making the changes")
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const getDate = (date) => {
    const dateObject = new Date(date); // Replace this with the Date object you retrieved from the database
    const dateOnly = dateObject.toISOString().split("T")[0];
    return dateOnly;
  };

  const onSearchChange = (e) => {
    setsearchTitle(e.target.value);
  };


  if (Books) {
    filteredBooks = Books.filter((book) => {
      return book.Title.toLowerCase().includes(searchTitle.toLowerCase());
    });
  }

  return (
    <>
      <div className="text-center my-3">
        <h1 style={{ fontWeight: "bold" }}>BOOKS</h1>
      </div>

      <div className="my-5 d-flex justify-content-between">
        <div>
          <div className="mb-2 Search-box">
            <div className="flex">
              <i className="bx bx-search icon"></i>
              <input
                type="text"
                className="input"
                placeholder="Search Book..."
                onChange={onSearchChange}
                autoComplete="new-password"
              />
            </div>
          </div>
        </div>

        <Link to={"/dashboard/addbook"}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              className="button2"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              Add Book
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
                    Title
                  </th>
                  <th scope="col">Author</th>
                  <th scope="col">ISBN</th>
                  <th scope="col">Rent Price</th>
                  <th scope="col">Fine Per Day</th>
                  <th scope="col">Is Available</th>
                  <th scope="col">Language</th>
                  <th scope="col">Category</th>
                  <th scope="col">Added On</th>
                  <th scope="col"> </th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks &&
                  Array.isArray(filteredBooks) &&
                  filteredBooks.map((book) => (
                    <tr className="text" key={book._id}>
                      <td className="d-flex align-items-center">
                        <img
                          className="mx-3"
                          src={book.Image}
                          width={30}
                          height={30}
                          alt="Logo"
                        />
                        {book.Title}
                      </td>
                      <td>{book.Author}</td>
                      <td>{book.ISBN}</td>
                      <td>{book.RentPrice}</td>
                      <td>{book.Fine}</td>
                      <td>{book.IsAvailable ? "Yes" : "No"}</td>
                      <td>{book.Language}</td>
                      <td>{book.CategoryId}</td>
                      <td>{getDate(book.CreatedAt)}</td>
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
                            <button onClick={()=> handleEdit(book)}>Edit</button>
                            <button onClick={() => handleInfo(book)}>Info</button>
                            <button onClick={() => handleDelete(book)}>Available</button>
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

export default Books;
