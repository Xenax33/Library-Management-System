import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import NavBar from "./NavBar";

function ChangePassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const [User, setUser] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const receivedData = location.state || {};

  // Access the data sent from the button
  const { User: receivedUser, UserAudit: recievedUserAudit } = receivedData;

  const getData = async () => {
    try {
      const response = await axios.get("/api/User/get/" + receivedUser._id);
      if (response.data.success) {
        setUser(response.data.data);
        recievedUserAudit.PasswordBefore = response.data.data.Password;
      } else {
        alert("There was some error fetching the data");
        navigate("/");
      }
    } catch (err) {
      alert("There was some error fetching the data");
      navigate("/");
    }
  };

  useEffect(() => {
    getData();
    console.log(recievedUserAudit);
  }, []);

  const Exit = async () => {
    if (window.confirm("Are you sure you want to exit?")) {
      navigate("/profile");
    }
  };

  const CurrentPassword = async (e) => {
    setUser((prevState) => ({
      ...prevState,
      Password: e.target.value,
    }));
  };
  const NewPassword = async (e) => {
    setNewPassword(e.target.value);
  };
  const ConfirmPassword = async (e) => {
    setConfirmPassword(e.target.value);
  };

  const changePassword = async () => {
    if (User.Password === receivedUser.Password) {
      if (confirmPassword === newPassword) {
        if (confirmPassword !== "" && newPassword !== "") {
          recievedUserAudit.PasswordAfter = newPassword;
          //yaha api call karni he
          try {
            const response = await axios.put(
              "/api/User/editpassword/" + User._id,
              { newPassword }
            );
            if (response.data.success) {
              try {
                const Response = await axios.post(
                  "/api/UserAudit/create",
                  recievedUserAudit
                );
                if (Response.data.success) {
                  alert("Password edited successfully");
                  navigate("/member");
                } else {
                  alert("There was some error in editing the password");
                  navigate("/");
                }
              } catch (err) {
                alert("There was some error in editing the password");
                navigate("/");
              }
            } else {
              alert("There was some error in editing the password");
            }
          } catch (err) {
            alert("There was some error in editing the password");
          }
        } else {
          alert("Please enter new password");
        }
      } else {
        alert("Both Passwords do not match");
      }
    } else {
      alert("You have entered wrong password");
    }
  };
  return (
    <div id="ShowBooks">
      <h1
        className="text-center"
        style={{ padding: "2%", fontWeight: "bolder" }}
      >
        Change Password
      </h1>
      <div style={{ paddingLeft: "2%", paddingRight: "2%" }}>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <label className="form-label mx-3">Current Password</label>
            <input
              className="input form-control"
              type="password"
              name="Name"
              onChange={CurrentPassword}
            />
          </div>
          <div className="col-md-3"></div>
        </div>
        <div className="row my-3">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <label className="form-label mx-3">New Password</label>
            <input
              className="input form-control"
              type="password"
              name="Name"
              onChange={NewPassword}
            />
          </div>
          <div className="col-md-3"></div>
        </div>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <label className="form-label mx-3">Confirm Password</label>
            <input
              className="input form-control"
              type="password"
              name="Name"
              onChange={ConfirmPassword}
            />
          </div>
          <div className="col-md-3"></div>
        </div>
        <div className="row my-3">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="d-flex justify-content-end">
              <button className="button2 mx-3" onClick={changePassword}>
                Confirm
              </button>
              <button className="button3" onClick={Exit}>
                Exit
              </button>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
