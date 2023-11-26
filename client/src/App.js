import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Page from "./components/Landing Page/Page";
import SignIn from "./components/SignIn/SignUp/SignIn";
import SignUp from "./components/SignIn/SignUp/SignUp";
import Spinner from "./components/Spin";
import SideBar from "./components/Admin/SideBar";
import Members from "./components/Admin/Members";
import Books from "./components/Admin/Books";
import AddBook from "./components/Admin/AddBooks";
import Categories from "./components/Admin/Categories";
import LandingPage from "./components/Member/LandingPage";
import ShowBooks from "./components/Member/ShowBooks";
import AddCategory from "./components/Admin/AddCategory";
import Profile from "./components/Member/Profile";
import ChangePassword from "./components/Member/ChangePassword";
import ReservedBooks from "./components/Member/ReservedBooks";
import ReturnBook from "./components/Member/ReturnBook";

function App() {
  const [Loader, setLoader] = useState(false);
  const [User, setuser] = useState({
    _id: "",
    Name: "",
    Email: "",
    Password: "",
    PhoneNo: "",
    CNIC: "",
    Image: "",
  });
  return (
    <>
      {Loader && <Spinner />}
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Page />} />
          <Route  path="/dashboard" element={<SideBar />}>
            <Route index path="members" element={<Members />} />
            <Route index path="books" element={<Books />} />
            <Route index path="addbook" element={<AddBook  setLoader={setLoader}/>} />
            <Route index path="categories" element={<Categories  setLoader={setLoader}/>} />
            <Route index path="addcategory" element={<AddCategory  setLoader={setLoader}/>} />
          </Route>
          <Route  path="/member" element={<LandingPage />}>
          </Route>
          <Route  path="/profile" element={<Profile User = {User}  setLoader={setLoader}/>}>
          </Route>
          <Route  path="/showbooks" element={<ShowBooks setLoader={setLoader} User = {User}/>}>
          </Route>
          <Route  path="/changepassword" element={<ChangePassword setLoader={setLoader} User = {User}/>}>
          </Route>
          <Route  path="/reserved" element={<ReservedBooks setLoader={setLoader} User = {User}/>}>
          </Route>
          <Route  path="/returnbook" element={<ReturnBook setLoader={setLoader} User = {User}/>}>
          </Route>
          <Route
            index
            path="/signup"
            element={<SignUp setLoader={setLoader} />}
          />
          <Route
            index
            path="/signin"
            element={<SignIn setLoader={setLoader} setuser = {setuser} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
