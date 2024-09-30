"use client";
import React, { useEffect } from 'react';
import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'จำนวนผู้คนในแต่ละช่วงอายุที่ได้รับผลกระทบในแต่ละปี',
      font: {
        size: 18,
        weight: "bold",
      },
      color: "rgba(75, 192, 192, 1)",
    },
  },
};

export async function getData() {
  const res = await fetch('http://localhost/project-y2-term1/api/victims2/');
  if (!res.ok) {
    throw new Error("Failed to get data");
  }
  return res.json();
}

export function BarChartVictims() {
  const [data, setData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    async function fetchData() {
      const jsonData = await getData();
      console.log(jsonData);

      const ageRanges = [
        '0-10', '11-20', '21-30', '31-40',
        '41-50', '51-60', '61-70', '71-80'
      ];

      const years = [...new Set(jsonData.map(item => item.Year))];

      const datasets = ageRanges.map((range, index) => ({
        label: range,
        data: years.map(year => {
          const filtered = jsonData.filter(item => item.Year === year && item.AgeRange === range);
          return filtered.length > 0 ? filtered[0].Total_Death : 0;
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

  return <Bar options={options} data={data} />;
}
