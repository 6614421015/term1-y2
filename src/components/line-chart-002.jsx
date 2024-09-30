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
      text: "เหตุที่เกิดขึ้นในแต่ละครั้ง",
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
      radius: 6,
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
  const res = await fetch("http://localhost/project-y2-term1/api/victims5/");
  if (!res.ok) {
    throw new Error("Failed to get data");
  }
  return res.json();
}

export function LineChart002() {
  const [data, setData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    async function fetchData() {
      const jsonData = await getData();
      console.log(jsonData);
  

      const filteredData = jsonData.filter(item => item.Cause !== null && item.Impact !== null);
  
      const causes = [...new Set(filteredData.map(item => item.Cause))];
      const years = [...new Set(filteredData.map(item => item.Year))];
  
      const datasets = causes.map((cause, index) => ({
        label: cause,
        data: years.map(year => {
          const filtered = filteredData.filter(item => item.Year === year && item.Cause === cause);
          return filtered.length > 0 ? filtered[0].Impact : 0;
        }),
        backgroundColor: `rgba(${(index * 30) % 255}, 99, 132, 0.5)`,
        borderColor: `rgba(${(index * 30) % 255}, 99, 132, 1)`,
        borderWidth: 1,
      }));
  
      setData({
        labels: years,
        datasets: datasets,
      });
    }
  
    fetchData();
  }, []);
  

  return <Line options={options} data={data} />;
}
