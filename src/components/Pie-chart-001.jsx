"use client";
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

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
      text: "จำนวนผู้ที่ตกเป็นเหยื่อในแต่ละสีผิว",
      font: {
        size: 18,
        weight: "bold",
      },
      color: "rgba(75, 192, 192, 1)",
    },
  },
};

export async function getData() {
  const res = await fetch("http://localhost/project-y2-term1/api/victims3/");
  if (!res.ok) {
    throw new Error("Failed to get data");
  }
  return res.json();
}

export function PieChart() {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "จำนวนผู้ที่ตกเป็นเหยื่อ",
        data: [],
        backgroundColor: [
          "rgba(0, 0, 0, 0.5)",
          "rgba(255, 255, 255, 0.5)",
          "rgba(255, 206, 86, 0.5)",
        ],
      },
    ],
  });

  useEffect(() => {
    async function fetchData() {
      const jsonData = await getData();
      console.log(jsonData);
      setData({
        labels: jsonData.map((item) => item.Skin),
        datasets: [
          {
            label: "จำนวนผู้ที่ตกเป็นเหยื่อ",
            data: jsonData.map((item) => item.Victims),
            backgroundColor: [
              "rgba(0, 0, 0, 0.5)",
              "rgba(255, 255, 255, 0.1)",
              "rgba(255, 206, 86, 0.5)",
            ],
          },
        ],
      });
    }
    fetchData();
  }, []);

  return <Pie options={options} data={data} />;
}
