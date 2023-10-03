import React, { useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";

function Dashboard() {
  // State variables to manage chart data
  const [chartData, setChartData] = useState({
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
            show: false
          }
      },
        grid: {
    borderColor: "#555",
    clipMarkers: false,
    yaxis: {
      lines: {
        show: false
      }
    }
  },
    },
    // colors: ["#00BAEC"],
    stroke: {
      width: [4, 4],
      curve: "smooth",
      colors: ["var(--primary-color)"]
    },
    tooltip: {
        theme: "dark"
      },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91, 0, 0, 0],
      },
    ],
  });

  return (
    <>
      <h1 className="my-3 text-center">Dashboard</h1>
      <div className=" container row text-center">
        <div
          className="col-md-5 row container"
          style={{
            backgroundColor: "var(--primary-color-light)",
            borderRadius: "10px",
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
        <div className="col-md-4"></div>
      </div>
    </>
  );
}

export default Dashboard;
