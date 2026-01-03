import { useState } from "react";
import MonthlyTotal from "../components/MonthlyTotal";
import WeeklyTotal from "../components/WeeklyTotal";
import CategoryPieChart from "../components/CategoryPieChart";
import MonthlyTrendsChart from "../components/MonthlyTrendsChart";
import AnalyticsMenu from "../components/AnalyticsMenu";
import AllExpensesAnalytics from "../components/AllExpensesAnalytics";

const AnalyticsPage = () => {
  const [selected, setSelected] = useState("monthly-total");

  const renderComponent = () => {
    switch (selected) {
      case "monthly-total":
        return <MonthlyTotal />;
      case "weekly-total":
        return <WeeklyTotal />;
      case "category-summary":
        return <CategoryPieChart />;
      case "monthly-trends":
        return <MonthlyTrendsChart />;
      case "all-expenses": 
        return <AllExpensesAnalytics />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-950 px-4 py-6">
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 md:gap-6">

        {/* Menu */}
        <div className="w-full md:w-72">
          <AnalyticsMenu selected={selected} setSelected={setSelected} />
        </div>

        {/* Content */}
        <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 
                        rounded-3xl shadow-2xl p-4 sm:p-6">
          {renderComponent()}
        </div>

      </div>
    </div>
  );
};

export default AnalyticsPage;
