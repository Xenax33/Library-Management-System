import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8081/";

function SignUp() {
  const navigate = useNavigate();
  const [Modal, setModal] = useState(false);
  // const [Loading, setLoading] = useState(false);
  // const [value, setValue] = React.useState(null);
  const [User, setUser] = useState({
    username: "",
    email: "",
    password: "",
    Address: "",
    PhoneNo: "",
    Role: "customer",
    Image: "",
  });

  const onchange = (e) => {
    setUser({ ...User, [e.target.name]: e.target.value });
  };

// Assuming you have the user data in a variable called 'userData'
const onClick = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post("/api/User/create", User);
    if (response.data.success) {
      localStorage.setItem("user", JSON.stringify(User));
      navigate("/dashboard");
    } else {
      setModal(false);
      alert("user not created");
    }
  } catch (error) {
    console.error(error);
    setModal(false);
    alert("An error occurred while creating the user");
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
      console.log("start ", start);
      console.log("end", end);

      var formdata = new FormData();
      console.log(XUniqueUploadId);

      formdata.append("file", piece);
      formdata.append("cloud_name", YOUR_CLOUD_NAME);
      formdata.append("upload_preset", YOUR_UNSIGNED_UPLOAD_PRESET);
      formdata.append("public_id", User.email);

      var xhr = new XMLHttpRequest();
      xhr.open("POST", POST_URL, false);
      xhr.setRequestHeader("X-Unique-Upload-Id", XUniqueUploadId);
      xhr.setRequestHeader(
        "Content-Range",
        "bytes " + start + "-" + end + "/" + size
      );

      xhr.onload = function () {
        // do something to response
        console.log(this.responseText);
        const jsonString = this.responseText; // Your JSON data as a string
        const responseObject = JSON.parse(jsonString);
        const urlData = responseObject.url;
        User.Image = urlData;
        console.log(urlData);
      };

      xhr.send(formdata);
    }

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
    <>
      <main className="d-flex w-100">
        <div className="container d-flex flex-column">
          <div className="row vh-100">
            <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100">
              <div className="d-table-cell align-middle">
                <div className="text-center mt-4">
                  <h1 className="h2">Get started</h1>
                  <p className="lead">
                    Start creating the best possible user experience for you
                    customers.
                  </p>
                </div>

                <div className="card">
                  <div className="card-body" style={{ width: 900 }}>
                    <div className="m-sm-3">
                      <form>
                        <div className="mb-3 row flex">
                          <div className="col-md-6">
                            <label className="form-label">Full name</label>
                            <input
                              className="form-control form-control-lg"
                              type="text"
                              name="username"
                              placeholder="Enter your name"
                              onChange={onchange}
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Phone Number</label>
                            <input
                              className="form-control form-control-lg"
                              type="phone"
                              name="PhoneNo"
                              placeholder="Enter Phone Number"
                              onChange={onchange}
                            />
                          </div>
                        </div>
                        <div className="mb-3 row flex">
                          <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                              className="form-control form-control-lg"
                              type="email"
                              name="email"
                              placeholder="Enter your Email"
                              onChange={onchange}
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input
                              className="form-control form-control-lg"
                              type="password"
                              name="password"
                              placeholder="Enter your Password"
                              onChange={onchange}
                            />
                          </div>
                        </div>
                        <div className="mb-3 flex row">
                          <div className="col-md-6">
                            <label className="form-label">Address</label>
                            <textarea
                              className="form-control form-control-lg"
                              type="address"
                              rows="3"
                              name="Address"
                              placeholder="Enter your Address"
                              onChange={onchange}
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="formFileSm" className="form-label">
                              Image
                            </label>
                            <input
                              className="form-control form-control-sm"
                              id="formFileSm"
                              type="file"
                              accept="image/*"
                              onChange={processFile}
                            />
                          </div>
                        </div>

                        <div className="d-grid gap-2 mt-3">
                          <button
                            className="btn btn-lg btn-primary"
                            onClick={onClick}
                            data-bs-toggle={Modal ? "modal" : ""}
                            data-bs-target={Modal ? "#staticBackdrop" : ""}
                          >
                            Sign up
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="text-center mb-3 my-2">
                  Already have account?{" "}
                  {
                    <Link to="/">
                      <p>Log In</p>{" "}
                    </Link>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="text-center">
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title text-center"
                  id="staticBackdropLabel"
                >
                  Account Created
                </h5>
              </div>
              <div className="modal-body">
                Congratulations! You have successfully created an account. Let's
                Log in and get started.
              </div>
              <div className="modal-footer">
                <Link to="/">
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    Let's Start.
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
