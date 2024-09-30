"use client";
import React, { useEffect, useState } from 'react';
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
      text: 'บุคคลที่ได้รับกระทบ',
      font: {
        size: 18,
        weight: "bold",
      },
      color: "rgba(75, 192, 192, 1)",
    },
  },
};

export async function getData() {
  const res = await fetch('http://localhost/project-y2-term1/api/victims4/');
  if (!res.ok) {
    throw new Error("Failed to get data");
  }
  return res.json();
}

export function BarChartVictims2() {
  const [data, setData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    async function fetchData() {
      const jsonData = await getData();
      console.log(jsonData);

      const Gender = [
        'Male', 
        'Female'
      ];

      const years = [...new Set(jsonData.map(item => item.Year))];

      const datasets = Gender.map((Impact, index) => {
        
        let backgroundColor, borderColor;
        switch (Impact) {
          case 'Female':
            backgroundColor = 'rgba(255, 105, 180, 0.5)'; 
            borderColor = 'rgba(255, 105, 180, 1)';
            break;
          default:
            backgroundColor = `rgba(${(index * 30) % 255}, 99, 132, 0.5)`;
            borderColor = `rgba(${(index * 30) % 255}, 99, 132, 1)`;
        }

        return {
          label: Impact,
          data: years.map(year => {
            const filtered = jsonData.filter(item => item.Year === year && item.Gender === Impact);
            return filtered.length > 0 ? filtered[0].Victims : 0;
          }),
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderWidth: 1,
        };
      });

      setData({
        labels: years,
        datasets: datasets,
      });
    }

    fetchData();
  }, []);

  return <Bar options={options} data={data} />;
}
