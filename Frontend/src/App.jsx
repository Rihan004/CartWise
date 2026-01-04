import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ExpensePage from "./pages/ExpensePage";
import GroceryPage from "./pages/GroceryPage";
import GroceryTablePage from "./pages/GroceryTablePage";
import AuthSuccess from "./pages/AuthSuccess";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import AnalyticsPage from "./pages/AnalyticsPage";

function Layout({ children }) {
  const location = useLocation();

  // Pages where navbar should be hidden lets go
  const hideNavbar = ["/login", "/auth/success", "/register"];

  return (
    <>
      {!hideNavbar.includes(location.pathname) && <Navbar />}

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      {/* Global Dark Background */}
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-950 text-gray-100">
        <Layout>
          <Routes>

            {/* PUBLIC ROUTES */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/auth/success" element={<AuthSuccess />} />

            {/* PROTECTED ROUTES */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <ExpensePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/grocery"
              element={
                <ProtectedRoute>
                  <GroceryPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/table-view"
              element={
                <ProtectedRoute>
                  <GroceryTablePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/analytics"
              element={
                <ProtectedRoute>
                  <AnalyticsPage />
                </ProtectedRoute>
              }
            />

          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
