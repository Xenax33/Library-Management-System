import React, { useEffect, useState } from "react";
import axios from "axios";

function Customers() {
  const [SearchEmail, setSearchEmail] = useState("");
  const [NoOfOrders, setNoOfOrders] = useState({ _id: "", Orders: 0 });
  const [TotalPurchase, setTotalPurchase] = useState({ _id: "", Total: 0 });
  const [Customers, setCustomers] = useState([]);
  let filteredCustomers = null;

  const getData = async () => {
    try {
      const response = await axios.get("/api/Order/getcustomers");
      if (response.data.success) {
        const transformedData = response.data.data.map((customer) => {
          // Assuming the 'Orders' property of each customer contains the array of orders
          // If it's named differently, make sure to adjust it here
          const orders = customer.Orders;
          // Now, you have the orders associated with this customer
          // You can perform any additional processing on 'orders' if needed
  
          return {
            ...customer,
            Orders: orders, // Setting the 'Orders' property to the array of orders
          };
        });
        setCustomers(transformedData);
      }
    } catch (error) {
      console.error(error);
      // Handle the error if needed
    }
  };

  const getTotal=(array) =>
  {
    let Total= 0;
    array.map((index) =>
    {
      Total = Total + index.Total
    })
    return Total
  }

  useEffect(() => {
    getData();
  }, []);

  const onSearchChange = (e) => {
    setSearchEmail(e.target.value);
  };

  const getDate = (date)=>
  {
    const dateObject = new Date(date) ; // Replace this with the Date object you retrieved from the database
    const dateOnly = dateObject.toISOString().split('T')[0];
    console.log(dateObject)
    return dateOnly
  };
  
  if (Customers) {
    filteredCustomers = Customers.filter((customer) => {
      return customer.email.toLowerCase().includes(SearchEmail.toLowerCase());
    });
  }


  return (
    <>
      <div className="text-center">
        <h1>Customers</h1>
      </div>
      <div className="my-5">
        <div className="container mt-5 px-2">
          <div className="mb-2 d-flex justify-content-between align-items-center">
            <div className="Search-box">
              <div className="flex">
                <i className="bx bx-search icon"></i>
                <input
                  type="text"
                  placeholder="Search Email..."
                  onChange={onSearchChange}
                  autoComplete="new-password"
                />
              </div>
            </div>

            <div className="px-2">
              <h5>Filters</h5>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-responsive table-borderless">
              <thead>
                <tr className="bg text">
                  <th className="text-center" scope="col">
                    Email
                  </th>
                  <th scope="col">Username</th>
                  <th scope="col">Registration Date</th>
                  <th scope="col">No of Orders</th>
                  <th scope="col">Total Purchasing</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers &&
                  filteredCustomers.map((customer) => (
                    <tr className="text" key={customer._id}>
                      <td>
                        <img
                          className="mx-3"
                          src={customer.Image}
                          width={30}
                          height={30}
                          alt="Logo"
                        />
                        {customer.email}
                      </td>
                      <td>{customer.username}</td>
                      <td>{getDate(customer.Date)}</td>
                      <td>{customer.Orders.length}</td>
                      <td>{getTotal(customer.Orders)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Customers;
