import { BrowserRouter, Routes, Route, useLocation ,Navigate} from "react-router-dom";
import LogInPage from "./LogInPage";
import Product from "./Pages/ProductPages/Product";
import ProductAdd from "./Pages/ProductPages/ProductAdd";
import User from "./Pages/UserPages/User";
import UserAdd from "./Pages/UserPages/UserAdd";
import Sidebar from "./Pages/Sidebar";

function AppLayout() {
  const location = useLocation();
  const token = localStorage.getItem("token");

  // Hide sidebar on login page
  const hideSidebar = location.pathname === "/" || !token;

  return (
    <div className="App flex">
      {!hideSidebar && <Sidebar />} {/* Show only when logged in */}

      <div className="flex-1 p-4">
        <Routes>
          {/* Login Page */}
          <Route path="/" element={<LogInPage />} />
           
             {/* ✅ Default redirect after login */}
          <Route path="/sidebar" element={<Navigate to="/users" replace />} />

          {/* Product Pages */}
          <Route path="/products" element={<Product />} />
          <Route path="/products/add" element={<ProductAdd />} />

          {/* User Pages */}
          <Route path="/users" element={<User />} />
          <Route path="/users/add" element={<UserAdd />} />
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
