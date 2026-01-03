const AnalyticsMenu = ({ selected, setSelected }) => {
  const items = [
    { key: "monthly-total", label: "Monthly Total" },
    { key: "weekly-total", label: "Weekly Total" },
    { key: "category-summary", label: "Category Summary" },
    { key: "monthly-trends", label: "Monthly Trends" },
     { key: "all-expenses", label: "All Expenses" }
  ];

  return (
    <div
      className="
        w-full md:w-60
        bg-white/5 backdrop-blur-xl
        border border-white/10
        rounded-2xl shadow-xl
        p-3
        flex md:flex-col gap-2
        overflow-x-auto md:overflow-visible
      "
    >
      {items.map((item) => (
        <div
          key={item.key}
          onClick={() => setSelected(item.key)}
          className={`
            flex-shrink-0
            px-4 py-2.5 rounded-xl cursor-pointer
            text-sm font-medium whitespace-nowrap
            transition-all duration-200
            ${
              selected === item.key
                ? "bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-md shadow-purple-500/30"
                : "bg-gray-900/70 text-gray-300 hover:bg-gray-800"
            }
          `}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default AnalyticsMenu;
