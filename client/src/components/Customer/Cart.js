import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";

function Cart({ cartItems, ChangeBuy, deleteOrder,setCartToNull }) {
  const [Total, setTotal] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));
  // const [Order , setOrder] = useState(null);

  const Payment = () => {
    cartItems.map(async (order) => {
      const updatedOrder = {
        Name: order.Name,
        Quantity: order.Quantity - order.Buy,
        TotalSold: order.Buy,
        TotalRevenue: order.Buy * (order.Price - order.BuyPrice),
      };
      const Order = {
        BuyerId : user._id,
        ProductName : order.Name,
        Price : order.Price,
        Quantity : order.Buy
      }
      const response = await axios.put("/api/Product/updateafterorder" , updatedOrder);
      const data = await axios.post("/api/Order/create" , Order)
    });
    alert("Payment Completed")
    setCartToNull();
  };

  const getTotal = () => {
    const total = cartItems.reduce((accumulator, product) => {
      const productTotal = product.Price * product.Buy;
      return accumulator + productTotal;
    }, 0);

    setTotal(total);
  };
  useEffect(() => {
    getTotal();
  }, [cartItems]);

  const handleIncreaseQuantity = (product) => {
    // Call the parent component's function to increase the quantity
    if (product.Quantity > product.Buy) {
      ChangeBuy(product.Name, product.Buy + 1);
    }
  };

  const handleDecreaseQuantity = (product) => {
    // Call the parent component's function to decrease the quantity
    if (product.Buy > 1) {
      ChangeBuy(product.Name, product.Buy - 1);
      console.log(cartItems);
    }
  };
  return (
    <div className="container h-100 py-5">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-10">
          <div className="d-flex justify-content-between align-items-center mb-4 text">
            <h3 className="fw-normal mb-0 text-black text-center text">
              Shopping Cart
            </h3>
          </div>

          {cartItems &&
            cartItems.map((product) => (
              <div className="card rounded-3 mb-4">
                <div className="card-body p-4">
                  <div className="row d-flex justify-content-between align-items-center">
                    <div className="col-md-2 col-lg-2 col-xl-2">
                      <img
                        src={product.Image}
                        className="img-fluid rounded-3"
                        alt="Cotton T-shirt"
                      />
                    </div>
                    <div className="col-md-3 col-lg-3 col-xl-3">
                      <h4 className="lead fw-normal mb-2">
                        {product.Category}
                      </h4>
                      <h4>
                        <span>{product.Name}</span>{" "}
                      </h4>
                    </div>
                    <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                      <button
                        className="button"
                        onClick={() => {
                          handleDecreaseQuantity(product);
                        }}
                      >
                        -
                      </button>
                      <input
                        id="form1"
                        value={product.Buy}
                        min={0}
                        name="quantity"
                        className="form-control input mx-3"
                        style={{ width: "55px" }}
                      />
                      <button
                        className="button"
                        onClick={() => {
                          handleIncreaseQuantity(product);
                        }}
                      >
                        +
                      </button>
                    </div>
                    <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                      <h5 className="mb-0">
                        Price: {product.Price * product.Buy}
                      </h5>
                    </div>
                    <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                      <Icon
                        className="iconn"
                        icon="line-md:menu-to-close-transition"
                        width="50"
                        height="50"
                        onClick={() => {
                          deleteOrder(product.Name);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}

          <div className="card">
            <div className="card-body d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Total Bill: {Total}</h4>
              <button
                type="button"
                className=" btn-lg button"
                onClick={Payment}
              >
                {cartItems.length === 0 ? "Cart is empty" : "Proceed to Pay"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
