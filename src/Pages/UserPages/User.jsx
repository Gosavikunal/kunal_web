import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { MdDeleteOutline } from "react-icons/md";
import AccessRightCard from "../AccessRight/AccessRightCard";
const User = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    perPage: 10,
    total: 0,
  });
  // Fetch whenever currentPage changes
  useEffect(() => {
    getUsers(pagination.currentPage);
  }, [pagination.currentPage]);

  // Fetch users with page param
  const getUsers = (page = 1) => {
    axios
      .get(
        `https://reactinterviewtask.codetentaclestechnologies.in/api/api/user-list?page=${page}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        const apiResponse = res.data;
        setPagination({
          currentPage: apiResponse.currentPage || 1,
          lastPage: apiResponse.lastPage || 1,
          perPage: apiResponse.perPage || 10,
          total: apiResponse.total || 0,
        });
        setUsers(apiResponse?.data || []);
      })
      .catch((err) => {
        console.error("API Error:", err);
       // navigate("*");
      });
  };


  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the user.",
      icon: "warning",
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.post(
            `https://reactinterviewtask.codetentaclestechnologies.in/api/api/user-delete/${id}`,
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          Swal.fire("Deleted!", "User has been deleted.", "success");
          getUsers();
        } catch (err) {
          console.error("Delete error:", err);
          Swal.fire("Error!", "Failed to delete user.", "error");
        }
      }
    });
  };

  return (
    <>
      {role === "Admin" ? (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4 bg-teal-50 p-3 rounded-md shadow">
        <h2 className="text-xl font-semibold text-gray-800">User List</h2>
        <button
          onClick={() => navigate("/users/add")}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md shadow"
        >
          + Add New User
        </button>
      </div>

      <hr className="w-full border-2  mt-1 mb-2" />
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Sr.No.</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Phone Number</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Gender</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((row, index) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  {(pagination.currentPage - 1) * pagination.perPage + index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">{row.name}</td>
                <td className="border border-gray-300 px-4 py-2">{row.email}</td>
                <td className="border border-gray-300 px-4 py-2">{row.phoneNumber}</td>
                <td className="border border-gray-300 px-4 py-2">{row.gender}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleDelete(row.id)}
                    className="bg-gray-100 p-2 rounded-full shadow hover:bg-gray-400 text-red-500"
                    title="Delete"
                  >
                    <MdDeleteOutline size={20} />
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <p className="text-gray-600 text-sm">
          Showing {(pagination.currentPage - 1) * pagination.perPage + 1} -{" "}
          {Math.min(pagination.currentPage * pagination.perPage, pagination.total)} of{" "}
          {pagination.total}
        </p>
        <div className="flex space-x-2">
          <button
            disabled={pagination.currentPage === 1}
            onClick={() =>
              setPagination((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }))
            }
            className={`px-3 py-1 border border-blue-500 rounded ${pagination.currentPage === 1
                ? "bg-gray-200 text-gray-500  cursor-not-allowed"
                : "bg-white hover:bg-gray-100"
              }`}
          >
            Previous
          </button>
          <button
            disabled={pagination.currentPage === pagination.lastPage}
            onClick={() =>
              setPagination((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }))
            }
            className={`px-3 py-1 border border-blue-500  rounded ${pagination.currentPage === pagination.lastPage
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white hover:bg-gray-100"
              }`}
          >
            Next
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
     ) : (
        <AccessRightCard />
      )}
    </>
  );
};

export default User;
