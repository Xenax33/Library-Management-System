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
  const [filteredBooks, setFilteredBooks] = useState(null);
  const navigate = useNavigate();
  const [searchTitle, setsearchTitle] = useState("");
  const [Categories, setCategories] = useState(null);

  const onSearchChange = (e) => {
    setsearchTitle(e.target.value);
  };

  const filterBooksBySearch = () => {
    if (Books) {
      const booksInCategory = Books.filter((book) => {
        return book.Title.toLowerCase().includes(searchTitle.toLowerCase());
      });
      setFilteredBooks(booksInCategory);
    }
  };

  useEffect(() => {
    filterBooksBySearch();
  }, [searchTitle, Books]);

  const getData = async () => {
    try {
      const response = await axios.get("/api/Books/getBooks");
      setBooks(response.data.data);
      setFilteredBooks(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error occured while reading data");
      navigate("/member");
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios.get("/api/Category/");
      setCategories(response.data.data);
    } catch (err) {
      alert("There was an error fetching the data");
      navigate("/member");
    }
  };

  useEffect(() => {
    if (User._id === "") {
      alert("Session expired. Please login again");
      navigate("/");
    }
    getData();
    getCategories();
    rentBook.UserId = User._id;
  }, []);

  const buyBook = async (book) => {
    try {
      // IF BOOK IS AVAILABLE
      rentBook.BookId = book._id;
      if (book.IsAvailable) {
        try {
          if (rentBook.BookId !== "") {
            const response = await axios.post("/api/RentBook/create", rentBook);
            if (response.data.success) {
              const Response = await axios.put(
                "/api/Books/changeavailability/" + book._id
              );
              if (Response.data.success) {
                alert("You have purchased the book successfully.");
                getData();
              }
            } else {
              alert(
                "There was some error in the transaction. Please try again"
              );
              navigate("/member");
            }
          }
        } catch (err) {
          alert("There was some error in the transaction. Please try again");
          navigate("/member");
        }
      }
      //FOR RESERVING A BOOK FOR FUTURE RENTING
      else {
        const Check = await axios.get(
          "/api/RentBook/returnCheck/" + rentBook.UserId + "/" + rentBook.BookId
        );
        if (Check.data.success) {
          const response = await axios.get(
            "/api/Reserved/checkUser/" + rentBook.UserId + "/" + rentBook.BookId
          );
          if (response.data.success) {
            const Response = await axios.post("/api/Reserved/create", rentBook);
            if (Response.data.success) {
              alert("You have reserved this book");
            } else {
              alert(
                "There was an error with the transaction. Please try again"
              );
              navigate("/member");
            }
          } else {
            alert("You have already reserved this book.");
          }
        } else {
          alert("You have already rented this book.");
        }
      }
    } catch (err) {
      alert("There was some error with the transaction");
    }
  };

  const ShowAllBooks = async () => {
    setFilteredBooks(Books);
  };

  const ShowSpecificCategory = async (Name) => {
    const booksInCategory = Books.filter((book) => {
      return book.CategoryId.toLowerCase().includes(Name.toLowerCase());
    });
    setFilteredBooks(booksInCategory);
  };

  return (
    <div id="ShowBooks">
      <div>
        <NavBar Active={"Search Book"} />
      </div>
      <h1 style={{ textAlign: "center" }}>Books</h1>
      <div className="my-3 mb-2 Search-box" style={{ display: "block" }}>
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
      <div
        className="justify-content-center my-3"
        style={{
          overflowX: "scroll",
          whiteSpace: "nowrap",
          flexWrap: "wrap",
          scrollBehavior: "smooth",
          scrollbarColor: "#FFBB5C",
          padding: "10px", // Adjust this value as needed
        }}
      >
        <button className="button5 mx-3" onClick={ShowAllBooks}>
          All
        </button>
        {Categories &&
          Array.isArray(Categories) &&
          Categories.map((category) => (
            <button
              key={category._id}
              className="button5 mx-3"
              onClick={() => ShowSpecificCategory(category.Name)}
            >
              {category.Name}
            </button>
          ))}
      </div>

      <div className="row">
        {filteredBooks &&
          Array.isArray(filteredBooks) &&
          filteredBooks.map((book) => (
            <div className="col-lg-3">
              <div
                id="container"
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
