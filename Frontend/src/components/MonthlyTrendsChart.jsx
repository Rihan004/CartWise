import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const MonthlyTrends = () => {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/analytics/expenses/trends/monthly", { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
      .then((res) => setDataList(res.data))
      .catch((err) => console.error(err));
  }, []);

  const formattedLabels = dataList.map((item) => {
    const [year, month] = item.date.split("-");
    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
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
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: true, position: "bottom" } },
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-indigo-600 mb-4 text-center sm:text-left">
        Monthly Trends 📈
      </h2>

      <div className="w-full h-64 sm:h-80 md:h-96 bg-white p-4 rounded-xl shadow">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default MonthlyTrends;
