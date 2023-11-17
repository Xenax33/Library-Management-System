import React from "react";
import "./AddBooks.css";

function AddBooks() {
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
            // onChange={onchange}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Author</label>
          <input
            className="input form-control form-control-lg"
            type="name"
            name="Author"
            placeholder="Enter the Author"
            // onChange={onchange}
          />
        </div>
      </div>
      <div className="d-flex row my-3">
        <div className="col-md-6">
          <label className="form-label">ISBN Number</label>
          <input
            className="input form-control "
            type="number"
            name="Title"
            placeholder="Enter the ISBN Number"
            // onChange={onchange}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Rent Price in Rs</label>
          <input
            className="input form-control form-control-lg"
            type="number"
            name="Author"
            placeholder="Enter the Rent Price"
            // onChange={onchange}
          />
        </div>
      </div>
      <div className="d-flex row my-3">
        <div className="col-md-6">
          <label className="form-label mx-3">Fine</label>
          <input
            className="input form-control"
            type="number"
            name="Title"
            placeholder="Enter the Fine per day in Rs"
            // onChange={onchange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="formFileSm" className="form-label">
            Image
          </label>
          <input
            className="input form-control "
            id="formFileSm"
            type="file"
            accept="image/*"
            // onChange={Image}
          />
        </div>
      </div>
      <div className="d-flex row my-3">
        <div className="col-md-6">
          <label className="form-label mx-3 my-3">
            Select Category
            <select className="mx-3" id="country" name="country">
              <option value="au">Australia</option>
              <option value="ca">Canada</option>
              <option value="usa">USA</option>
            </select>
          </label>
        </div>

        <div className="col-md-6">
          <label className="form-label">
            Select Language
            <select className="mx-3" id="country" name="country">
              <option value="au">Australia</option>
              <option value="ca">Canada</option>
              <option value="usa">USA</option>
            </select>
          </label>
        </div>
      </div>
      <button className="button2">Add Book</button>
    </div>
  );
}

export default AddBooks;
