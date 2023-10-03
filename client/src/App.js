import "./App.css";
import React, { useState } from "react";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import SignUp from "./components/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Spinner from "./components/Spinner";
import Products from "./components/Admin/Products";
import ProductList from "./components/Customer/Products";
import Customers from "./components/Admin/Customers";
import Cart from "./components/Customer/Cart";
import History from "./components/Customer/History";
import Dashboard from "./components/Admin/Dashboard";

function App() {
  const [cart, setCart] = useState([]);
  const [User, setUser] = useState(null);

  const deleteOrder = (name) => {
    const updatedCart = cart.filter((product) => product.Name !== name);
    setCart(updatedCart);
  };
  
  const ChangeBuy = (name, value) => {
    const updatedCart = cart.map((product) => {
      if (product.Name === name) {
        // Create a new object with the updated Buy value
        return { ...product, Buy: value };
      }
      // For other products, keep them unchanged
      return product;
    });

    // Set the updated cart state
    setCart(updatedCart);
  };


  // Function to add products to the cart
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const setCartToNull = () => {
    setCart([]);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Login setUser= {setUser}/>} />
          <Route index path="/signup" element={<SignUp />} />

          <Route
            path="/dashboard"
            element={<Sidebar setCartToNull={setCartToNull} />}
          >
            <Route index path="customers" element={<Customers />} />
            <Route index path="dashboard" element={<Dashboard />} />
            <Route index path="products" element={<Products />} />
            <Route
              index
              path="productlist"
              element={<ProductList onAddToCart={addToCart}  cartItems={cart}/>}
            />
            <Route index path="cart" User = {User} element={<Cart cartItems={cart}  ChangeBuy = {ChangeBuy}  deleteOrder = {deleteOrder} setCartToNull={setCartToNull}/>} />
            <Route index path="history" User = {User} element={<History/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
