import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";

function AddCategory({ setLoader }) {
  const navigate = useNavigate();
  const [Category, setCategory] = useState({
    Name: "",
  });
  const [check, setCheck] = useState(false);

  const onchange = (e) => {
    setCategory({ ...Category, [e.target.name]: e.target.value });
  };

  const checkCategory = async () => {
    const response = await axios.get("/api/Category/check/" + Category);
    if (response.data.success) {
      setCheck(true);
    }
  };

  const exit = () => {
    if (window.confirm("Are you sure you want to exit?")) {
      navigate("/dashboard/categories");
    }
  };

  const addCategory = async (e) => {
    e.preventDefault();
    setLoader(true);
    const responsee = await axios.get("/api/Category/check/" + Category.Name);
    console.log(Category)
    console.log(responsee);
    if (responsee.data.success == false) {
      const response = await axios.post("/api/Category/create", Category);
      if (response.data.success) {
        alert("Data saved successfully");
        setLoader(false);
        navigate("/dashboard/categories");
      } else {
        setLoader(false);
        alert("There was an error in saving the data.");
      }
    }
     else {
      setLoader(false);
      alert("Category already exists.");
    }
  };

  return (
    <div className="" style={{ top: "50%", left: "50%" }}>
      <h1 className="my-3 text-center" style={{ fontWeight: "bolder" }}>
        ADD CATEGORY
      </h1>
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-6">
          <label className="form-label">Name</label>
          <input
            className="input form-control form-control-lg"
            type="text"
            name="Name"
            placeholder="Enter the Category.."
            onChange={onchange}
          />
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-3">
          <div className=" my-3 d-flex justify-content-center">
            <button
              className="button2 mx-3"
              // disabled={hasEmptyValues(Book) || (Edit && hasEmptyValues(editBook))}
              onClick={addCategory}
            >
              Confirm
            </button>
            <button className="button4 mx-3" onClick={exit}>
              Exit
            </button>
          </div>
        </div>
        <div className="col-md-1"></div>
      </div>
      <div className="col-md-4"></div>
      <div className="col-md-4"></div>
      <div className="col-md-4"></div>
    </div>
  );
}

export default AddCategory;
