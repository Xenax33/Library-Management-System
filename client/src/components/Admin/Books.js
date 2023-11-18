import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Outlet, useNavigate } from "react-router-dom";

function Books() {
  const [Books, setBooks] = useState([]);
  const navigate = useNavigate();
  const [Modal, setModal] = useState(true);
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

  const AddBook = () => {
    setModal(true);
  };

  if (Books) {
    filteredBooks = Books.filter((book) => {
      return book.Title.toLowerCase().includes(searchTitle.toLowerCase());
    });
  }

  return (
    <>
      <div className="text-center my-3">
        <h1 style={{ fontWeight: "bolder" }}>Books</h1>
      </div>
      <Link to={"/dashboard/addbook"}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            className="button2"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            onClick={AddBook}
          >
            Add Book
          </button>
        </div>
      </Link>
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
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        // aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Understood
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Books;
