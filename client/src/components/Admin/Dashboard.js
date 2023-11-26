import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import "./SideBar.css";
import "./Dashboard.css";

function Dashboard() {
  const [TotalEarnings, setTotalEarnings] = useState(null);
  const [TotalBooks, setTotalBooks] = useState(null);
  const [TotalUsers, setTotalUsers] = useState(null);
  const [TotalRentedBooks, setTotalRentedBooks] = useState(null);
  const [Data, setData] = useState(false);
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "apexchart-example",
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "April",
          "June",
          "July",
          "Aug",
          "Sept",
          "Oct",
          "Nov",
          "Dec",
        ],
        labels: {
          style: {
            colors: Array(12).fill("var(--text-color)"), // Replace with your desired text color
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: ["var(--text-color)"], // Replace with your desired y-axis text color
          },
        },
        lines: {
          show: false,
        },
      },
      grid: {
        borderColor: "#C63D2F",
        clipMarkers: false,
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
    },
    // colors: ["#00BAEC"],
    stroke: {
      width: [4, 4],
      curve: "smooth",
      colors: ["#C63D2F"],
    },
    tooltip: {
      theme: "dark",
    },
    series: [
      {
        name: "series-1",
        data: [330, 430, 345, 150, 449, 60, 70, 91, 100, 240, 570],
      },
    ],
  });
  const [chart2Data, setChart2Data] = useState({
    options: {
      // labels: {
      //     style: {
      //       colors: ["var(--text-color)"], // Replace with your desired text color
      //     },
      //   },
      chart: {
        id: "apexchart-example",
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "April",
          "June",
          "July",
          "Aug",
          "Sept",
          "Oct",
          "Nov",
          "Dec",
        ],
        labels: {
          style: {
            colors: Array(12).fill("var(--text-color)"), // Replace with your desired text color
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: ["var(--text-color)"], // Replace with your desired y-axis text color
          },
        },
        lines: {
          show: false,
        },
      },
      grid: {
        borderColor: "#555",
        clipMarkers: false,
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
    },
    // colors: ["#00BAEC"],
    stroke: {
      width: [4, 4],
      curve: "smooth",
      colors: ["var(--primary-color)"],
    },
    tooltip: {
      theme: "dark",
    },
    series: [
      {
        name: "series-1",
        data: [455, 132, 15, 477, 78, 121, 598, 112, 84, 71, 3],
      },
    ],
  });
  const [chart3Data, setChart3Data] = useState({
    options: {
      // labels: {
      //     style: {
      //       colors: ["var(--text-color)"], // Replace with your desired text color
      //     },
      //   },
      chart: {
        id: "apexchart-example",
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "April",
          "June",
          "July",
          "Aug",
          "Sept",
          "Oct",
          "Nov",
          "Dec",
        ],
        labels: {
          style: {
            colors: Array(12).fill("var(--text-color)"), // Replace with your desired text color
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: ["var(--text-color)"], // Replace with your desired y-axis text color
          },
        },
        lines: {
          show: false,
        },
      },
      grid: {
        borderColor: "#555",
        clipMarkers: false,
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
    },
    // colors: ["#00BAEC"],
    stroke: {
      width: [4, 4],
      curve: "smooth",
      colors: ["var(--primary-color)"],
    },
    tooltip: {
      theme: "dark",
    },
    series: [
      {
        name: "series-1",
        data: [79, 55, 12, 5, 78, 60, 70, 91, 69, 33, 12],
      },
    ],
  });

  const getEarnings = async () => {
    const response = await axios.get("/api/Books/getTotalEarnings");
    if (response.data.success) {
      setTotalEarnings(response.data.totalEarnings);
    }
  };

  const getTotalBooks = async () => {
    const response = await axios.get("/api/Books/getTotalBooks");
    if (response.data.success) {
      setTotalBooks(response.data.totalBooks);
    }
  };
  const getTotalUsers = async () => {
    const response = await axios.get("/api/User/getTotalUsers");
    if (response.data.success) {
      setTotalUsers(response.data.totalUser);
    }
  };
  const getTotalRentedBooks = async () => {
    const response = await axios.get("/api/RentBook/getTotalRentBooks");
    if (response.data.success) {
      setTotalRentedBooks(response.data.totalUser);
    }
  };

  useEffect(() => {
    getEarnings();
    getTotalBooks();
    getTotalRentedBooks();
    getTotalUsers();
  }, []);

  useEffect(() => {
    setData(true);
  }, [TotalBooks, TotalEarnings, TotalUsers, TotalRentedBooks]);

  return (
    <div>
        <h1 className="text-center" style={{padding: "2%" , fontWeight: "bolder"}}>DASHBOARD</h1>
      <div className="row" style={{ padding: "1%" }}>
        <div className="col-md-4 text-center" style={{ paddingLeft: "2%" }}>
          <div
            className=" row"
            style={{
              backgroundColor: "var(--primary-color-light)",
              borderRadius: "10px",
              height: "100%",
              padding: "1%",
            }}
          >
            <h4 className="my-3">Monthly New Users</h4>
            <Chart
              className="text"
              options={chartData.options}
              series={chartData.series}
              type="area"
            />
          </div>
        </div>
        <div className="col-md-4 text-center" style={{ paddingLeft: "2%" }}>
          <div
            className=" row"
            style={{
              backgroundColor: "var(--primary-color-light)",
              borderRadius: "10px",
              height: "100%",
              padding: "1%",
            }}
          >
            <h4 className="my-3">Monthly New Books</h4>
            <Chart
              className="text"
              options={chart2Data.options}
              series={chart2Data.series}
              type="area"
            />
          </div>
        </div>
        <div className="col-md-4 text-center" style={{ paddingLeft: "2%" }}>
          <div
            className=" row"
            style={{
              backgroundColor: "var(--primary-color-light)",
              borderRadius: "10px",
              height: "100%",
              padding: "1%",
            }}
          >
            <h4 className="my-3">Monthly Books Rented</h4>
            <Chart
              className="text"
              options={chart3Data.options}
              series={chart3Data.series}
              type="area"
            />
          </div>
        </div>
      </div>
      {Data && (
        <div className="row" style={{ padding: "1%" }}>
          <div className="col-md-3 justify-content-center align-item-center">
            <div
              className="text-center"
              style={{
                backgroundColor: "var(--primary-color-light)",
                borderRadius: "6px",
                padding: "2%",
                color: "var(--text-color)",
                height: "100%",
                padding: "1%",
              }}
            >
              <h1 style={{padding: "5px"}}>Total Users</h1>
              <h1 className="animate-charcter" id="text">{TotalUsers}</h1>
            </div>
          </div>
          <div className="col-md-3 justify-content-center">
            <div
              className="text-center"
              style={{
                backgroundColor: "var(--primary-color-light)",
                borderRadius: "6px",
                padding: "2%",
                color: "var(--text-color)",
                height: "100%",
                padding: "1%",
              }}
            >
              <h1 style={{padding: "5px"}}>Total Books</h1>
              <h1 className="animate-charcter" id="text">{TotalBooks}</h1>
            </div>
          </div>
          <div className="col-md-3 justify-content-center">
            <div
              className="text-center"
              style={{
                backgroundColor: "var(--primary-color-light)",
                borderRadius: "6px",
                padding: "2%",
                color: "var(--text-color)",
                height: "100%",
                padding: "1%",
              }}
            >
              <h1 style={{padding: "5px"}}>Total Books Rented</h1>
              <h1 className="animate-charcter" id="text">{TotalRentedBooks}</h1>
            </div>
          </div>
          <div className="col-md-3 justify-content-center">
            <div
              className="text-center"
              style={{
                backgroundColor: "var(--primary-color-light)",
                borderRadius: "6px",
                padding: "2%",
                color: "var(--text-color)",
                height: "100%",
                padding: "1%",
              }}
            >
              <h1 style={{padding: "5px"}}>Total Earning</h1>
              <h1 className="animate-charcter" id="text">{TotalEarnings}</h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
