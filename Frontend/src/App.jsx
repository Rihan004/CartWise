import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ExpensePage from "./pages/ExpensePage";
import GroceryPage from "./pages/GroceryPage";
import GroceryTablePage from "./pages/GroceryTablePage";
import AuthSuccess from "./pages/AuthSuccess";
import Login from "./pages/Login";

function Layout({ children }) {
  const location = useLocation();

  // Pages where navbar should be hidden
  const hideNavbar = ["/login", "/auth/success"];

  return (
    <>
      {!hideNavbar.includes(location.pathname) && <Navbar />}
      <div className="p-6">{children}</div>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/auth/success" element={<AuthSuccess />} />
            <Route path="/" element={<ExpensePage />} />
            <Route path="/grocery" element={<GroceryPage />} />
            <Route path="/table-view" element={<GroceryTablePage />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
