import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import "./ShowBooks.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function ReservedBooks({ User }) {
  const [rentBook, setRentBook] = useState({
    UserId: "",
    BookId: "",
  });
  const navigate = useNavigate();
  const [reservedBooks, setReservedBooks] = useState(null);
  const [books, setBooks] = useState(null);
  const [gotBooks, setGotBooks] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/Reserved/getlist/" + User._id);
      setReservedBooks(response.data.data);
    } catch (error) {
      console.error("Error fetching reserved books:", error);
    }
  };
  useEffect(() => {
    if (User._id === "") {
      alert("Session expired. Please login again");
      navigate("/");
    }

    fetchData();
    rentBook.UserId = User._id;
  }, []);

  const getBooks = async () => {
    try {
      const bookPromises = reservedBooks.map(async (book) => {
        const response = await axios.get("/api/Books/getbook/" + book.BookId);
        return response.data.data;
      });

      const booksData = await Promise.all(bookPromises);
      setBooks(booksData);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const RentBook = async (book) => {
    console.log(book);
    rentBook.BookId = book._id;
    if (book.IsAvailable) {
      try {
        if (rentBook.BookId !== "") {
          const Response = await axios.put(
            "/api/Reserved/rented/" + rentBook.UserId + "/" + rentBook.BookId
          );
          if (Response.data.success) {
            const response = await axios.post("/api/RentBook/create", rentBook);
            if (response.data.success) {
              const Response = await axios.put(
                "/api/Books/changeavailability/" + book._id
              );
              if (Response.data.success) {
                alert("You have purchased the book successfully.");
                fetchData();
              }
            } else {
              alert(
                "There was some error in the transaction. Please try again"
              );
              navigate("/member");
            }
          } else {
            alert("There was some error in the transaction. Please try again");
            navigate("/member");
          }
        }
      } catch (err) {
        alert("There was some error in the transaction. Please try again");
        navigate("/member");
      }
    }
  };

  useEffect(() => {
    getBooks();
  }, [reservedBooks]);

  useEffect(() => {
    setGotBooks(true);
  }, [books]);

  return (
    <div id="ShowBooks">
      <div>
        <NavBar Active={"Reserved"} />
      </div>
      <h1 className="text-center" style={{ fontWeight: "bolder" }}>
        Available Books
      </h1>
      <div className="row">
        {gotBooks &&
          Array.isArray(books) &&
          books.map((bookArray) => (
            <div className="col-lg-3" key={bookArray._id}>
              {Array.isArray(bookArray) &&
                bookArray.map((book) =>
                  book.IsAvailable ? ( // Check if book is available
                    <div
                      id="container"
                      key={book._id}
                      style={{
                        background: ` url(${book.Image})`,
                      }}
                    >
                      <div className="overlay">
                        <div className="items"></div>
                        <div className="items head">
                          <h1>{book.Title}</h1>
                          <div className="d-flex">
                            <p style={{ marginRight: "2%" }}>by </p>
                            <p style={{ fontStyle: "italic" }}>
                              {" " + book.Author}
                            </p>
                          </div>
                          <hr />
                        </div>
                        <div className="items price">
                          <p className="new">{"Rs " + book.RentPrice}</p>
                          <p
                            className="new my-3"
                            style={{ fontWeight: "normal" }}
                          >
                            {book.CategoryId}
                          </p>
                          <p
                            className="new my-3"
                            style={{ fontWeight: "normal" }}
                          >
                            {"Language: " + book.Language}
                          </p>
                        </div>
                        <div className="items cart">
                          <i className="fa fa-shopping-cart"></i>
                          <span onClick={() => RentBook(book)}>Rent Out</span>
                        </div>
                      </div>
                    </div>
                  ) : null
                )}
            </div>
          ))}
      </div>
      <h1 className="text-center my-3" style={{ fontWeight: "bolder" }}>
        Reserved Books
      </h1>
      <div className="row">
        {gotBooks &&
          Array.isArray(books) &&
          books.map((bookArray) => (
            <div className="col-lg-3" key={bookArray._id}>
              {Array.isArray(bookArray) &&
                bookArray.map((book) =>
                  !book.IsAvailable ? ( // Check if book is available
                    <div
                      id="container"
                      key={book._id}
                      style={{
                        background: ` url(${book.Image})`,
                      }}
                    >
                      <div className="overlay">
                        <div className="items"></div>
                        <div className="items head">
                          <h1>{book.Title}</h1>
                          <div className="d-flex">
                            <p style={{ marginRight: "2%" }}>by </p>
                            <p style={{ fontStyle: "italic" }}>
                              {" " + book.Author}
                            </p>
                          </div>
                          <hr />
                        </div>
                        <div className="items price">
                          <p className="new">{"Rs " + book.RentPrice}</p>
                          <p
                            className="new my-3"
                            style={{ fontWeight: "normal" }}
                          >
                            {book.CategoryId}
                          </p>
                          <p
                            className="new my-3"
                            style={{ fontWeight: "normal" }}
                          >
                            {"Language: " + book.Language}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null
                )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default ReservedBooks;
