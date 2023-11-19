import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AddBooks.css";
import { Link, useNavigate } from "react-router-dom";

function AddBooks({ setLoader }) {
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

  const onchange = (e) => {
    setBook({ ...Book, [e.target.name]: e.target.value });
  };

  const onCategoryChange = (e) => {
    const selectedCategory = Categories.find(category => category._id === e.target.value);
    setBook({ ...Book, [e.target.name]: selectedCategory ? selectedCategory.Name : '' });
    console.log(Book)
  };

  const [Categories, setCategories] = useState(null);
  const navigate = useNavigate();
  const [Languages, setLanguages] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get("/api/Category/");
      setCategories(response.data.data);
    } catch (error) {
      alert("Error occured while reading data");
      navigate("/dashboard/books");
    }
  };

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

  const addBook = async (e) => {
    try {
      e.preventDefault();
      setLoader(true);
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

    function send(piece, start, end, size) {
      var formdata = new FormData();

      formdata.append("file", piece);
      formdata.append("cloud_name", YOUR_CLOUD_NAME);
      formdata.append("upload_preset", YOUR_UNSIGNED_UPLOAD_PRESET);
      formdata.append("public_id", Book.Title);

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
      setBook((prevUser) => ({
        ...prevUser,
        Image: urlData,
      }));
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
        Add Book
      </h1>
      <div className="d-flex row my-3">
        <div className="col-md-6">
          <label className="form-label">Title</label>
          <input
            className="input form-control form-control-lg"
            type="name"
            name="Title"
            placeholder="Enter the Title"
            onChange={onchange}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Author</label>
          <input
            className="input form-control form-control-lg"
            type="name"
            name="Author"
            placeholder="Enter the Author"
            onChange={onchange}
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
            onChange={onchange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="formFileSm" className="form-label">
            Image
          </label>
          <input
            className="input form-control "
            disabled={Book.Title === ""}
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
                <option key={category._id} value={category._id}>
                  {category.Name}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className=" my-3 d-flex justify-content-center">
        <button className="button2 mx-3" disabled={Book.Title === "" || Book.Author === "" || Book.Fine ==="" || Book.CategoryId === "" || Book.ISBN === "" || Book.Image === "" || Book.Language === "" || Book.RentPrice === ""} onClick={addBook}>
          Add Book
        </button>
        <button className="button4 mx-3" onClick={exit}>
          Exit
        </button>
      </div>
    </div>
  );
}

export default AddBooks;
