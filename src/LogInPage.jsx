import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "../src/components/Button";
import { Text } from "../src/components/Text";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "./api";
const LogInPage = () => {
    let navigate = useNavigate();
    const [showPass, setShowPass] = useState(false);
    const handlePasswordToggle = () => {
        setShowPass(!showPass);
    };
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .matches(
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                "Invalid Email"
            )
            .required("Email is required"),
        password: Yup.string().required("Password is required"),
    });
    const headers = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            onHandleSubmit(values);
        },
    });

    const onHandleSubmit = async (values) => {
        try {
            const response = await api.post("/login", {
                email: values.email,
                password: values.password,
            });

            if (response.data?.success) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("role", response.data.role);
                toast.success("Login Successful!");
                setTimeout(() => navigate("/Sidebar"), 1000);
            } else {
                toast.error(response.data?.message || "Invalid credentials");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong!");
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bg-white-A700 flex flex-col font-inter items-center justify-center w-[100%] h-[100vh]">
                <div className="bg-white shadow-lg border border-gray-200 rounded-2xl p-8 w-auto">
                    <div className="flex flex-col gap-2.5 justify-start md:mt-0 items-start w-[38%] md:w-full">
                        <div className="flex flex-row gap-[9px] items-center justify-start ml-5 md:ml-[0] md:pr-10 sm:pr-5 pr-[83px] w-[54%] md:w-full">
                            <Text
                                className="md:text-4xl sm:text-[34px] text-[34px] text-blue-A700 tracking-[0.20px]"
                                size="txtInterSemiBold38"
                            >
                                Codetententacles
                            </Text>
                        </div>

                        <div>
                            <ToastContainer />
                            <div className="flex flex-col items-center justify-end p-[21px] sm:px-5 w-full">
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="flex flex-col gap-3 items-start justify-start mt-2.5 w-auto sm:w-full">
                                        <div className="flex flex-col gap-3 items-start justify-start w-auto">
                                            <Text
                                                className="text-2xl md:text-[22px] text-gray-900 sm:text-xl tracking-[0.20px] w-auto"
                                                size="txtInterBold24"
                                            >
                                                Login{" "}
                                            </Text>
                                        </div>
                                        <div className="flex flex-col gap-4 items-start justify-start w-[404px] sm:w-full">
                                            <label htmlFor="email">Enter Email</label>
                                            <input
                                                id="email"
                                                name="email"
                                                placeholder="Enter Your email"
                                                className="md:h-auto placeholder:text-blue_gray-300 sm:h-auto text-base text-left w-full rounded-md p-2"
                                                type="email"
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.email && formik.errors.email ? (
                                                <div className="text-red-500">
                                                    {formik.errors.email}
                                                </div>
                                            ) : null}

                                            <label htmlFor="password">Enter Password</label>
                                            <div className="relative w-full">
                                                <input
                                                    id="password"
                                                    name="password"
                                                    placeholder="Enter Your Password"
                                                    className="md:h-auto placeholder:text-blue_gray-300 sm:h-auto text-base rounded-md p-2 text-left w-full pr-10" // Added padding-right for the icon
                                                    type={showPass ? "text" : "password"}
                                                    value={formik.values.password}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                <div
                                                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer mr-8"
                                                    onClick={handlePasswordToggle}
                                                >
                                                    {showPass ? (
                                                        <FaEye size={20} />
                                                    ) : (
                                                        <FaEyeSlash size={20} />
                                                    )}
                                                </div>
                                            </div>
                                            {formik.touched.password && formik.errors.password ? (
                                                <div className="text-red-500">
                                                    {formik.errors.password}
                                                </div>
                                            ) : null}
                                        </div>

                                        <Button
                                            type="submit"
                                            className="cursor-pointer font-bold h-14 text-base text-center tracking-[0.20px] w-[404px] bg-cyan-400 py-3 px-2 hover:bg-cyan-500 rounded-md"
                                            color="cyan_400"
                                            size="lg"
                                            variant="fill"
                                        >
                                            Log In
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <footer className="bg-cyan-400 flex items-center justify-center md:px-5 w-full h-auto">
          <div className="flex flex-col gap-[10px] items-center justify-center mb-[15px] sm:ml-0 sm:mr-0 w-[100%]">
           
          </div>
        </footer> */}
            </div>
        </>
    );
};

export default LogInPage;
