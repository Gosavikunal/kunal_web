import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const Product = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    perPage: 10,
    total: 0,
  });

  // Fetch whenever currentPage changes
  useEffect(() => {
    getProducts(pagination.currentPage);
  }, [pagination.currentPage]);

  // Fetch Product List
  const getProducts = (page = 1) => {
    axios
      .get(
        `https://reactinterviewtask.codetentaclestechnologies.in/api/api/product-list?page=${page}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        const apiResponse = res.data;
        console.log("Product API Response:", apiResponse);

        setPagination({
          currentPage: apiResponse.currentPage || 1,
          lastPage: apiResponse.lastPage || 1,
          perPage: apiResponse.perPage || 10,
          total: apiResponse.total || 0,
        });

        setProducts(apiResponse?.data || []);
      })
      .catch((err) => {
        console.error("API Error:", err);
        navigate("*");
      });
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Product List</h2>
        <button
          onClick={() => navigate("/products/add")}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md shadow"
        >
          + Add New Product
        </button>
      </div>
      <hr className="w-full border-2 mt-1 mb-2" />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Sr.No.</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Image</th>
            </tr>
          </thead>
          <tbody>
            {products.map((row, index) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  {(pagination.currentPage - 1) * pagination.perPage + index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">{row.name}</td>
                <td className="border border-gray-300 px-4 py-2">{row.description}</td>
                <td className="border border-gray-300 px-4 py-2">₹{row.price}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {row.image ? (
                    <img
                      src={row.image}
                      alt={row.name}
                      className="h-12 w-12 object-cover rounded"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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
            className={`px-3 py-1 border border-blue-500 rounded ${
              pagination.currentPage === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
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
            className={`px-3 py-1 border border-blue-500 rounded ${
              pagination.currentPage === pagination.lastPage
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
  );
};

export default Product;
