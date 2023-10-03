import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../Spinner";
axios.defaults.baseURL = "http://localhost:8081";

function Products() {
  const [Products, setProducts] = useState([]);
  const [FilteredProducts, setFilteredProducts] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [SearchEmail, setSearchEmail] = useState("");
  const [Categories, setCategories] = useState([]);
  const [Modal, setModal] = useState(true);
  const [EditModal, setEditModal] = useState(true);
  const [Product, setProduct] = useState({
    Name: "",
    Price: 1,
    Quantity: 0,
    Image: "",
    CategoryId: "",
    BuyPrice: 0
    });
  const [EditProduct, setEditProduct] = useState({
    Name: "",
    Price: 1,
    Quantity: 0,
    Image: "",
    CategoryId: "",
    BuyPrice: 0,
  });

  let filteredProducts = null;

  const handleEdit = (product) => {
    setEditProduct({
      Name: product.Name,
      Price: product.Price,
      Quantity: product.Quantity,
      CategoryId: product.CategoryId,
      Image: product.Image,
      BuyPrice :product.BuyPrice
    });
    setEditModal(true);
  };

  const handleDelete = (productId) => {
    const data = axios.delete("/api/Product/delete/" + productId);
    console.log(data);
    alert("Product Deleted Successfully");
    getData();
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
    getData();
    getCategories();
  }, []);

  const onSearchChange = (e) => {
    setSearchEmail(e.target.value);
  };

  const AddProduct = () => {
    setModal(true);
  };

  const CloseModal = async () => {
    const data = await axios.post("/api/Product/create", Product);
    if (data.success) {
      setModal(false);
      getData();
      setProduct({
        Name: "",
        Price: 1,
        Quantity: 0,
        Image: "",
        CategoryId: "",
        BuyPrice:1
      });
    }
    getData();
  };

  const CloseEditModal = async () => {
    const data = await axios.put("api/Product/updateafterorder", EditProduct);
    if (data.success) {
      setEditModal(false);
      getData();
      setEditModal({
        Name: "",
        Price: 1,
        Quantity: 0,
        Image: "",
        CategoryId: "",
      });
    }
    getData();
  };

  if (Products) {
    filteredProducts = Products.filter((customer) => {
      return customer.Name.toLowerCase().includes(SearchEmail.toLowerCase());
    });
  }

  const onchange = (e) => {
    setProduct({ ...Product, [e.target.name]: e.target.value });
  };

  const onEditchange = (e) => {
    setEditProduct({ ...EditProduct, [e.target.name]: e.target.value });
  };

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

  //CODE FOR IMAGE UPLOAD
  const processFile = async (e) => {
    await setLoading(true);
    var file = e.target.files[0];

    // Set your cloud name and unsigned upload preset here:
    var YOUR_CLOUD_NAME = "djiqxvcin";
    var YOUR_UNSIGNED_UPLOAD_PRESET = "e5jxkzj0";

    var POST_URL =
      "https://api.cloudinary.com/v1_1/" + YOUR_CLOUD_NAME + "/auto/upload";

    var XUniqueUploadId = +new Date();

    processFile();

    function processFile(e) {
      var size = file.size;
      var sliceSize = 20000000;
      var start = 0;

      setTimeout(loop, 3);

      function loop() {
        var end = start + sliceSize;

        if (end > size) {
          end = size;
        }
        var s = slice(file, start, end);
        send(s, start, end - 1, size);
        if (end < size) {
          start += sliceSize;
          setTimeout(loop, 3);
        }
      }
    }

    function send(piece, start, end, size) {
      var formdata = new FormData();

      formdata.append("file", piece);
      formdata.append("cloud_name", YOUR_CLOUD_NAME);
      formdata.append("upload_preset", YOUR_UNSIGNED_UPLOAD_PRESET);

      var xhr = new XMLHttpRequest();
      xhr.open("POST", POST_URL, false);
      xhr.setRequestHeader("X-Unique-Upload-Id", XUniqueUploadId);
      xhr.setRequestHeader(
        "Content-Range",
        "bytes " + start + "-" + end + "/" + size
      );

      setLoading(true);
      xhr.onload = function () {
        // do something to response
        const jsonString = this.responseText; // Your JSON data as a string
        const responseObject = JSON.parse(jsonString);
        const urlData = responseObject.url;
        setProduct({ ...Product, Image: urlData });
        if (EditModal) {
          setEditProduct({ ...EditProduct, Image: urlData });
        }
      };

      xhr.send(formdata);
    }

    function slice(file, start, end) {
      var slice = file.mozSlice
        ? file.mozSlice
        : file.webkitSlice
        ? file.webkitSlice
        : file.slice
        ? file.slice
        : noop;

      return slice.bind(file)(start, end);
    }

    function noop() {}
    setLoading(false);
  };
  //end

  return (
    <>
      {/* {Loading && <Spinner dark={true} />} */}
      <div className="text-center">
        <h1>Products</h1>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          className="button"
          type="button"
          data-bs-toggle={Modal ? "modal" : ""}
          data-bs-target={Modal ? "#staticBackdrop" : ""}
          onClick={AddProduct}
        >
          Add Product
        </button>
      </div>
      <div className="my-5">
        <div className="container mt-5 px-2">
          <div className="mb-2 d-flex justify-content-between align-items-center">
            <div className="Search-box">
              <div className="flex">
                <i className="bx bx-search icon"></i>
                <input
                  type="text"
                  className="input"
                  placeholder="Search Products..."
                  onChange={onSearchChange}
                  autoComplete="new-password"
                />
              </div>
            </div>
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
                    className="button"
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
                        className="button"
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
          <div className="table-responsive">
            <table className="table table-responsive table-borderless">
              <thead>
                <tr className="bg text">
                  <th className="text-center" scope="col">
                    Name
                  </th>
                  <th scope="col">Buy Price</th>
                  <th scope="col">Price</th>
                  <th scope="col">Stock Available</th>
                  <th scope="col">Category</th>
                  <th scope="col">Total Sold</th>
                  <th scope="col">Total Revenue</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts &&
                  filteredProducts.map((product) => (
                    <React.Fragment key={product._id}>
                      <tr className="text" key={product._id}>
                        <td>
                          <img
                            className="mx-3"
                            src={product.Image}
                            width={30}
                            height={30}
                            alt="Logo"
                          />
                          {product.Name}
                        </td>
                        <td>{product.BuyPrice}</td>
                        <td>{product.Price}</td>
                        <td>{product.Quantity}</td>
                        <td>{product.CategoryId}</td>
                        <td>{product.TotalSold}</td>
                        <td>{product.TotalRevenue}</td>
                        <td>
                          <div className="btn-group" role="group">
                            {/* Add a circular button that opens the dropdown */}
                            <button
                              className="button"
                              id="btnGroupDrop2"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              {/* You can use any icon for the button */}
                              <i>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                >
                                  <g style={{ fill: "var(--toggle-color)" }}>
                                    <circle cx="10" cy="15" r="2" />
                                    <circle cx="10" cy="10" r="2" />
                                    <circle cx="10" cy="5" r="2" />
                                  </g>
                                </svg>
                              </i>
                            </button>
                            <ul
                              className="dropdown-menu"
                              aria-labelledby="btnGroupDrop1"
                            >
                              <li>
                                <button
                                  className="button btn-sm"
                                  style={{
                                    width: "100%",
                                    textAlign: "center",
                                    border: "none",
                                    borderRadius: "0",
                                    padding: "0.5rem 1rem",
                                    backgroundColor: "transparent",
                                    color: "#383838",
                                  }}
                                  data-bs-toggle={Modal ? "modal" : ""}
                                  data-bs-target={
                                    Modal ? "#staticBackdrop1" : ""
                                  }
                                  onClick={() => {
                                    handleEdit(product);
                                  }}
                                >
                                  <i className="bx bx-edit me-2"></i>
                                  Edit
                                </button>
                              </li>
                              <li>
                                <button
                                  className="button btn-sm"
                                  onClick={() => {
                                    handleDelete(product._id);
                                  }}
                                  style={{
                                    width: "100%",
                                    textAlign: "center",
                                    border: "none",
                                    borderRadius: "0",
                                    padding: "0.5rem 1rem",
                                    backgroundColor: "transparent",
                                    color: "#383838",
                                  }}
                                >
                                  <i
                                    className="bx bx-trash me-2"
                                    style={{ color: "red" }}
                                  ></i>
                                  Delete
                                </button>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
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
                <h5 className="modal-title" id="staticBackdropLabel">
                  ADD PRODUCT
                </h5>
              </div>

              <div className="modal-body">
                <div className="row">
                  <div className="col">
                    <input
                      type="text"
                      name="Name"
                      className="input form-control form-control-lg"
                      placeholder="Name..."
                      onChange={onchange}
                    />{" "}
                  </div>
                  <div className="col">
                    <input
                      type="number"
                      name="Price"
                      className="input form-control form-control-lg"
                      placeholder="Price in Rs..."
                      min={1}
                      onChange={onchange}
                    />{" "}
                  </div>
                </div>
                <div className="row my-3">
                  <div className="col">
                    <input
                      type="number"
                      name="Quantity"
                      className="input form-control form-control-lg"
                      placeholder="Quantity..."
                      onChange={onchange}
                    />{" "}
                  </div>
                  <div className="col">
                    <input
                      className="form-control form-control-lg input"
                      id="formFileSm"
                      type="file"
                      accept="image/*"
                      placeholder="Image..."
                      onChange={processFile}
                    />{" "}
                  </div>
                </div>
                <div className="row my-3">
                  <div className="col">
                  <input
                      type="number"
                      name="BuyPrice"
                      className="input form-control form-control-lg"
                      placeholder="Buy price in Rs..."
                      min={1}
                      onChange={onchange}
                    />{" "}
                  </div>
                  <div className="col">
                    <select
                      name="CategoryId"
                      id="inputState"
                      className="form-select input"
                      onChange={onchange}
                    >
                      <option selected> Category...</option>
                      {Categories &&
                        Categories.map((categories) => (
                          <option key={categories._id} value={categories.Name}>
                            {categories.Name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="button"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="button"
                  data-bs-dismiss="modal"
                  onClick={CloseModal}
                >
                  Let's Start.
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*EDIT MODAL*/}
      <div className="text-center ">
        <div
          className="modal fade"
          id="staticBackdrop1"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content" style={{ borderRadius: "10px" }}>
              <div className="modal-header d-flex justify-content-center">
                <h5 className="modal-title" id="staticBackdropLabel">
                  EDIT PRODUCT
                </h5>
              </div>

              <div className="modal-body">
                <div className="row">
                  <div className="col">
                    <input
                      type="text"
                      name="Name"
                      className="input form-control form-control-lg"
                      value={EditProduct.Name}
                      onChange={onEditchange}
                    />{" "}
                  </div>
                  <div className="col">
                    <input
                      type="number"
                      name="Price"
                      value={EditProduct.Price}
                      className="input form-control form-control-lg"
                      placeholder="Price in Rs..."
                      min={1}
                      onChange={onEditchange}
                    />{" "}
                  </div>
                </div>
                <div className="row my-3">
                  <div className="col">
                    <input
                      type="number"
                      name="Quantity"
                      className="input form-control form-control-lg"
                      placeholder="Quantity..."
                      value={EditProduct.Quantity}
                      onChange={onEditchange}
                    />{" "}
                  </div>
                  <div className="col">
                    <input
                      className="form-control form-control-lg input"
                      id="formFileSm"
                      type="file"
                      accept="image/*"
                      placeholder="Image..."
                      onChange={processFile}
                    />{" "}
                  </div>
                </div>
                <div className="row my-3">
                  <div className="col">
                  <input
                      type="number"
                      name="BuyPrice"
                      className="input form-control form-control-lg"
                      placeholder="Buy price in Rs..."
                      min={1}
                      onChange={onEditchange}
                      value = {EditProduct.BuyPrice}
                    />{" "}
                  </div>
                  <div className="col">
                    <select
                      name="CategoryId"
                      id="inputState"
                      className="form-select input"
                      onChange={onEditchange}
                    >
                      <option selected> Category...</option>
                      {Categories &&
                        Categories.map((categories) => (
                          <option
                            key={categories._id}
                            value={categories.Name}
                            selected={
                              categories.Name === EditProduct.CategoryId
                            }
                          >
                            {categories.Name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="button"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="button"
                  data-bs-dismiss="modal"
                  onClick={CloseEditModal}
                >
                  Let's Start.
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
