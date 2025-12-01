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
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        // Fetch expense category summary
        const expensesRes = await axios.get(
          "http://localhost:5000/api/analytics/expenses/category-summary",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const expenseFormatted = Object.entries(expensesRes.data).map(
          ([category, total]) => ({
            category,
            total,
          })
        );

        // Fetch grocery category summary
        const groceriesRes = await axios.get(
          "http://localhost:5000/api/analytics/groceries/category-summary",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // SUM all grocery categories
        const groceryTotal = Object.values(groceriesRes.data).reduce(
          (acc, val) => acc + val,
          0
        );

        // Create single grocery slice
        const groceryFormatted = [
          {
            category: "Grocery",
            total: groceryTotal,
          },
        ];

        setSummary([...expenseFormatted, ...groceryFormatted]);
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

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">
        Category Summary
      </h2>

      <div className="w-60 h-60 sm:w-72 sm:h-72">
        <Pie data={chartData} />
      </div>
    </div>
  );
};

export default CategorySummary;
