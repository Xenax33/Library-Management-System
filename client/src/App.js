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

function App() {
  const [Loader, setLoader] = useState(false);
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
          </Route>
          <Route
            index
            path="/signup"
            element={<SignUp setLoader={setLoader} />}
          />
          <Route
            index
            path="/signin"
            element={<SignIn setLoader={setLoader} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
