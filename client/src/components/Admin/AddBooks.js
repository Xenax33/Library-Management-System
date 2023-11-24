import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AddBooks.css";
import { Link, useNavigate, useLocation } from "react-router-dom";

function AddBooks({ setLoader }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { book } = location.state || {};
  const [Edit, setEdit] = useState(true);
  const [Book, setBook] = useState({
    Title: "",
    Author: "",
    ISBN: "",
    RentPrice: "",
    Fine: "",
    Image: "",
    Language: "",
    CategoryId: "",
  });

  const [BookAudit, setBookAudit] = useState({
    BookId: "",
    TitleBefore: "",
    TitleAfter: "",
    AuthorBefore: "",
    AuthorAfter: "",
    ISBNbefore: "",
    ISBNafter: "",
    RentPriceBefore: "",
    RentPriceAfter: "",
    FineBefore: "",
    FineAfter: "",
    ImageBefore: "",
    ImageAfter: "",
    LanguageBefore: "",
    LanguageAfter: "",
    CategoryIdBefore: "",
    CategoryIdAfter: "",
  });

  const [editBook, setEditBook] = useState({});

  const onchange = (e) => {
    if (Edit) {
      setEditBook({ ...editBook, [e.target.name]: e.target.value });
      setBookAudit((prevState) => ({
        ...prevState,
        TitleAfter: editBook.Title,
        AuthorAfter: editBook.Author,
        RentPriceAfter: editBook.RentPrice,
        ImageAfter: editBook.Image,
        FineAfter: editBook.Fine,
        CategoryIdAfter: editBook.CategoryId,
        LanguageAfter: editBook.Language,
        ISBNafter: editBook.ISBN,
      }));
    } else {
      setBook({ ...Book, [e.target.name]: e.target.value });
    }
  };

  const onCategoryChange = (e) => {
    const selectedCategory = Categories.find(
      (category) => category._id === e.target.value
    );
    if (Edit) {
      setEditBook({
        ...editBook,
        [e.target.name]: selectedCategory ? selectedCategory.Name : "",
      });
      BookAudit.CategoryIdAfter = selectedCategory.Name
      setBookAudit((prevState) => ({
        ...prevState,
        TitleAfter: editBook.Title,
        AuthorAfter: editBook.Author,
        RentPriceAfter: editBook.RentPrice,
        ImageAfter: editBook.Image,
        FineAfter: editBook.Fine,
        LanguageAfter: editBook.Language,
        ISBNafter: editBook.ISBN,
      }));
    } else {
      setBook({
        ...Book,
        [e.target.name]: selectedCategory ? selectedCategory.Name : "",
      });
    }
  };

  const [Categories, setCategories] = useState(null);

  useEffect(() => {
    getData();
    if (book === undefined) {
      setEdit(false);
    } else {
      setEditBook(book);
      setBookAudit((prevState) => ({
        ...prevState,
        BookId: editBook._id,
        TitleBefore: editBook.Title,
        AuthorBefore: editBook.Author,
        RentPriceBefore: editBook.RentPrice,
        ImageBefore: editBook.Image,
        FineBefore: editBook.Fine,
        CategoryIdBefore: editBook.CategoryId,
        LanguageBefore: editBook.Language,
        ISBNbefore: editBook.ISBN,
      }));
    }
  }, [book]); // Add book as a dependency

  useEffect(() => {
    console.log(BookAudit);
    console.log(editBook);
  }, [BookAudit, editBook]); // Add BookAudit and editBook as dependencies

  const getData = async () => {
    try {
      const response = await axios.get("/api/Category/");
      setCategories(response.data.data);
      if (book !== undefined) {
        setBookAudit((prevState) => ({
          ...prevState,
          BookId: book._id,
          TitleBefore: book.Title,
          AuthorBefore: book.Author,
          RentPriceBefore: book.RentPrice,
          ImageBefore: book.Image,
          FineBefore: book.Fine,
          CategoryIdBefore: book.CategoryId,
          LanguageBefore: book.Language,
          ISBNbefore: book.ISBN,
        }));
      }
    } catch (error) {
      alert("Error occured while reading data");
      navigate("/dashboard");
    }
  };

  function hasEmptyValues(obj) {
    // Check if any property in the object has an empty string value
    return Object.values(obj).some((value) => value === "");
  }

  const exit = (e) => {
    if (window.confirm("Are you sure you want to go back?")) {
      navigate("/dashboard/books");
    }
  };

  const imageClick = async (e) => {
    if (e.target.files[0] !== null) {
      processFile(e);
    }
  };

  const SetAuditData = async () =>
  {
    BookAudit.TitleAfter =editBook.Title
    BookAudit.AuthorAfter = editBook.Author
    BookAudit.RentPriceAfter= editBook.RentPrice
    BookAudit.ImageAfter= editBook.Image
    BookAudit.FineAfter= editBook.Fine
    BookAudit.CategoryIdAfter= editBook.CategoryId
    BookAudit.LanguageAfter= editBook.Language
    BookAudit.ISBNafter= editBook.ISBN
  }

  const addBook = async (e) => {
    e.preventDefault();
    setLoader(true);
    setBookAudit((prevState) => ({
      ...prevState,
      TitleAfter: editBook.Title,
      AuthorAfter: editBook.Author,
      RentPriceAfter: editBook.RentPrice,
      ImageAfter: editBook.Image,
      FineAfter: editBook.Fine,
      CategoryIdAfter: editBook.CategoryId,
      LanguageAfter: editBook.Language,
      ISBNafter: editBook.ISBN,
    }));
    SetAuditData();
    if (Edit) {
      try {
        const response = await axios.put(
          "/api/Books/edit/" + editBook._id,
          editBook
        );
        if (response.data.success) {
          console.log(BookAudit);
          const data = await axios.post("/api/BookAudit/create", BookAudit);
          if (data.data.success) {
            setLoader(false);
            navigate("/dashboard/books");
          } else {
            setLoader(false);
            alert("There was an error in Editing the desired book.");
          }
        } else {
          setLoader(false);
          alert("There was an error in Editing the desired book.");
        }
      } catch (err) {
        setLoader(false);
        alert("There was an error in Editing the desired book: " + err);
      }
    } else {
      try {
        const response = await axios.post("/api/Books/create", Book);

        if (response.data.success) {
          navigate("/dashboard/books");
        } else {
          setLoader(false);
          alert("Book not added");
        }
        setLoader(false);
      } catch (error) {
        console.error(error);
        setLoader(false);
        alert("An error occurred while adding the book.");
      }
    }
  };

  const processFile = async (e) => {
    var file = e.target.files[0];

    // Set your cloud name and unsigned upload preset here:
    var YOUR_CLOUD_NAME = "djiqxvcin";
    var YOUR_UNSIGNED_UPLOAD_PRESET = "e5jxkzj0";

    var POST_URL =
      "https://api.cloudinary.com/v1_1/" + YOUR_CLOUD_NAME + "/auto/upload";

    var XUniqueUploadId = +new Date();

    processFile();

    function processFile(e) {
      var size = file.size;
      var sliceSize = 20000000;
      var start = 0;

      setTimeout(loop, 3);

      function loop() {
        var end = start + sliceSize;

        if (end > size) {
          end = size;
        }
        var s = slice(file, start, end);
        send(s, start, end - 1, size);
        if (end < size) {
          start += sliceSize;
          setTimeout(loop, 3);
        }
      }
    }

    function generateRandomString(length) {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
      }
      return result;
    }

    function send(piece, start, end, size) {
      var formdata = new FormData();

      formdata.append("file", piece);
      formdata.append("cloud_name", YOUR_CLOUD_NAME);
      formdata.append("upload_preset", YOUR_UNSIGNED_UPLOAD_PRESET);
      if (Edit) {
        formdata.append("public_id", generateRandomString(11));
      } else {
        formdata.append("public_id", generateRandomString(10) + "zab");
      }

      var xhr = new XMLHttpRequest();
      xhr.open("POST", POST_URL, false);
      xhr.setRequestHeader("X-Unique-Upload-Id", XUniqueUploadId);
      xhr.setRequestHeader(
        "Content-Range",
        "bytes " + start + "-" + end + "/" + size
      );

      xhr.onload = function () {
        // do something to response
        const jsonString = this.responseText; // Your JSON data as a string
        const responseObject = JSON.parse(jsonString);
        const urlData = responseObject.url;
        console.log(`url: ${urlData}`);
        Book.Image = urlData;
        handleImageUpdate(urlData);
        handleImageUpdate(urlData);
      };

      xhr.send(formdata);
    }

    const handleImageUpdate = (urlData) => {
      if (Edit) {
        setEditBook((prevUser) => ({
          ...prevUser,
          Image: urlData,
        }));
      } else {
        setBook((prevUser) => ({
          ...prevUser,
          Image: urlData,
        }));
      }
    };

    function slice(file, start, end) {
      var slice = file.mozSlice
        ? file.mozSlice
        : file.webkitSlice
        ? file.webkitSlice
        : file.slice
        ? file.slice
        : noop;

      return slice.bind(file)(start, end);
    }

    function noop() {}
  };

  return (
    <div className="text-center mx-3 justify-content-center">
      <h1 className="my-3" style={{ fontWeight: "bold" }}>
        {Edit ? "Edit Book" : "Add Book"}
      </h1>
      {Edit && editBook.Image && (
        <div className="square-image-box">
          <img src={editBook.Image} alt="Book Cover" className="square-image" />
        </div>
      )}

      <div className="d-flex row my-3">
        <div className="col-md-6">
          <label className="form-label">Title</label>
          <input
            className="input form-control form-control-lg"
            type="text"
            name="Title"
            placeholder="Enter the Title"
            onChange={onchange}
            value={
              Edit && editBook && editBook.Title ? editBook.Title : Book.Title
            }
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Author</label>
          <input
            className="input form-control form-control-lg"
            type="text"
            name="Author"
            placeholder="Enter the Author"
            onChange={onchange}
            value={
              Edit && editBook && editBook.Author
                ? editBook.Author
                : Book.Author
            }
          />
        </div>
      </div>
      <div className="d-flex row my-3">
        <div className="col-md-6">
          <label className="form-label">ISBN Number</label>
          <input
            className="input form-control "
            type="number"
            name="ISBN"
            placeholder="Enter the ISBN Number"
            value={
              Edit && editBook && editBook.ISBN ? editBook.ISBN : Book.ISBN
            }
            onChange={onchange}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Rent Price in Rs</label>
          <input
            className="input form-control form-control-lg"
            type="number"
            name="RentPrice"
            placeholder="Enter the Rent Price"
            value={
              Edit && editBook && editBook.RentPrice
                ? editBook.RentPrice
                : Book.RentPrice
            }
            onChange={onchange}
          />
        </div>
      </div>
      <div className="d-flex row my-3">
        <div className="col-md-6">
          <label className="form-label mx-3">Fine</label>
          <input
            className="input form-control"
            type="number"
            name="Fine"
            placeholder="Enter the Fine per day in Rs"
            value={
              Edit && editBook && editBook.Fine ? editBook.Fine : Book.Fine
            }
            onChange={onchange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="formFileSm" className="form-label">
            Image
          </label>
          <input
            className="input form-control "
            disabled={
              (Edit && editBook.Title === "") || (!Edit && Book.Title === "")
            }
            id="formFileSm"
            type="file"
            accept="image/*"
            onChange={imageClick}
          />
        </div>
      </div>
      <div className="d-flex row my-3">
        <div className="col-md-6">
          <label className="form-label mx-3">Language</label>
          <input
            className="input form-control"
            value={
              Edit && editBook && editBook.Language
                ? editBook.Language
                : Book.Language
            }
            type="text"
            name="Language"
            placeholder="Enter the Language"
            onChange={onchange}
          />
        </div>

        <div className="col-md-6">
          <label className=" form-label mx-2">Select Category</label>
          <select
            className="row form-control mx-1"
            id="category"
            name="CategoryId"
            onChange={onCategoryChange}
          >
            {Categories &&
              Array.isArray(Categories) &&
              Categories.map((category) => (
                <option
                  key={category._id}
                  value={category._id}
                  selected={editBook && editBook.CategoryId === category.Name}
                >
                  {category.Name}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className=" my-3 d-flex justify-content-center">
        <button
          className="button2 mx-3"
          // disabled={hasEmptyValues(Book) || (Edit && hasEmptyValues(editBook))}
          onClick={addBook}
        >
          Confirm
        </button>
        <button className="button4 mx-3" onClick={exit}>
          Exit
        </button>
      </div>
    </div>
  );
}

export default AddBooks;
