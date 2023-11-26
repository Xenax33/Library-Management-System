import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import "./Profile.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ChangePassword from "./ChangePassword";

function Profile({ User, setLoader }) {
  const [user, setUser] = useState({
    Name: "",
    PhoneNo: "",
    CNIC: "",
    Image: "",
  });
  const navigate = useNavigate();
  const [userAudit, setUserAudit] = useState({
    UserId: "",
    NameBefore: "",
    NameAfter: "",
    ImageBefore: "",
    ImageAfter: "",
    PhoneNoBefore: "",
    PhoneNoAfter: "",
    CNICBefore: "",
    CNICAfter: "",
    PasswordBefore: "",
    PasswordAfter: "",
    Email: "",
  });

  useEffect(() => {
    setUserAudit((prevState) => ({
      ...prevState,
      UserId: User._id,
      NameAfter: user.Name,
      ImageAfter: user.Image,
      CNICAfter: user.CNIC,
      PhoneNoAfter: user.PhoneNo,
    }));
  }, [user]);

  useEffect(() => {
    if(User === undefined || User === null || User._id === "")
    {
      alert("Session expired")
      navigate("/")
    }
    console.log(User)
    setUser(User);
    setUserAudit((prevState) => ({
      ...prevState,
      UserId: User._id,
      Email: User.Email,
      NameBefore: User.Name,
      ImageBefore: User.Image,
      CNICBefore: User.CNIC,
      PhoneNoBefore: User.PhoneNo,
      PasswordBefore: User.Password,
      PasswordAfter: User.Password,
    }));
  }, []);

  const onchange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setUserAudit((prevState) => ({
      ...prevState,
      UserId: User._id,
      NameAfter: user.Name,
      ImageAfter: user.Image,
      CNICAfter: user.CNIC,
      PhoneNoAfter: user.PhoneNo,
    }));
  };

  const imageClick = async (e) => {
    if (e.target.files[0] !== null) {
      processFile(e);
    }
  };

  const ChangePassword = async () => {
    const dataToSend = {
      User: User, // Assuming User is an object
      UserAudit : userAudit
    };

    navigate("/changepassword", { state: dataToSend });
  };

  const EditUser = async () => {
    setLoader(true);
    setUserAudit((prevState) => ({
      ...prevState,
      NameAfter: user.Name,
      ImageAfter: user.Image,
      CNICAfter: user.CNIC,
      PhoneNoAfter: user.PhoneNo,
    }));
    try {
      const response = await axios.put("/api/User/edit/" + user._id, user);
      if (response.data.success) {
        console.log(userAudit);
        const Response = await axios.post("/api/UserAudit/create", userAudit);
        if (Response.data.success) {
          alert("Data edited successfully");
        } else {
          alert("Auditing is not working");
        }
      } else {
        alert("There was some error in editing the data");
      }
    } catch (err) {
      alert("There was some error in editing the data");
      setLoader(false);
    }
    setLoader(false);
  };

  const Exit = async () => {
    if (window.confirm("Are you sure you want to exit?")) {
      navigate("/member");
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
      formdata.append("public_id", generateRandomString(15) + user.Email);

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
        user.Image = urlData;
        userAudit.ImageAfter = urlData;
        handleImageUpdate(urlData);
        handleImageUpdate(urlData);
      };

      xhr.send(formdata);
    }

    const handleImageUpdate = (urlData) => {
      setUser((prevUser) => ({
        ...prevUser,
        Image: urlData,
      }));
      setUserAudit((prevState) => ({
        ...prevState,
        ImageAfter: urlData,
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
    <div id="ShowBooks">
      <div>
        <NavBar Active={"Profile"} />
      </div>
      <div id="Profile">
        <div className="square-image-box" style={{ borderRadius: "50%" }}>
          <img src={user.Image} alt="Book Cover" className="square-image" />
        </div>
        <div className="row my-3">
          <div className="col-md-6">
            <label className="form-label mx-3">Name</label>
            <input
              className="input form-control"
              type="text"
              name="Name"
              value={user.Name}
              onChange={onchange}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label mx-3">Phone Number</label>
            <input
              className="input form-control"
              type="number"
              name="PhoneNo"
              value={user.PhoneNo}
              onChange={onchange}
            />
          </div>
        </div>
        <div className="row my-3">
          <div className="col-md-6">
            <label className="form-label mx-3">CNIC</label>
            <input
              className="input form-control"
              type="number"
              name="CNIC"
              value={user.CNIC}
              onChange={onchange}
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
              onChange={imageClick}
            />
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button className="button2" onClick={ChangePassword}>
            Change Password
          </button>
          <button className="button2 mx-3" onClick={EditUser}>
            Confirm
          </button>
          <button className="button3" onClick={Exit}>
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
