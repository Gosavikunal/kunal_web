
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import api from "../../api";
function ProductAdd() {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      image: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Product name is required"),
      description: Yup.string().required("Description is required"),
      price: Yup.number()
        .typeError("Price must be a number")
        .positive("Price must be greater than 0")
        .required("Price is required"),
      image: Yup.mixed().required("Product image is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
       handleAddProduct(values, resetForm);
    },
  });
const handleAddProduct = async (values, resetForm) => {
  try {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("image", values.image);

    const response = await api.post("/add-product", formData);
    console.log("Add Product API Response:", response.data);

    if (response.data?.success) {
      toast.success(response.data?.message || "✅ Product added successfully!");
      resetForm();
      // navigate("/products");
    } else {
      toast.error(response.data?.message || "❌ Failed to add product");
    }
  } catch (error) {
    console.error("Add Product Error:", error);
    toast.error(error.response?.data?.message || "❌ Something went wrong");
  }
};
  return (
    <div className="w-full  p-6 bg-gray-100 border rounded-lg shadow-md">
      <ToastContainer />
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => navigate("/products")}
          className="px-2 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          ← Back to Product List
        </button>
        <h2 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold text-cyan-400">
          Add Product
        </h2>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          className="w-full p-2 border rounded text-sm"
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-red-500 text-xs">{formik.errors.name}</p>
        )}

        <textarea
          name="description"
          placeholder="Description"
          value={formik.values.description}
          onChange={formik.handleChange}
          className="w-full p-2 border rounded text-sm"
        />
        {formik.touched.description && formik.errors.description && (
          <p className="text-red-500 text-xs">{formik.errors.description}</p>
        )}

        <input
          type="text"
          name="price"
          placeholder="Price"
          value={formik.values.price}
          onChange={formik.handleChange}
          className="w-full p-2 border rounded text-sm"
        />
        {formik.touched.price && formik.errors.price && (
          <p className="text-red-500 text-xs">{formik.errors.price}</p>
        )}

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) => {
            const file = e.currentTarget.files[0];
            formik.setFieldValue("image", file);
            if (file) {
              setPreview(URL.createObjectURL(file));
            }
          }}
          className="w-full border p-2 rounded text-sm"
        />

        {formik.touched.image && formik.errors.image && (
          <p className="text-red-500 text-xs">{formik.errors.image}</p>
        )}


        {preview && (
          <div className="mt-3 flex justify-center">
            <img
              src={preview}
              alt="Selected"
              className="w-24 h-24 rounded-full object-cover border"
            />
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-cyan-400 text-white rounded hover:bg-cyan-500"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductAdd;
