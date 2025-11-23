import { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CategorySummary = () => {
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/analytics/expenses/category-summary", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        const formatted = Object.entries(res.data).map(([category, total]) => ({
          category,
          total,
        }));
        setSummary(formatted);
      })
      .catch((err) => console.error(err));
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
        ],
      },
    ],
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">
        Category Summary
      </h2>

      {/* Chart Container (SMALLER SIZE) */}
      <div className="w-60 h-60 sm:w-72 sm:h-72">
        <Pie data={chartData} />
      </div>
    </div>
  );
};

export default CategorySummary;
