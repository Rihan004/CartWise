const AnalyticsMenu = ({ selected, setSelected }) => {
  const items = [
    { key: "monthly-total", label: "Monthly Total" },
    { key: "weekly-total", label: "Weekly Total" },
    { key: "category-summary", label: "Category Summary" },
    { key: "monthly-trends", label: "Monthly Trends" },
  ];

  return (
    <div className="w-60 bg-white p-4 rounded-xl shadow">
      {items.map((item) => (
        <div
          key={item.key}
          onClick={() => setSelected(item.key)}
          className={`p-3 rounded-lg cursor-pointer mb-2
            ${selected === item.key ? "bg-indigo-500 text-white" : "bg-gray-100"}
          `}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default AnalyticsMenu;
