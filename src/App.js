import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import LogInPage from "./LogInPage";
import Product from "./Pages/ProductPages/Product";
import ProductAdd from "./Pages/ProductPages/ProductAdd";
import User from "./Pages/UserPages/User";
import UserAdd from "./Pages/UserPages/UserAdd";
import Sidebar from "./Pages/Sidebar";
import ProtectedRoute from "./ProtectedRoute";

function AppLayout() {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const hideSidebar = location.pathname === "/" || !token;

  return (
    <div className="App flex">
      {!hideSidebar && <Sidebar />}

      <div className="flex-1 p-4">
        <Routes>
          {/* Login Page */}
          <Route path="/" element={<LogInPage />} />

          {/* Default redirect */}
          <Route path="/sidebar" element={<Navigate to="/users" replace />} />

          {/* ✅ Protected Routes */}
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Product />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/add"
            element={
              <ProtectedRoute>
                <ProductAdd />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/add"
            element={
              <ProtectedRoute>
                <UserAdd />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
