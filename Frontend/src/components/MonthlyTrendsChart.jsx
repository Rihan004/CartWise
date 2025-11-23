import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

// Chart.js imports
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

// Register required components
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const MonthlyTrends = () => {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/analytics/expenses/trends/monthly", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setDataList(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Format date: "2025-11" → "Nov 2025"
  const formattedLabels = dataList.map((item) => {
    const [year, month] = item.date.split("-");
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  });

  const chartData = {
    labels: formattedLabels,
    datasets: [
      {
        label: "Monthly Spending",
        data: dataList.map((d) => d.total),
        tension: 0.4,
        borderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // allows manual sizing
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">
        Monthly Trends 📈
      </h2>

      {/* Make chart smaller */}
      <div style={{ width: "400px", height: "250px" }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default MonthlyTrends;
