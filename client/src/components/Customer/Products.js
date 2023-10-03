import React, { useEffect, useState, useRef } from "react";
import "./Products.css";
import axios from "axios";
import { CSSTransition } from "react-transition-group";

function Products({ onAddToCart, cartItems }) {
  const [Products, setProducts] = useState([]);
  const [FilteredProducts, setFilteredProducts] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [SearchProduct, setSearchProduct] = useState("");
  const [Cart, setCart] = useState([]);
  const [Order, setOrder] = useState({
    Name: "",
    Image: "",
    Category: "",
    Price: 0,
    Quantity: 0,
    Buy: 0,
    BuyPrice :0
  });
  const [Modal, setModal] = useState(true);

  let filteredProducts = null;

  const openModal = (product) => {
    const isProductInCart = Cart.some((item) => item.Name === product.Name);
    if (!isProductInCart) {
      setModal(true);
      setOrder({
        Name: product.Name,
        Price: product.Price,
        Quantity: product.Quantity,
        Image: product.Image,
        Category: product.CategoryId,
        BuyPrice : product.BuyPrice
      });
    } else {
      alert("Product is already in cart");
      setModal(false);
    }
  };

  const UpdateProducts = (name, num) => {
    parseInt(num, 10);
    if (filteredProducts) {
      const updatedProducts = filteredProducts.map((product) => {
        if (product.Name === name) {
          // Deduct the specified quantity from the product's Quantity
          const updatedQuantity = Math.max(product.Quantity - num, 0); // Ensure the quantity doesn't go below zero
          return { ...product, Quantity: updatedQuantity };
        }
        return product;
      });

      // Update the filteredProducts array with the updated products
      filteredProducts = updatedProducts;
    }
  };

  const AddToCart = async () => {
    if (Order.Buy > Order.Quantity) {
      alert("Cannot buy more than the available quantity");
    } else {
      if (
        Order.Name &&
        Order.Image &&
        Order.Price &&
        Order.Quantity &&
        Order.Buy > 0
      ) {
        setCart((prevCart) => [...prevCart, Order]);
        onAddToCart(Order);
        await UpdateProducts(Order.Name, Order.Buy);
        setOrder({
          Name: "",
          Image: "",
          Price: 0,
          Quantity: 0,
          Buy: 0,
          Category: "",
          BuyPrice:0
        });
        setModal(false);
      }
    }
  };

  const getData = async () => {
    try {
      const response = await axios.get("/api/Product/getProducts");
      if (response.data.success) {
        setProducts(response.data.data);
        setFilteredProducts(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios.get("/api/Product/getCategories");
      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    setCart(cartItems);
    getData();
    getCategories();
  }, []);

  const filterProducts = (category) => {
    if (category === "All") {
      setProducts(FilteredProducts);
    } else {
      for (let i = 0; i < FilteredProducts.length; i++) {
        if (FilteredProducts[i].CategoryId === category) {
          const filteredProductsByCategory = FilteredProducts.filter(
            (product) => product.CategoryId === category
          );
          setProducts(filteredProductsByCategory);
        }
      }
    }
  };

  const onSearchChange = (e) => {
    setSearchProduct(e.target.value);
  };

  if (Products) {
    filteredProducts = Products.filter((customer) => {
      return customer.Name.toLowerCase().includes(SearchProduct.toLowerCase());
    });
  }

  return (
    <body>
      <div className="text-center text">
        <h1>Products</h1>
      </div>
      <div
        className="search-box-container quantity my-3"
        style={{ width: "100%" }}
      >
        <input
          type="text"
          className="input"
          placeholder="Search Products..."
          style={{ width: "80%" }}
          onChange={onSearchChange}
        />
        <div className="btn-group" role="group">
          <button
            className="button"
            id="btnGroupDrop1"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <div className="px-2 d-flex align-items-center">
              <i className="bx bx-filter me-2"></i>
              <h5 className="mb-0">Categories</h5>
            </div>
          </button>
          <ul
            className="dropdown-menu"
            aria-labelledby="btnGroupDrop1"
            style={{ width: "190px" }}
          >
            <li>
              <button
                className="button dropdown-item"
                style={{
                  width: "100%",
                  textAlign: "center",
                  border: "none",
                  borderRadius: "0",
                  padding: "0.5rem 1rem",
                  backgroundColor: "transparent",
                  color: "#383838",
                }}
                onClick={() => filterProducts("All")}
              >
                All
              </button>
            </li>
            {Categories &&
              Categories.map((category) => (
                <li>
                  <button
                    className="button dropdown-item" // Add the "dropdown-item" class here
                    style={{
                      width: "100%",
                      textAlign: "center",
                      border: "none",
                      borderRadius: "0",
                      padding: "0.5rem 1rem",
                      backgroundColor: "transparent",
                      color: "#383838",
                    }}
                    onClick={() => filterProducts(category.Name)}
                  >
                    {category.Name}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className="row">
        {filteredProducts &&
          filteredProducts.map(
            (product) =>
              product.Quantity > 0 && (
                <div className="col-lg-3">
                  <div className="card" style={{ borderRadius: "10px" }}>
                    <div
                      className="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
                      data-mdb-ripple-color="light"
                    >
                      <img src={product.Image} className="w-100" />
                    </div>
                    <div className="card-body text text-center">
                      <div className="text-reset">
                        <h5 className="card-title mb-3">{product.Name}</h5>
                      </div>
                      <div className="text-reset">
                        <p>Category : {product.CategoryId}</p>
                      </div>
                      <h6 className="mb-3 text-reset">
                        Price: {product.Price}
                      </h6>
                      <p className="my-3 flex text-reset">
                        Available Quantity: {product.Quantity}
                      </p>

                      <div className="card-body">
                        <div className=" row">
                          <button
                            className="button"
                            type="button"
                            id="add-to-cart-button"
                            onClick={() => openModal(product)}
                            data-bs-toggle={Modal ? "modal" : ""}
                            data-bs-target={Modal ? "#staticBackdrop" : ""}
                          >
                            <i className="bx bxs-cart icon"></i>
                            {"    "}
                            BUY
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
          )}
      </div>
      {Modal &&  (
        <div className="text-center ">
          <div
            className="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content" style={{ borderRadius: "10px" }}>
                <div className="modal-header d-flex justify-content-center">
                  <div
                    className="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
                    data-mdb-ripple-color="light"
                  >
                    <img
                      src={Order.Image}
                      style={{ width: "250px", height: "250px" }}
                    />
                  </div>
                </div>

                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6 text">
                      <h4>
                        Name: <p>{Order.Name}</p>
                      </h4>
                    </div>
                    <div className="col-md-6 text">
                      <h4>
                        Price: <p>{Order.Price}</p>
                      </h4>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6 text">
                      <h4>
                        Available: <p>{Order.Quantity}</p>
                      </h4>
                    </div>
                    <div className="col-md-3"></div>
                  </div>
                </div>
                <div className="modal-footer">
                  <div className="row input quantity d-flex">
                    <input
                      type="number"
                      placeholder="Quantity"
                      aria-label="Quantity"
                      aria-describedby="add-to-cart-button"
                      min={0}
                      max={Order.Quantity}
                      onChange={(e) => {
                        setOrder({
                          ...Order,
                          Buy: parseInt(e.target.value, 10),
                        });
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    className="button"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      setOrder({
                        Name: "",
                        Image: "",
                        Price: 0,
                        Quantity: 0,
                        Buy: 0,
                        Category: "",
                        BuyPrice:0
                      });
                    }}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="button"
                    onClick={AddToCart}
                    data-bs-dismiss="modal"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </body>
  );
}

export default Products;
