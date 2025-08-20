import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const steps = ["Basic Info", "Contact Info", "Skills & Photo"];

function UserAdd() {
  const [activeStep, setActiveStep] = useState(0);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [preview, setPreview] = useState(null);

  const validationSchemas = [
    Yup.object({
      name: Yup.string().required("Full Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(6, "Min 6 chars")
        .required("Password required"),
      password_confirmation: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm your password"),
    }),
    Yup.object({
      phoneNumber: Yup.string()
        .required("Phone Number is required")
        .matches(/^[0-9]{10}$/, "Phone Number must be exactly 10 digits"),
      gender: Yup.string().required("Gender is required"),
      countryId: Yup.string().required("Country ID required"),
      stateId: Yup.string().required("State ID required"),
    }),
    Yup.object({
      skills: Yup.string().required("Skills are required"),
      photo: Yup.mixed().required("Photo is required"),
    }),
  ];

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      phoneNumber: "",
      gender: "",
      countryId: "",
      stateId: "",
      skills: "",
      photo: null,
    },
    validationSchema: validationSchemas[activeStep],
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      AddNewUser(values);
    },
    validateOnBlur: true,
    validateOnChange: false,
  });
  const AddNewUser = async (values) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      const response = await axios.post(
        "https://reactinterviewtask.codetentaclestechnologies.in/api/api/register",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("User registered successfully!");

      console.log("API response:", response.data);
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };
  const handleNext = async () => {
    const valid = await formik.validateForm();
    if (Object.keys(valid).length === 0) {
      if (activeStep < steps.length - 1) {
        setActiveStep(activeStep + 1);
      } else {
        formik.handleSubmit();
      }
    } else {
      formik.setTouched(
        Object.keys(formik.values).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {})
      );
    }
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep(activeStep - 1);
  };
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://reactinterviewtask.codetentaclestechnologies.in/api/api/country-list",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCountries(response.data.data || []);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, [token]);
  useEffect(() => {
    if (!formik.values.countryId) return;

    const fetchStates = async () => {
      try {
        const response = await axios.get(
          "https://reactinterviewtask.codetentaclestechnologies.in/api/api/state-list",
          {
            params: { country_id: formik.values.countryId }, // send as query param
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("States:", response.data.data);
        setStates(response.data.data || []);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };

    fetchStates();
  }, [formik.values.countryId, token]);

  return (
    <div className="w-full mx-auto p-6 bg-gray-100 border rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => navigate("/users")}
          className="px-2 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
          ← Back to User List
        </button>
        <h2 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold text-cyan-400">
          Add New User
        </h2>
      </div>

      <div className="flex justify-between mb-6">
        {steps.map((label, index) => (
          <div
            key={label}
            className={`flex-1 text-center text-sm font-medium ${index === activeStep
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-400 border-b"
              }`}>
            {label}
          </div>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <ToastContainer />
        {activeStep === 0 && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              className="w-full p-2 border rounded text-sm"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-xs">{formik.errors.name}</p>
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="w-full p-2 border rounded text-sm"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs">{formik.errors.email}</p>
            )}

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              className="w-full p-2 border rounded text-sm"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs">{formik.errors.password}</p>
            )}

            <input
              type="password"
              name="password_confirmation"
              placeholder="Confirm Password"
              value={formik.values.password_confirmation}
              onChange={formik.handleChange}
              className="w-full p-2 border rounded text-sm"
            />
            {formik.touched.password_confirmation &&
              formik.errors.password_confirmation && (
                <p className="text-red-500 text-xs">
                  {formik.errors.password_confirmation}
                </p>
              )}
          </>
        )}

        {activeStep === 1 && (
          <>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              className="w-full p-2 border rounded text-sm"
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <p className="text-red-500 text-xs">
                {formik.errors.phoneNumber}
              </p>
            )}

            <select
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              className="w-full p-2 border rounded text-sm">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {formik.touched.gender && formik.errors.gender && (
              <p className="text-red-500 text-xs">{formik.errors.gender}</p>
            )}

            <select
              name="countryId"
              value={formik.values.countryId}
              onChange={formik.handleChange}
              className="w-full p-2 border rounded text-sm"
            >
              <option value="">Select Country</option>
              {countries.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {formik.touched.countryId && formik.errors.countryId && (
              <p className="text-red-500 text-xs">{formik.errors.countryId}</p>
            )}

            <select
              name="stateId"
              value={formik.values.stateId}
              onChange={formik.handleChange}
              className="w-full p-2 border rounded text-sm"
              disabled={!formik.values.countryId}
            >
              <option value="">Select State</option>
              {states.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
            {formik.touched.stateId && formik.errors.stateId && (
              <p className="text-red-500 text-xs">{formik.errors.stateId}</p>
            )}
          </>
        )}

        {activeStep === 2 && (
          <>
            <input
              type="text"
              name="skills"
              placeholder="Skills (comma separated)"
              value={formik.values.skills}
              onChange={formik.handleChange}
              className="w-full p-2 border rounded text-sm"
            />
            {formik.touched.skills && formik.errors.skills && (
              <p className="text-red-500 text-xs">{formik.errors.skills}</p>
            )}

            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={(e) => {
                const file = e.currentTarget.files[0];
                formik.setFieldValue("photo", file);
                if (file) {
                  setPreview(URL.createObjectURL(file));
                }
              }}
              className="w-full border p-2 rounded text-sm"
            />
            {formik.touched.photo && formik.errors.photo && (
              <p className="text-red-500 text-xs">{formik.errors.photo}</p>
            )}

            {/* Circle Preview */}
            {preview && (
              <div className="mt-3 flex justify-center">
                <img
                  src={preview}
                  alt="Selected"
                  className="w-24 h-24 rounded-full object-cover border"
                />
              </div>
            )}

          </>
        )}

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={handleBack}
            disabled={activeStep === 0}
            className="px-4 py-2 bg-gray-400 text-white rounded disabled:opacity-50">
            Back
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="px-4 py-2 bg-cyan-400 text-white rounded">
            {activeStep === steps.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
}
export default UserAdd;
