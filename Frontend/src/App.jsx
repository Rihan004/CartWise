import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ExpensePage from "./pages/ExpensePage";
import GroceryPage from "./pages/GroceryPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="p-6">
          <Routes>
            <Route path="/" element={<ExpensePage />} />
            <Route path="/grocery" element={<GroceryPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
