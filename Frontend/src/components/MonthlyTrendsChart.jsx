import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

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
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/analytics/expenses/trends/monthly`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setDataList(res.data))
      .catch((err) => console.error(err));
  }, []);

  const formattedLabels = dataList.map((item) => {
    const [year, month] = item.date.split("-");
    const monthNames = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
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
        fill: false,
        borderColor: "#a855f7", // purple-500
        pointBackgroundColor: "#a855f7",
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "#e5e7eb", // gray-200
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
    scales: {
      x: {
        ticks: { color: "#9ca3af" },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
      y: {
        ticks: { color: "#9ca3af" },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
    },
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-4">
      <h2 className="text-2xl font-bold text-white mb-4">
        Monthly <span className="text-purple-400">Trends</span> 📈
      </h2>

      <div
        className="
          w-full
          h-64 sm:h-80 md:h-96
          bg-white/5 backdrop-blur-xl
          border border-white/10
          rounded-3xl
          p-4 sm:p-6
          shadow-2xl
        "
      >
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default MonthlyTrends;
