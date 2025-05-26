import React from "react";
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJs.register(ArcElement, Tooltip, Legend);

const ExpensesChart = ({expenses}) => {
  
  const food = expenses.filter((item) => item.category === "food");
  const transportation = expenses.filter(
    (item) => item.category === "transportation"
  );
  const health = expenses.filter((item) => item.category === "health");
  const rent = expenses.filter((item) => item.category === "rent");
  const entertainment = expenses.filter(
    (item) => item.category === "entertainment"
  );
  const education = expenses.filter(
    (item) => item.category === "education"
  );
  const others = expenses.filter((item) => item.category === "others");

  const calculate = (arr) => {
    let sum = 0;
    let num = arr.map((item) => Number(item.amount));
    for (let i = 0; i < num.length; i++) {
      sum += num[i];
    }
    return sum;
  };

  const expense = [
    calculate(food),
    calculate(transportation),
    calculate(health),
    calculate(rent),
    calculate(entertainment),
    calculate(education),
    calculate(others),
  ];

  var options = {
    legend: {
      position: "right",
      labels: {
        boxWidth: 10,
      },
    },
  };

  const pieData = {
    labels: [
      "food",
      "transportation",
      "health",
      "rent",
      "entertainment",
      "education",
      "others",
    ],
    datasets: [
      {
        data: expense,
        backgroundColor: [
          "#1f77b4", // muted blue
          "#aec7e8", // light blue
          "#ff7f0e", // orange
          "#2ca02c", // green
          "#d62728", // red
          "#9467bd", // purple
          "#8c564b", // brown
        ],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="pie-chart">
      <div className="pie-chart-container">
        <Pie data={pieData} options={options} color="invert" />
      </div>
    </div>
  );
};

export default ExpensesChart;
