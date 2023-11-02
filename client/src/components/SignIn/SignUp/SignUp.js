import React, { useState } from "react";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/";

function SignUp({ setLoader }) {
  const navigate = useNavigate();
  const [User, setUser] = useState({
    Name: "",
    Email: "",
    Password: "",
    PhoneNo: "",
    CNIC: "",
    Image: "",
  });
  const [File, setFile] = useState(null);

  const updateImage = (newImageValue) => {
    // Create a new object with the updated Image value
    const updatedUser = {
      ...User, // Copy the existing User object
      Image: newImageValue, // Update the Image property
    };

    // Set the new User object using setUser
    setUser(updatedUser);
  };

  const SignUp = async (e) => {
    e.preventDefault();
    await setLoader(true);
    if (File) {
      await processFile();
    }
    const response = await axios
      .post("/api/User/create", User)
      .then((res) => {
        if (response.data.success) {
          navigate("/signin");
          alert("User Created");
        } else {
          alert("user not created");
        }
      })

      // Catch errors if any
      .catch((err) => {
        console.error(err);
        alert("An error occurred while creating the user");
      });

    await setLoader(false);
  };

  const Image = async (e) => {
    await setFile(e.target.files[0]);
    if (!File) {
      alert("Please select either jpg or png file.");
    }
  };

  const onchange = (e) => {
    setUser({ ...User, [e.target.name]: e.target.value });
  };

  const Loader = async () => {
    // Set the loader to true initially
    console.log("pressed");
    setLoader(true);

    // Use setTimeout to set the loader to false after 3 seconds (3000 milliseconds)
    await setTimeout(() => {
      setLoader(false);
      console.log("done");
    }, 3000);
  };

  const processFile = async (e) => {
    var file = File;

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
      formdata.append("public_id", User.Email);

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
        updateImage(urlData);
        const updatedUser = {
          ...User, // Copy the existing User object
          Image: urlData, // Update the Image property
        };

        // Set the new User object using setUser
        setUser(updatedUser);
        console.log("url: " + urlData);
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
    <div className="tbody">
      <div class="wave"></div>
      <div class="wave"></div>
      <div class="wave"></div>
      <div className="card" style={{ width: "55%" }}>
        <div className="card-header text-center">
          <div className="d-flex justify-content-center">
            <img className="logo" src="Logo.png" alt="Logo" />
          </div>
          <h1 className="my-3" style={{ fontWeight: "bolder" }}>
            Sign In
          </h1>
        </div>
        <div className="card-body">
          <div className="m-sm-3">
            <form>
              <div className="row">
                <div className="mb-3 col-md-6">
                  <label className="form-label">Name</label>
                  <input
                    className="input form-control form-control-lg"
                    type="name"
                    name="Name"
                    placeholder="Enter your Name"
                    onChange={onchange}
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label">Email</label>
                  <input
                    className="input form-control form-control-lg"
                    type="email"
                    name="Email"
                    placeholder="Enter your email"
                    onChange={onchange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="mb-3 col-md-6">
                  <label className="form-label">Password</label>
                  <input
                    className="input form-control form-control-lg"
                    type="password"
                    name="Password"
                    placeholder="Enter your password"
                    onChange={onchange}
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label">CNIC Number</label>
                  <input
                    className="input form-control form-control-lg"
                    type="CNIC"
                    name="CNIC"
                    placeholder="Enter your CNIC Number"
                    onChange={onchange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="mb-3 col-md-6">
                  <label className="form-label">Phone Number</label>
                  <input
                    className="input form-control form-control-lg"
                    type="phoneNo"
                    name="PhoneNo"
                    placeholder="Enter your Phone Number"
                    onChange={onchange}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="formFileSm" className="form-label">
                    Image
                  </label>
                  <input
                    className="input form-control form-control-lg"
                    id="formFileSm"
                    type="file"
                    accept="image/*"
                    onChange={Image}
                  />
                </div>
              </div>
              {/* <div>
                <div className="form-check align-items-center">
                  <input
                    id="customControlInline"
                    type="checkbox"
                    className="form-check-input"
                    name="remember-me"
                    checked
                  />
                  <label
                    className="form-check-label text-small"
                    htmlFor="customControlInline"
                  >
                    Remember me
                  </label>
                </div>
              </div> */}
            </form>
          </div>
        </div>
        <div className="card-footer">
          <div className="d-grid gap-2 mt-3">
            <button className="button2 my-3" onClick={SignUp}>
              Sign Up
            </button>
          </div>
          <div className="d-flex justify-content-center">
            <h6>Already have an Account? </h6>
            <Link
              to="/signin"
              style={{ textDecoration: "underline", color: "#E25E3E" }}
            >
              <h6 className="mx-1" style={{ fontWeight: "bold" }}>
                {" "}
                Sign in here.
              </h6>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
