import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";

function UserInfo() {
  const navigate = useNavigate();
  const location = useLocation();
  const { member } = location.state || {};
  const [ReservedBooksId, setReservedBooksId] = useState(null);
  const [RentedBooksId, setRentedBooksId] = useState(null);
  const [RentedBooks, setRentedBooks] = useState(null);
  const [ReservedBooks, setReservedBooks] = useState(null);
  const [Flag, setFlag] = useState(false);

  const getRentedBooksId = async () => {
    const response = await axios.get("/api/RentBook/getuser/" + member._id);
    if (response.data.success) {
      setRentedBooksId(response.data.data);
    }
  };

  const getReservedBooksId = async () => {
    const response = await axios.get("/api/Reserved/getBooks/" + member._id);
    if (response.data.success) {
      setReservedBooksId(response.data.data);
    }
  };

  const getRentedBooks = async () => {
    if (RentedBooksId !== null) {
      const booksData = await Promise.all(
        RentedBooksId.map(async (book) => {
          const response = await axios.get("/api/Books/getbook/" + book.BookId);
          if (response.data.success) {
            return response.data.data; // Return the user data
          }
          return null; // Return null if API call is unsuccessful
        })
      );

      // Filter out null values (unsuccessful API calls)
      const filteredUsersData = booksData.filter((book) => book !== null);

      // Update the state with the new data
      setRentedBooks(filteredUsersData);
    }
  };

  const getReservedBooks = async () => {
    if (ReservedBooksId !== null) {
      const booksData = await Promise.all(
        ReservedBooksId.map(async (book) => {
          const response = await axios.get("/api/Books/getbook/" + book.BookId);
          if (response.data.success) {
            return response.data.data; // Return the user data
          }
          return null; // Return null if API call is unsuccessful
        })
      );

      // Filter out null values (unsuccessful API calls)
      const filteredUsersData = booksData.filter((book) => book !== null);

      // Update the state with the new data
      setReservedBooks(filteredUsersData);
    }
  };

  useEffect(() => {
    getRentedBooksId();
    getReservedBooksId();
  }, []);

  useEffect(() => {
    getReservedBooks();
    getRentedBooks();
  }, [RentedBooksId, ReservedBooksId]);

  useEffect(() => {
    setFlag(true);
    console.log(RentedBooks);
    console.log(ReservedBooks);
  }, [RentedBooks, ReservedBooks]);

  const getDate = (date) => {
    const dateObject = new Date(date); // Replace this with the Date object you retrieved from the database
    const dateOnly = dateObject.toISOString().split("T")[0];
    return dateOnly;
  };

  return (
    <div style={{ fontWeight: "bolder" }}>
      <h1 className="text-center" style={{ padding: "2%" }}>
        USER INFORMATION
      </h1>
      {RentedBooks ? (
        <>
          <h1 className="text-center" style={{ padding: "2%" }}>
            RENTED BOOKS
          </h1>
          <div
            className="d-flex"
            style={{ fontSize: "14pt", fontWeight: "normal" }}
          >
            <div className="container mt-5 px-2">
              <div className="table-responsive">
                <table className="table table-responsive" id="Table">
                  <thead>
                    <tr className="bg text">
                      <th scope="col">Title</th>
                      <th scope="col">Author</th>
                      <th scope="col">ISBN</th>
                      <th scope="col">Language</th>
                      <th scope="col">Category</th>
                      {/* Add other header columns here */}
                    </tr>
                  </thead>
                  <tbody>
                    {RentedBooks.map((bookArray, index) => (
                      // Assuming each bookArray is an array of books
                      <React.Fragment key={index}>
                        {Array.isArray(bookArray) &&
                          bookArray.map((book) => (
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
                              <td>{book.Language}</td>
                              <td>{book.CategoryId}</td>
                              {/* Add other columns for book properties */}
                            </tr>
                          ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h1 className="text-center" style={{ padding: "2%" }}>NO BOOKS RENTED </h1>
      )}

      {ReservedBooks ? (
        <>
          <h1 className="text-center" style={{ padding: "2%" }}>
            RESERVED BOOKS
          </h1>
          <div
            className="d-flex"
            style={{ fontSize: "14pt", fontWeight: "normal" }}
          >
            <div className="container mt-5 px-2">
              <div className="table-responsive">
                <table className="table table-responsive" id="Table">
                  <thead>
                    <tr className="bg text">
                      <th scope="col">Title</th>
                      <th scope="col">Author</th>
                      <th scope="col">ISBN</th>
                      <th scope="col">Language</th>
                      <th scope="col">Category</th>

                      {/* Add other header columns here */}
                    </tr>
                  </thead>
                  <tbody>
                    {ReservedBooks.map((bookArray, index) => (
                      // Assuming each bookArray is an array of books
                      <React.Fragment key={index}>
                        {Array.isArray(bookArray) &&
                          bookArray.map((book) => (
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
                              <td>{book.Language}</td>
                              <td>{book.CategoryId}</td>
                            </tr>
                          ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h1 className="text-center" style={{ padding: "2%" }}>NO BOOKS RESERVED </h1>
      )}
    </div>
  );
}

export default UserInfo;
