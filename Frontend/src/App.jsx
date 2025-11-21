import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ExpensePage from "./pages/ExpensePage";
import GroceryPage from "./pages/GroceryPage";
import GroceryTablePage from "./pages/GroceryTablePage";
import AuthSuccess from "./pages/AuthSuccess";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
function Layout({ children }) {
  const location = useLocation();

  // Pages where navbar should be hidden
  const hideNavbar = ["/login", "/auth/success" , "/register"];

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
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
