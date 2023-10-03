import React, { useState, useEffect } from "react";
import axios from "axios";

function History(User) {
  const [Orders, setOrders] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const getData = async () => {
    try {
      const response = await axios.get("/api/Order/getorders/" + user._id);
      if (response.data.success) {
        setOrders(response.data.data);
      }
    } catch (error) {
      console.error(error);
      // Handle the error if needed
    }
  };

  useEffect(() => {
    console.log(user);
    getData();
  }, []);

  const getDate = (date) => {
    const dateObject = new Date(date); // Replace this with the Date object you retrieved from the database
    const dateOnly = dateObject.toISOString().split("T")[0];
    return dateOnly;
  };

  return (
    <>
    <h1 className="text-center my-3" >History</h1>
      <div className="container">
        {Orders &&
          Orders.map((order) => (
            <div className="card rounded-3 mb-4" key={order._id}>
              <div className="card-body p-4">
                <div className="row align-items-center">
                  <div className="col-md-2 col-lg-2 col-xl-2">
                    <img
                      src={order.Image}
                      className="img-fluid rounded-3"
                      alt="Cotton T-shirt"
                    />
                  </div>
                  <div className="col-md-2 col-lg-2 col-xl-2">
                    <h4 className="mb-0">{order.ProductName}</h4>
                  </div>
                  <div className="col-md-2 col-lg-2 col-xl-2">
                    <h5 className="mb-0">Quantity: {order.Quantity}</h5>
                  </div>
                  <div className="col-md-2 col-lg-2 col-xl-2">
                    <h5 className="mb-0">Price: {order.Price}</h5>
                  </div>
                  <div className="col-md-2 col-lg-2 col-xl-2">
                    <h5 className="mb-0">Total: {order.Total}</h5>
                  </div>
                  <div className="col-md-2 col-lg-2 col-xl-2 text-end">
                    <h5 className="mb-0">Date: {getDate(order.OrderedAt)}</h5>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default History;
