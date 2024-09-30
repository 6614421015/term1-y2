"use client";
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        font: {
          size: 14,
        },
        color: "rgba(54, 162, 235, 1)",
      },
    },
    title: {
      display: true,
      text: "จำนวนผู้คนที่ตกเป็นเหยื่อในเหตุการณ์อาชญกรรมในแต่ละปีของ Chicago",
      font: {
        size: 18,
        weight: "bold",
      },
      color: "rgba(75, 192, 192, 1)",
    },
  },
  scales: {
    x: {
      ticks: {
        color: "rgba(75, 192, 192, 1)",
      },
    },
    y: {
      ticks: {
        color: "rgba(255, 99, 132, 1)", 
      },
      beginAtZero: true,
    },
  },
  elements: {
    point: {
      radius: 6, //
      backgroundColor: "rgba(54, 162, 235, 1)",
      borderColor: "rgba(255, 159, 64, 1)",
      hoverRadius: 8,
      hoverBackgroundColor: "rgba(255, 159, 64, 1)",
    },
    line: {
      tension: 0.4,
      borderWidth: 3,
    },
  },
};

export async function getData() {
  const res = await fetch("http://localhost/project-y2-term1/api/victims/");
  if (!res.ok) {
    throw new Error("Failed to get data");
  }
  return res.json();
}

export function LineChart001() {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "จำนวนผู้ที่ได้รับผลกระทบ",
        data: [],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        fill: true,
      },
    ],
  });

  useEffect(() => {
    async function fetchData() {
      const jsonData = await getData();
      console.log(jsonData);
      setData({
        labels: jsonData.map((item) => item.Year),
        datasets: [
          {
            label: "จำนวนผู้ที่ได้รับผลกระทบ",
            data: jsonData.map((item) => item.Total_Victims),
            borderColor: "rgba(54, 162, 235, 1)",
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            pointBackgroundColor: "rgba(255, 99, 132, 1)",
            pointBorderColor: "rgba(54, 162, 235, 1)",
            fill: true,
          },
        ],
      });
    }
    fetchData();
  }, []);

  return <Line options={options} data={data} />;
}
