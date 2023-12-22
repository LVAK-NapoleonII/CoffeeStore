import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const ChartComponent = (props) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // Declare chartInstance as a ref

  const { data=[] } = props;

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

   
      const labels = ['Trà', 'Cà phê', 'Đá xay'];
      const data = [10, 20, 30];

      // Destroy the previous chart instance
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create a new chart instance
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Chart Data',
              data: data,
              backgroundColor: 'rgba(75,192,192,0.2)',
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, []);

  return <canvas ref={chartRef} />;
};

export default ChartComponent 