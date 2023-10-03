import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8081/";

function Login() {
  const navigate = useNavigate();
  const [User, setUser] = useState({
    email: "",
    password: "",
  });

  const onchange = (e) => {
    setUser({ ...User, [e.target.name]: e.target.value });
  };

  const onClick = async (e) => {
    e.preventDefault();
    const data = await axios.get(
      "/api/User/login/" + User.email + "/" + User.password
    );
    if (data.data.success) {
      localStorage.setItem("user", JSON.stringify(data.data.data));
      navigate("/dashboard");
      //const user = JSON.parse(localStorage.getItem('user'))
    } else {
      alert("Log in unsuccessful");
    }
  };

  return (
    <div>
      <div className="container d-flex flex-column">
        <div className="row vh-100">
          <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100">
            <div className="d-table-cell align-middle">
              <div className="text-center mt-4">
                <h1 className="h2">Welcome back!</h1>
                <p className="lead">Sign in to your account to continue</p>
              </div>

              <div className="card">
                <div className="card-body">
                  <div className="m-sm-3">
                    <form>
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                          className="form-control form-control-lg"
                          type="email"
                          name="email"
                          placeholder="Enter your email"
                          onChange={onchange}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                          className="form-control form-control-lg"
                          type="password"
                          name="password"
                          placeholder="Enter your password"
                          onChange={onchange}
                        />
                      </div>
                      <div>
                        <div className="form-check align-items-center">
                          <input
                            id="customControlInline"
                            type="checkbox"
                            className="form-check-input"
                            value="remember-me"
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
                      </div>
                      <div className="d-grid gap-2 mt-3">
                        <button
                          className="btn btn-lg btn-primary"
                          onClick={onClick}
                          disabled={
                            User.email.length < 5 || User.password.length < 6
                          }
                        >
                          Sign in
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="text-center mb-3">
                Don't have an account?{" "}
                {
                  <Link to="/signup">
                    <p>Sign up</p>{" "}
                  </Link>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
