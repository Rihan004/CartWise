import { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CategorySummary = () => {
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const expensesRes = await axios.get(
          "http://localhost:5000/api/analytics/expenses/category-summary",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const expenseFormatted = Object.entries(expensesRes.data).map(
          ([category, total]) => ({ category, total })
        );

        const groceriesRes = await axios.get(
          "http://localhost:5000/api/analytics/groceries/category-summary",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const groceryTotal = Object.values(groceriesRes.data).reduce(
          (acc, val) => acc + val,
          0
        );

        setSummary([
          ...expenseFormatted,
          { category: "Grocery", total: groceryTotal },
        ]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: summary.map((item) => item.category),
    datasets: [
      {
        data: summary.map((item) => item.total),
        backgroundColor: [
          "#6366F1",
          "#F87171",
          "#34D399",
          "#FBBF24",
          "#60A5FA",
          "#A78BFA",
          "#F472B6",
          "#4ADE80",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: { boxWidth: 12, padding: 12 },
      },
    },
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h2 className="text-xl sm:text-2xl font-bold text-indigo-600 mb-4 text-center">
        Category Summary
      </h2>

      <div className="w-full max-w-sm sm:max-w-md h-72 sm:h-80 flex items-center justify-center">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default CategorySummary;
