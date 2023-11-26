import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import "./ShowBooks.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ReservedBooks from "./ReservedBooks";

function ReturnBook({ User }) {
  const navigate = useNavigate();
  const [rentedBooks, setRentedBooks] = useState(null);
  const [Books, setBooks] = useState(null);

  const getRentedBooks = async () => {
    try {
      const response = await axios.get("/api/RentBook/getlist/" + User._id);
      if (response.data.success) {
        setRentedBooks(response.data.data);
      } else {
        alert("There was some error in fetching the data");
        navigate("/");
      }
    } catch (err) {
      alert("There was some error in fetching the data");
      navigate("/");
    }
  };

  const getBooks = async () => {
    try {
      const bookPromises = rentedBooks.map(async (book) => {
        const response = await axios.get("/api/Books/getbook/" + book.BookId);
        return response.data.data;
      });

      const booksData = await Promise.all(bookPromises);
      setBooks(booksData);
    } catch (error) {
      alert("There was some error in fetching the data");
      navigate("/");
    }
  };

  useEffect(() => {
    if (rentedBooks !== null) {
      getBooks();
    }
  }, [rentedBooks]);

  useEffect(() => {
    if (User._id === "") {
      alert("Session expired. Please login again");
      navigate("/");
    }
    getRentedBooks();
  }, []);

  function calculateDaysDifference(dateString) {
    const today = new Date();
    const providedDate = new Date(dateString);

    // Calculate the time difference in milliseconds
    const timeDifference = today - providedDate;

    // Calculate the number of days
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return days;
  }

  const returnBook = async (book) => {
    rentedBooks.map(async (books) => {
      if (books.BookId === book._id) {
        let days = calculateDaysDifference(books.RentedAt);
        try {
          if (days > 30) {
            //LATE SUBMISSION
            const extraDays = days - 30;
            const fine = book.Fine * extraDays;
            let Charged = book.RentPrice + fine;
            console.log(Charged);
            const response = await axios.put(
              "/api/RentBook/lateSubmitted/" +
                books.UserId +
                "/" +
                books.BookId,
              { Charged }
            );
            if (response.data.success) {
              const Response = await axios.put(
                "/api/Books/returningBook/" + books.BookId,
                { Charged }
              );
              if (Response.data.success) {
                alert("Book returned successfully");
                getRentedBooks();
              } else {
                alert("There was some error with the transaction");
                navigate("/member");
              }
            } else {
              alert("There was some error with the transaction");
              navigate("/member");
            }
          } else {
            //DID NOT SUBMIT LATE
            const response = await axios.put(
              `/api/RentBook/returnBook/${books.UserId}/${books.BookId}`,
              { Charged: book.RentPrice }
            );            
            if (response.data.success) {
              const Response = await axios.put(
                "/api/Books/returningBook/" + books.BookId,
                { Charged: book.RentPrice }
              );
              if (Response.data.success) {
                alert("Book returned successfully");
                getRentedBooks();
              } else {
                alert("There was some error with the transactiona");
                navigate("/member");
              }
            } else {
              console.log(response.data)
              alert("There was some error with the transactionb");
              navigate("/member");
            }
          }
        } catch (err) {
          alert("There was some error with the transaction");
          navigate("/");
        }
      }
    });
  };

  return (
    <div id="ShowBooks">
      <div>
        <NavBar Active={"Return"} />
      </div>
      <div className="row">
        {Books &&
          Array.isArray(Books) &&
          Books.map((bookArray) => (
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
                        <div className="items cart">
                          <i className="fa fa-shopping-cart"></i>
                          <span onClick={() => returnBook(book)}>Return</span>
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

export default ReturnBook;
