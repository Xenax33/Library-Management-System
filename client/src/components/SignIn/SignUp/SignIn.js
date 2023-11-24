import React, { useState } from "react";
import "./SignIn.css";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignIn({ setLoader, setuser}) {
  const navigate = useNavigate();
  const [User, setUser] = useState({
    Email: "",
    Password: "",
  });

  const onchange = (e) => {
    setUser({ ...User, [e.target.name]: e.target.value });
  };

  const signIn = async (e) => {
    e.preventDefault();
    const data = await axios.get(
      "/api/User/login/" + User.Email + "/" + User.Password
    );
    if (data.data.success) {
      console.log(data.data)
      if (data.data.data.isAdmin) {
        navigate("/dashboard");
      } else {
        setuser(data.data.data)
        navigate("/member");
      }
    } else {
      alert("Log in unsuccessful");
    }
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

  return (
    <body className="hero" style={{
      background:
        "linear-gradient(315deg, #FFBB5C 3%, #FF9B50 38%, #E25E3E 68%, #C63D2F 98%)",
    }}>
      <div
        className="tbody"
        
      >
        <div className="card" style={{width:"100%"}}>
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
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    className="input form-control form-control-lg"
                    type="email"
                    name="Email"
                    placeholder="Enter your email"
                    onChange={onchange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    className="input form-control form-control-lg"
                    type="password"
                    name="Password"
                    placeholder="Enter your password"
                    onChange={onchange}
                  />
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
              <button className="button2 my-3" onClick={signIn}>
                Sign in
              </button>
            </div>
            <div className="d-flex justify-content-center">
              <h6>Don't have an Account? </h6>
              <Link
                to="/signup"
                style={{ textDecoration: "underline", color: "#E25E3E" }}
              >
                <h6 className="mx-1 custom-link" style={{ fontWeight: "bold" }}>
                  {" "}
                  Sign Up.
                </h6>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default SignIn;
