
import React from "react";
import { Bar } from "react-chartjs-2";

const EmailAnalyticsChart = ({ months, years }) => {
  const data = {
    labels: months.map((month) => `${month} ${years[0]}`),
    datasets: [
      {
        label: "Emails Sent",
        data: [120, 190, 30, 80, 20, 30, 190],
        backgroundColor: "#9EAFFF",
        borderColor: "#9EAFFF",
        borderWidth: 1,
        borderRadius: 5,
      },
      {
        label: "Emails Opened",
        data: [80, 70, 110, 50, 100, 90, 40], 
        backgroundColor: "#567B65",
        borderColor: "#567B65",
        borderWidth: 1,
        borderRadius: 5,
      },
      {
        label: "Leads Generated",
        data: [50, 30, 70, 40, 80, 60, 90], 
        backgroundColor: "#D7D6C6",
        borderColor: "#D7D6C6",
        borderWidth: 1,
        borderRadius: 5,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default EmailAnalyticsChart;
