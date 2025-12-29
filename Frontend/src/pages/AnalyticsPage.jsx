import { useState } from "react";
import MonthlyTotal from "../components/MonthlyTotal";
import WeeklyTotal from "../components/WeeklyTotal";
import CategoryPieChart from "../components/CategoryPieChart";
import MonthlyTrendsChart from "../components/MonthlyTrendsChart";
import AnalyticsMenu from "../components/AnalyticsMenu";

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
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gray-100 flex flex-col md:flex-row gap-4 md:gap-6">
      
      <AnalyticsMenu selected={selected} setSelected={setSelected} />

      <div className="flex-1 bg-white p-6 rounded-xl shadow">
        {renderComponent()}
      </div>

    </div>
  );
};

export default AnalyticsPage;