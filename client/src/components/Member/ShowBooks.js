import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import "./ShowBooks.css";
import { Link, useNavigate } from "react-router-dom";

function ShowBooks({ User }) {
  const [Books, setBooks] = useState(null);
  const [rentBook, setRentBook] = useState({
    UserId: "",
    BookId: "",
  });
  let filteredBooks = Books;
  const navigate = useNavigate();
  const [searchTitle, setsearchTitle] = useState("");

  const onSearchChange = (e) => {
    setsearchTitle(e.target.value);
  };

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
      console.error("Error fetching data:", error);
      alert("Error occured while reading data");
      navigate("/member");
    }
  };

  useEffect(() => {
    getData();
    rentBook.UserId = User._id;
  }, []);

  const buyBook = async (book) => {
    if (book.IsAvailable) {
      try {
        rentBook.BookId = book._id;
        if (rentBook.BookId !== "") {
          const response = await axios.post("/api/RentBook/create", rentBook);
          if (response.data.success) {
            const Response = await axios.put(
              "/api/Books/changeavailability/" + book._id
            );
            if (Response.data.success) {
              alert("You have purchased the book successfully.");
              getData();
              filteredBooks = filteredBooks.filter(
                (book) => book._id !== rentBook.BookId
              );
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
    } else {
    }
  };

  return (
    <div id="ShowBooks">
      <div>
        <NavBar Active={"Search Book"} />
      </div>
      <h1 style={{ textAlign: "center" }}>Books</h1>
      <div className="my-3 mb-2 Search-box" style={{display: "block"}}>
        <div className="d-flex">
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
      <div className="row">
        {filteredBooks &&
          Array.isArray(filteredBooks) &&
          filteredBooks.map((book) => (
            <div className="col-lg-3">
              <div
                id="container"
                style={{
                  background: ` url(${book.Image})`
                }}
              >
                <div className="overlay">
                  <div className="items"></div>
                  <div className="items head">
                    <h1>{book.Title}</h1>
                    <div className="d-flex">
                      <p style={{ marginRight: "2%" }}>by </p>
                      <p style={{ fontStyle: "italic" }}>{" " + book.Author}</p>
                    </div>
                    <hr />
                  </div>
                  <div className="items price">
                    <p className="new">{"Rs " + book.RentPrice}</p>
                    <p className="new my-3" style={{ fontWeight: "normal" }}>
                      {book.CategoryId}
                    </p>
                    <p className="new my-3" style={{ fontWeight: "normal" }}>
                      {"Language: " + book.Language}
                    </p>
                  </div>
                  <div className="items cart">
                    <i className="fa fa-shopping-cart"></i>
                    <span onClick={() => buyBook(book)}>
                      {book.IsAvailable ? "Rent Out" : "Apply for Reservation"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ShowBooks;
