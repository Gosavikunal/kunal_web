import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import { FaUsers, FaBoxOpen } from "react-icons/fa";
import { Menu, MenuItem, Sidebar as ProSidebar } from "react-pro-sidebar";
import { FiLogOut } from "react-icons/fi";
import Swal from "sweetalert2";
const Sidebar = () => {
  const [showProfile, setshowProfile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isUser = location.pathname === "/users";
  const isProducts = location.pathname === "/products";
  const [erplist, setErplist] = useState([]);

  const token = localStorage.getItem("token");
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setshowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const storedErplist = sessionStorage.getItem("erplist");
    if (storedErplist) {
      try {
        setErplist(JSON.parse(storedErplist));
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  }, []);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex">
      <div className="flex">
        <ProSidebar className="fixed top-0 left-0 h-full min-h-screen shadow-lg bg-cyan-800 text-white">
          <Menu
            menuItemStyles={{
              button: ({ active }) => ({
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 15px",
                borderRadius: "8px",
                margin: "5px 10px",
                fontWeight: 600,
                fontSize: "15px",
                textDecoration: "none",
                color: active ? "#0f172a" : "#f9fafb", // dark text when active, white otherwise
                backgroundColor: active ? "#06b6d4" : "transparent", // 🌟 cyan background when active
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: active ? "#06b6d4" : "#334155", // keep cyan if active, gray if hover
                  color: active ? "#0f172a" : "#38bdf8",
                  textDecoration: "none",
                },
              }),
            }}>
            {/* Brand */}
            <div className="text-center py-6">
              <h1 className="text-3xl font-bold text-yellow-400">
                CODETENTACLES
              </h1>
              <p className="text-base text-gray-200 mt-2">Welcome</p>
            </div>
            <hr className="w-full border-2 mb-2" />
            {/* Users */}
            <MenuItem
              icon={<FaUsers className="h-5 w-5" />}
              component={
                <Link
                  to="/users"
                  style={{ color: "inherit", textDecoration: "none" }}
                />
              }
              active={isUser}>
              Users
            </MenuItem>

            {/* Products */}
            <MenuItem
              icon={<FaBoxOpen className="h-5 w-5" />}
              component={
                <Link
                  to="/products"
                  style={{ color: "inherit", textDecoration: "none" }}
                />
              }
              active={isProducts}>
              Products
            </MenuItem>
            {/* Logout */}
            <MenuItem
              icon={<FiLogOut className="h-5 w-5 text-red-500" />}
              onClick={() => {
                Swal.fire({
                  title: "Are you sure?",
                  text: "You will be logged out of the system.",
                  icon: "warning",
                  showCancelButton: true,
                  allowOutsideClick: false,
                  confirmButtonColor: "#d33",
                  cancelButtonColor: "#3085d6",
                  confirmButtonText: "Yes, Logout",
                }).then((result) => {
                  if (result.isConfirmed) {
                    localStorage.removeItem("token");
                    sessionStorage.clear();
                    navigate("/");
                    Swal.fire(
                      "Logged Out!",
                      "You have been logged out successfully.",
                      "success"
                    );
                  }
                });
              }}>
              <label className="text-red-500 cursor-pointer">Logout</label>
            </MenuItem>
          </Menu>
        </ProSidebar>

        <div className="bg-gray-700 cursor-col-resize w-[2px] hover:opacity-100 z-50"></div>
      </div>
    </div>
  );
};

export default Sidebar;
