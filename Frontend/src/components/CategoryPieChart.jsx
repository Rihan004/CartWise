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
          `${import.meta.env.VITE_API_BASE_URL}/api/analytics/expenses/category-summary`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const expenseFormatted = Object.entries(expensesRes.data).map(
          ([category, total]) => ({ category, total })
        );

        const groceriesRes = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/analytics/groceries/category-summary`,
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
          "#a855f7", // purple
          "#6366f1", // indigo
          "#22c55e", // green
          "#facc15", // yellow
          "#38bdf8", // sky
          "#f472b6", // pink
          "#4ade80", // emerald
          "#fb7185", // rose
        ],
        borderColor: "rgba(0,0,0,0)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#e5e7eb",
          boxWidth: 12,
          padding: 12,
        },
      },
      tooltip: {
        backgroundColor: "#111827",
        titleColor: "#fff",
        bodyColor: "#e5e7eb",
        borderColor: "#a855f7",
        borderWidth: 1,
      },
    },
  };

  return (
    <div className="w-full flex flex-col items-center justify-center px-2 sm:px-4">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">
        Category <span className="text-purple-400">Summary</span>
      </h2>

      <div
        className="
          w-full max-w-sm sm:max-w-md
          h-72 sm:h-80
          bg-white/5 backdrop-blur-xl
          border border-white/10
          rounded-3xl
          p-4
          shadow-2xl
          flex items-center justify-center
        "
      >
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default CategorySummary;
