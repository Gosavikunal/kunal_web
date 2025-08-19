import React, { useEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { MdLogout, MdMenu } from "react-icons/md";
import AppointmentsImage from "../../Images/Appointments.jpeg";
import OPDImages from "../../Images/OPDImage (2).jpeg";
import UserMgm from "../../Images/UserMgm.jpeg";
import HosSetting from "../../Images/HosSetting.jpeg";
import ReportsNew from "../../Images/ReportsNew.jpeg";
import PatientManagement from "../../Images/PatientManagement.jpeg";
import RoomBook from "../../Images/RoomBook.jpeg";
import Split from "react-split";

import { FaUserCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useLocation } from "react-router-dom";

import {
  Menu,
  MenuItem,
  Sidebar,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";

import { Text } from "components";
import axios from "axios";
import { AiOutlineEye, AiOutlinePlusCircle } from "react-icons/ai";

const Sidebar1 = () => {
  const [showProfile, setshowProfile] = useState(false);
  const { collapseSidebar, collapsed } = useProSidebar();
  let navigate = useNavigate();
  const location = useLocation();
  const isappointmentsmanagements =
    location.pathname === "/appointmentsmanagements";
  const isOtManagement = location.pathname === "/operationtheater/booking/get";
  const isPatientManagemnet =
    location.pathname === "/patientmanagement/allpatientlist";
  const [erplist, setErplist] = useState([]);
  const token = sessionStorage.getItem("token");
  const hospitalName = sessionStorage.getItem("hospital_name");
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    getAllComapnyUsers();
    getImage();
    getFormat();
    getHospitalOtherDetails();
    getLogo();
  }, []);

  const getFormat = () => {
    // sessionStorage.setItem('prescriptionConfig', JSON.stringify(config));

    axios
      .post("/api/doctor/prescriptionformat/get", {}, headers)
      .then((response) => {
        if (response?.data?.prescription_format) {
          sessionStorage.setItem(
            "prescriptionConfig",
            JSON.stringify(response.data?.prescription_format)
          );
        }
      })
      .catch((error) => {
        console.log(error);
        // navigate("*");
      });
    // alert('Prescription format saved successfully!');
  };

  const getLogo = () => {
    axios
      .post(
        "/api/doctor/hospital_other_details/get/logo",
        {},
        {
          ...headers,
          responseType: "arraybuffer", // Ensure binary response
        }
      )
      .then((response) => {
        if (response.data) {
          const contentType = response.headers["content-type"];
          const blob = new Blob([response.data], { type: contentType });
          const reader = new FileReader();

          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            const base64Image = reader.result;
            sessionStorage.setItem("hospitalLogo", base64Image);
          };
        }
      })
      .catch((error) => {
        console.error("Error fetching the template:", error);
      });
  };

  const getHospitalOtherDetails = () => {
    axios
      .post(`/api/doctor/hospital_other_details/get`, {}, headers)
      .then((response) => {
        const newData = response?.data[0];
        // console.log("newData", newData);
        sessionStorage.setItem("hospitalInfo", JSON.stringify(newData));
      })
      .catch((error) => {
        console.log("Error");
      });
  };

  const obj = {};

  const [Doctor, setDoctor] = useState({});

  const getAllComapnyUsers = () => {
    axios
      .post("/api/doctor/userdetail/get", obj, headers)
      .then((response) => {
        // console.log(response.data[0]);
        sessionStorage.setItem("Doctor", JSON.stringify(response?.data[0]));
        if (response?.data[0].user_type_id == 2) {
          axios
            .post(
              "/api/doctor/userprofile/getAll",
              { userdetail_id: response.data[0]?.id },
              headers
            )
            .then((res) => {
              // console.log(res.data[0]);
              sessionStorage.setItem(
                "DoctorProfille",
                JSON.stringify(res.data[0])
              );
              sessionStorage.setItem("UserID", JSON.stringify(0));
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          sessionStorage.setItem("UserID", response.data[0].id);
        }
        setDoctor(response.data[0]);
        sessionStorage.setItem("doctorId", response.data[0].id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        // Click is outside of profile dropdown, close it
        setshowProfile(false);
      }
    };

    // Add event listener when component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileRef]);

  useEffect(() => {
    // Retrieving data from sessionStorage
    const storedErplist = sessionStorage.getItem("erplist");

    if (storedErplist) {
      try {
        // Parsing the JSON string to an array of objects
        const parsedErplist = JSON.parse(storedErplist);
        setErplist(parsedErplist);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  }, []);

  const OPDMenu = [
    {
      className: "h-6 mb-1 mt-1 w-full pl-9",
      label: "My Appointments",
      to: "/doctorAppointments",
    },
    {
      className: "h-6 mb-1 mt-1 w-full pl-9",
      label: "My Patients",
      to: "/myPatients",
    },
    ,
    {
      className: "h-6 mb-1 mt-1 w-full pl-9",
      label: "My OPD Settings",
      to: "/settings",
    },
  ].filter(Boolean);

  const IPDMenu = [
    {
      className: "h-6 mb-1 mt-1 w-full pl-9",
      label: "Patient Admission",
      to: "/roombooking",
    },
    {
      className: "h-6 mb-1 mt-1 w-full pl-9",
      label: "Manage Patients",
      to: "/roombooking/PatientManage",
    },
  ].filter(Boolean);

  const HospitalAdministration = [
    {
      className: "h-6 mb-1 mt-1 w-full pl-9",
      label: "Users Management",
      to: "/user/management/all",
    },
    {
      className: "h-6 mb-1 mt-1 w-full pl-9",
      label: "OPD Settings",
      to: "/hospitalsettings",
    },
    {
      className: "h-6 mb-1 mt-1 w-full pl-9",
      label: "Surgery Title Setup",
      to: "/SurgeryList/get",
    },
    {
      className: "h-6 mb-1 mt-1 w-full pl-9",
      label: "O.T Setup",
      to: "/operationtheater/get",
    },
    {
      className: "h-6 mb-1 mt-1 w-full pl-9",
      label: "Operative-Notes Template",
      to: "/OperationNoteslist",
    },
    
    {
      className: "h-6 mb-1 mt-1 w-full pl-9",
      label: "Indication",
      to: "/indication/get",
    },

    {
      label: "IPD Settings",
      children: [
        {
          className: "h-6 mb-1 mt-1 w-full",
          label: "IPD Billing Setup",
          to: "/ipdbillsetup",
        },
        {
          className: "h-6 mb-1 mt-1 w-full",
          label: "IPD Ward/Bed Setup",
          to: "/ipdbedsetup",
        },
        {
          className: "h-6 mb-1 mt-1 w-full",
          label: "IPD Discharge Setup",
          to: "/ipdDischargeSetup",
        },
        {
          className: "h-6 mb-1 mt-1 w-full",
          label: "Religion Setup",
          to: "/religinDisplay",
        },
        {
          className: "h-6 mb-1 mt-1 w-full",
          label: "IPD Templates",
          to: "/ipdTemplateSetup",
        },
      ],
    },
  ].filter(Boolean);

  const reports = [
    {
      className: "h-6 mb-1 mt-1 w-full pl-9",
      label: "My Reports",
      to: "/myreports",
    },
    {
      className: "h-6 mb-1 mt-1 w-full pl-9",
      label: "Hospital Reports",
      to: "/hospitalreports",
    },
    {
      className: "h-6 mb-1 mt-1 w-full pl-9",
      // label: "ReportUSGPatient",
      label: "Monthly USG Report",
      to: "/reportUSGpatient",
    },
    {
      className: "h-6 mb-1 mt-1 w-full pl-9",
      // label: "ReportUSGPatient",
      label: "Pre-Existing Report",
      to: "/reportpreexistingcondition",
    },
    {
      label: "OPD Reports",
      children: [
        {
          className: "h-6 mb-1 mt-1 w-full pl-9",
          label: "Revenue Reports",
          to: "/revenuereports",
        },
        {
          className: "h-6 mb-1 mt-1 w-full pl-9",
          label: "New Patients Report",
          to: "/newpientsreports",
        },
        ,
        {
          className: "h-6 mb-1 mt-1 w-full pl-9",
          label: "Old Patients Report",
          to: "/oldpientsreports",
        },
        {
          className: "h-6 mb-1 mt-1 w-full pl-9",
          label: "Top Symptoms Report",
          to: "/topsymptomsreports",
        },
        {
          className: "h-6 mb-1 mt-1 w-full pl-9",
          label: "Top Diagnosis Report",
          to: "/topdiagnosisreports",
        },
      ],
    },
  ].filter(Boolean);

  const [profileImage, setProfileImage] = useState(null);
  //const logonameset = { logoname:"prescription" };
  const logonameset = { logoname: "home" };
  const getImage = async () => {
    try {
      const response = await axios.post(
        "/api/doctor/hospital_logo/downloadlogo",
        logonameset,
        {
          ...headers,
          responseType: "arraybuffer",
        }
      );
      const contentType = response.headers["content-type"];
      const blob = new Blob([response.data], { type: contentType });
      const url = window.URL.createObjectURL(blob);
      setProfileImage(url);
      // console.log(setProfileImage);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };
  const doctorFirstName = Doctor?.name?.split(" ")[0];
  // console.log("profileImage");
  // return (
  //   <>
  //     {token != null ? (
  //       <div className="flex  w-full">
  //         <Sidebar transitionDuration={700}>
  //           <div className="flex flex-row gap-[22px] items-center justify-start ml-6 md:ml-[0] mr-[45px] mt-[21px] pr-2 w-[74%]">
  //             <MdMenu
  //               onClick={() => collapseSidebar(!collapsed)}
  //               className="h-[31px] w-[31px] absolute "
  //               src="images/img_materialsymbolsmenu.svg"
  //               alt="materialsymbols"
  //             />

  //             <div className="flex flex-row gap-3  items-center justify-start w-[160px]">
  //               <Text
  //                 className="text-2xl md:text-[22px] ml-14 text-blue_gray-400_01 sm:text-xl tracking-[0.20px] w-[85px]"
  //                 size="txtInterSemiBold24"
  //               >
  //                 {/* <span>DigiTonic</span> */}
  //               </Text>
  //             </div>
  //           </div>
  //           <div
  //             className={
  //               collapsed
  //                 ? "flex flex-row gap-[22px]  items-center justify-start ml-5 md:ml-[0] mr-[45px] mt-[21px] pr-2 w-[90%]"
  //                 : "flex flex-row gap-[22px] bg-zinc-300 rounded-[10px] items-center justify-start ml-6 md:ml-[0] mr-[45px] mt-[21px] pr-2 w-[90%]"
  //             }
  //             onClick={() => setshowProfile(!showProfile)}
  //           >
  //             <div className="flex flex-row gap-3  items-center justify-start w-full p-2 ">
  //               <FaUserCircle className="h-6 w-6 text-blue-500 ml-0 " />
  //               {!collapsed && (
  //                 <Text
  //                   className={`text-l md:text-[22px] ml-0 text-blue-500 sm:text-xl tracking-[0.20px]  backdrop-blur-3xl  w-full whitespace-nowrap overflow-hidden`}
  //                   size="txtInterSemiBold24"
  //                 >
  //                   Welcome {Doctor?.user_type_id === 2 ? "Dr. " : ""}
  //                   {Doctor?.name?.split(" ")[0]}
  //                 </Text>
  //               )}
  //             </div>
  //             <div
  //               ref={profileRef}
  //               className={`${showProfile && !collapsed
  //                 ? "absolute top-[105px] left-3"
  //                 : "hidden"
  //                 } z-50 items-center justify-center  rounded-lg shadow-sm w-60 backdrop-blur-3xl border-4  dark:bg-gray-700`}
  //             >
  //               <div className="flex flex-row items-start justify-between w-[100%]">
  //                 {/* <button className="text-indigo-900 text-3xl" onClick={() => setshowProfile(!showProfile)}>X</button> */}
  //                 <div className="flex w-[85%] items-center justify-center"></div>
  //                 <div className="flex items-start justify-end pr-2 pt-2 w-[15%]">
  //                   <IoMdClose
  //                     className="text-blue_gray-400_01  text-2xl rounded-full hover:ring-1 hover:bg-gray-100"
  //                     onClick={() => setshowProfile(!showProfile)}
  //                   />
  //                 </div>
  //               </div>
  //               <div className="grid grid-cols-1 gap-2 px-2 py-2 w-full">
  //                 <Text
  //                   className="text-l md:text-[22px] ml-0 text-white-400_01 sm:text-xl tracking-[0.20px] w-[20px] whitespace-nowrap"
  //                   size="txtInterSemiBold24"
  //                 >
  //                   {Doctor?.name}
  //                 </Text>
  //                 <Text
  //                   className="text-sm md:text-[22px] ml-0 text-white-400_01 sm:text-xl tracking-[0.20px] w-[20px] whitespace-nowrap"
  //                   size="txtInterSemiBold16"
  //                 >
  //                   Profession: {Doctor?.user_type_name}
  //                 </Text>
  //                 <Text
  //                   className="text-sm md:text-[22px] ml-0 text-white-400_01 sm:text-xl tracking-[0.20px] w-[20px] whitespace-nowrap"
  //                   size="txtInterSemiBold16"
  //                 >
  //                   Username: {Doctor?.login_username}
  //                 </Text>

  //                 <Text
  //                   className="text-sm md:text-[22px] ml-0 text-white-400_01 sm:text-xl tracking-[0.20px] w-[20px] whitespace-nowrap"
  //                   size="txtInterSemiBold16"
  //                 >
  //                   Email: {Doctor?.email}
  //                 </Text>
  //                 <Text
  //                   className="text-sm md:text-[22px] ml-0 text-white-400_01 sm:text-xl tracking-[0.20px] w-[20px] whitespace-nowrap"
  //                   size="txtInterSemiBold16"
  //                 >
  //                   Mobile: {Doctor?.mobilenumber}
  //                 </Text>
  //                 <Text
  //                   className="text-sm md:text-[22px] ml-0 text-white-400_01 sm:text-xl tracking-[0.20px] w-[20px] whitespace-nowrap"
  //                   size="txtInterSemiBold16"
  //                 >
  //                   Hospital: {hospitalName}
  //                 </Text>
  //                 <div>
  //                   <button
  //                     className="cursor-pointer font-small mb-1.5 rounded-[5px] text-center tracking-[0.20px] font-medium  text-blue-400 sm:text-xl text-sm md:text-[22px]"
  //                     onClick={() => navigate(`/MyProfile/MyProfile`)}
  //                   >
  //                     My Profile
  //                   </button>
  //                 </div>
  //               </div>
  //               <div className="grid grid-cols-1 gap-2 px-5 md:px-2 py-2 w-full items-center justify-center">
  //                 <div className="px-2 md:p-0 items-center justify-center">
  //                   <Menu
  //                     transitionDuration={700}
  //                     menuItemStyles={{
  //                       button: {
  //                         padding: 0,
  //                         gap: "8px",
  //                         color: "#5b5b5b",
  //                         fontWeight: 600,
  //                         fontSize: "14px",
  //                         fontFamily: "Inter",
  //                         maxHeight: "35px",
  //                       },
  //                     }}
  //                     // mt-[26px]
  //                     className="flex flex-col items-center justify-start ml-3 m-0 py-0 md:pr-10 sm:pr-5 pr-[20px] w-[39%]  "
  //                   >
  //                     <MenuItem
  //                       icon={
  //                         <MdLogout className="h-5 mb-3 mt-3  w-6 text-gray-800" />
  //                       }
  //                       // component={<Link to="/logout" />}
  //                       onClick={() => {
  //                         sessionStorage.clear();
  //                         navigate(`/`);
  //                       }}
  //                     >
  //                       Log Out
  //                     </MenuItem>
  //                   </Menu>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //           <div className="max-h-[80vh] overflow-auto w-30 overflow-x-hidden p-2">
  //             <Menu
  //               transitionDuration={700}
  //               menuItemStyles={{
  //                 button: {
  //                   padding: 0,
  //                   gap: "8px",
  //                   color: "#5b5b5b",
  //                   fontWeight: 600,
  //                   fontSize: "14px",
  //                   fontFamily: "Inter",
  //                   maxHeight: "35px",
  //                 },
  //               }}
  //               className="flex flex-col items-center justify-start ml-2 m-0 py-0 md:pr-10 sm:pr-5 pr-[20px] w-[39%]"
  //             >
  //               <SubMenu
  //                 // style={{ maxHeight: "100px" }}
  //                 icon={
  //                   // <FaChartPie className="h-5 mb-2 mt-3  w-full text-gray-800 text-sm" />
  //                   <img src={OPDImages} className="h-[18px] w-[17px] ml-1" />
  //                 }
  //                 label="My OPD"
  //                 disabled={collapsed}
  //               >
  //                 {OPDMenu?.map((menu, i) => (
  //                   <MenuItem
  //                     key={`itemMenu${i}`}
  //                     {...menu}
  //                     onClick={() => {
  //                       if (menu.label === "Settings") {
  //                         sessionStorage.setItem("Stab", "Profile");
  //                       }
  //                       navigate(menu.to);
  //                     }}
  //                     className={
  //                       menu.to === location.pathname
  //                         ? "bg-gray-200 text-blue-500 shadow-md h-5  mt-1  w-full pl-9 "
  //                         : "h-5 w-full  mt-1 pl-9 overflow-hidden"
  //                     }
  //                   >
  //                     <Link
  //                       className={
  //                         menu.to === location.pathname
  //                           ? " text-teal-300  "
  //                           : "h-6 mb-1 w-full "
  //                       }
  //                       to={menu.to}
  //                     >
  //                       <span style={{ marginRight: "5px" }}>&#8226;</span>
  //                       {menu.label}
  //                     </Link>
  //                   </MenuItem>
  //                 ))}
  //               </SubMenu>

  //               <MenuItem
  //                 icon={
  //                   <img
  //                     src={AppointmentsImage}
  //                     className="h-[18px] w-[17px]"
  //                   />
  //                 }
  //                 component={<Link to="/appointmentsmanagements  " />}
  //                 // className="h-5 w-full  mt-3  pl-1 overflow-hidden"
  //                 className={`h-5 mt-3 pl-1 w-full ${isappointmentsmanagements
  //                   ? "bg-gray-200 text-amber-500 shadow-md"
  //                   : "text-black"
  //                   }`}
  //               >
  //                 <span
  //                   className={` ${isappointmentsmanagements ? " text-teal-300" : ""
  //                     }`}
  //                 >
  //                   {" "}
  //                   Appointment Managements
  //                 </span>
  //               </MenuItem>

  //               <MenuItem
  //                 icon={
  //                   <img
  //                     src={PatientManagement}
  //                     className="h-[18px] w-[17px]"
  //                   />
  //                 }
  //                 component={<Link to="/patientmanagement/allpatientlist" />}
  //                 onClick={() => {
  //                   sessionStorage.setItem("tab", "Bank Accounts");
  //                 }}
  //                 // className="bg-gray-200 text-blue-500 shadow-md h-5 mt-3  pl-1 w-full"
  //                 className={`h-5 mt-2 pl-1 w-full ${isPatientManagemnet
  //                   ? "bg-gray-200 text-blue-500 shadow-md"
  //                   : "text-blue-500"
  //                   }`}
  //               >
  //                 <span
  //                   className={` ${isPatientManagemnet ? " text-teal-300 " : ""}`}
  //                 >
  //                   {" "}
  //                   Patients Managements
  //                 </span>
  //               </MenuItem>

  //               <SubMenu
  //                 // style={{ maxHeight: "100px" }}
  //                 icon={
  //                   // <IoMdPaper className="h-5 mb-2 mt-3  w-full text-gray-800" />
  //                   <img
  //                     src={RoomBook}
  //                     className="h-[18px] ml-1 mb-4 mt-4  w-[17px] text-gray-800"
  //                   />
  //                 }
  //                 label="IPD Menu"
  //                 disabled={collapsed}
  //               >
  //                 {IPDMenu?.map((menu, i) => (
  //                   <MenuItem
  //                     key={`itemMenu${i}`}
  //                     {...menu}
  //                     onClick={() => {
  //                       if (menu.label === "Add Patient") {
  //                         sessionStorage.setItem("tab", "Add Patient");
  //                         navigate(menu.to);
  //                       }
  //                     }}
  //                     className={
  //                       menu.to === location.pathname
  //                         ? "bg-gray-200 text-blue-500 shadow-md h-5  mt-1  w-full pl-9 "
  //                         : "h-5 w-full  mt-1 pl-9 overflow-hidden"
  //                     }
  //                   >
  //                     <Link
  //                       className={
  //                         menu.to === location.pathname
  //                           ? " text-teal-300  "
  //                           : "h-5  w-full "
  //                       }
  //                       to={menu.to}
  //                     >
  //                       <span style={{ marginRight: "5px" }}>&#8226;</span>
  //                       {menu.label}
  //                     </Link>
  //                   </MenuItem>
  //                 ))}
  //               </SubMenu>

  //               <SubMenu
  //                 // style={{ maxHeight: "100px" }}
  //                 icon={
  //                   // <IoMdPaper className="h-5 mb-2 mt-3  w-full text-gray-800" />
  //                   <img
  //                     src={ReportsNew}
  //                     className="h-[18px] ml-1 mb-4 mt-4  w-[17px] text-gray-800"
  //                   />
  //                 }
  //                 label="Reports"
  //                 disabled={collapsed}
  //               >
  //                 {reports.map((menu, i) => {
  //                   if (menu.children) {
  //                     return (
  //                       <SubMenu
  //                         key={`submenu${i}`}
  //                         label={menu.label}
  //                         className="pl-9 pr-1"
  //                       >
  //                         {menu.children.map((child, j) => (
  //                           <MenuItem
  //                             key={`itemMenuChild${j}`}
  //                             {...child}
  //                             onClick={() => {
  //                               navigate(child.to);
  //                               sessionStorage.setItem(
  //                                 "tab",
  //                                 "Revenue Summary Report",
  //                               );
  //                             }}
  //                             className={
  //                               child.to === location.pathname
  //                                 ? "bg-gray-200 text-blue-500 shadow-md h-5 mt-1 w-full pl-2"
  //                                 : "h-5 w-full mt-1 pl-2 overflow-hidden"
  //                             }
  //                           >
  //                             <Link
  //                               className={
  //                                 child.to === location.pathname
  //                                   ? "text-teal-300"
  //                                   : "h-5 w-full"
  //                               }
  //                               to={child.to}
  //                             >
  //                               <span style={{ marginRight: "5px" }}>
  //                                 &#8226;
  //                               </span>
  //                               {child.label}
  //                             </Link>
  //                           </MenuItem>
  //                         ))}
  //                       </SubMenu>
  //                     );
  //                   } else {
  //                     return (
  //                       <MenuItem
  //                         key={`itemMenu${i}`}
  //                         {...menu}
  //                         onClick={() => {
  //                           if (menu.label === "OPD Settings") {
  //                             sessionStorage.setItem("tab", "Specializations");
  //                           }
  //                           navigate(menu.to);
  //                         }}
  //                         className={
  //                           menu.to === location.pathname
  //                             ? "bg-gray-200 text-blue-500 shadow-md h-5 mt-1 w-full pl-9"
  //                             : "h-5 w-full mt-1 pl-9 overflow-hidden"
  //                         }
  //                       >
  //                         <Link
  //                           className={
  //                             menu.to === location.pathname
  //                               ? "text-teal-300"
  //                               : "h-5 w-full"
  //                           }
  //                           to={menu.to}
  //                         >
  //                           <span style={{ marginRight: "5px" }}>&#8226;</span>
  //                           {menu.label}
  //                         </Link>
  //                       </MenuItem>
  //                     );
  //                   }
  //                 })}
  //               </SubMenu>

  //               <SubMenu
  //                 icon={
  //                   <img src={HosSetting} className="h-[18px] w-[17px] ml-1" />
  //                 }
  //                 label="Hospital Administration"
  //                 disabled={collapsed}
  //               >
  //                 {HospitalAdministration.map((menu, i) => {
  //                   if (menu.children) {
  //                     return (
  //                       <SubMenu
  //                         key={`submenu${i}`}
  //                         label={menu.label}
  //                         className="pl-9 pr-1"
  //                       >
  //                         {menu.children.map((child, j) => (
  //                           <MenuItem
  //                             key={`itemMenuChild${j}`}
  //                             {...child}
  //                             onClick={() => navigate(child.to)}
  //                             className={
  //                               child.to === location.pathname
  //                                 ? "bg-gray-200 text-blue-500 shadow-md h-5 mt-1 w-full pl-2"
  //                                 : "h-5 w-full mt-1 pl-2 overflow-hidden"
  //                             }
  //                           >
  //                             <Link
  //                               className={
  //                                 child.to === location.pathname
  //                                   ? "text-teal-300"
  //                                   : "h-5 w-full"
  //                               }
  //                               to={child.to}
  //                             >
  //                               <span style={{ marginRight: "5px" }}>
  //                                 &#8226;
  //                               </span>
  //                               {child.label}
  //                             </Link>
  //                           </MenuItem>
  //                         ))}
  //                       </SubMenu>
  //                     );
  //                   } else {
  //                     return (
  //                       <MenuItem
  //                         key={`itemMenu${i}`}
  //                         {...menu}
  //                         onClick={() => {
  //                           if (menu.label === "OPD Settings") {
  //                             sessionStorage.setItem("tab", "Specializations");
  //                           }
  //                           navigate(menu.to);
  //                         }}
  //                         className={
  //                           menu.to === location.pathname
  //                             ? "bg-gray-200 text-blue-500 shadow-md h-5 mt-1 w-full pl-9"
  //                             : "h-5 w-full mt-1 pl-9 overflow-hidden"
  //                         }
  //                       >
  //                         <Link
  //                           className={
  //                             menu.to === location.pathname
  //                               ? "text-teal-300"
  //                               : "h-5 w-full"
  //                           }
  //                           to={menu.to}
  //                         >
  //                           <span style={{ marginRight: "5px" }}>&#8226;</span>
  //                           {menu.label}
  //                         </Link>
  //                       </MenuItem>
  //                     );
  //                   }
  //                 })}
  //               </SubMenu>
  //             </Menu>
  //           </div>
  //         </Sidebar>
  //         <div className="overflow-scroll h-[100vh] w-full">
  //           <Outlet />
  //         </div>
  //       </div>
  //     ) : (
  //       navigate(`/loginempty`)
  //     )}
  //   </>
  // );

  return (
    <>
      {token != null ? (
        <div className="flex flex-col overflow-hidden   w-full">
          <div className="flex flex-row overflow-hidden w-full gap-1">
            <Sidebar transitionDuration={900} className="">
              <Menu
                transitionDuration={900}
                menuItemStyles={{
                  button: {
                    padding: 0,
                    gap: "8px",
                    color: "#6e6e6e",
                    fontWeight: 600,
                    fontSize: "15px",
                    // fontFamily: "inter",
                    fontFamily: "initial",
                    maxHeight: "35px",
                  },
                }}
                className="flex flex-col items-center justify-start ml-3 m-0 py-0 md:pr-10 sm:pr-5 pr-[20px] w-[39%]  "
              >
                <MenuItem
                  rootStyles={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: "40px",
                    paddingTop: "4px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "",
                  }}
                >
                  {/* <div className="flex flex-row gap-[22px] items-center md:ml-[0] py-4 px-2 w-[100%]"> */}
                  <div
                    className={
                      collapsed ? "flex items-center m-5" : "flex items-center"
                    }
                  >
                    <MdMenu
                      onClick={() => collapseSidebar(!collapsed)}
                      className="h-[31px] w-[31px]"
                      src="images/img_materialsymbolsmenu.svg"
                      alt="materialsymbols"
                    />
                  </div>
                  <div className="flex flex-row items-center justify-start w-full pl-2">
                    <Text
                      className="text-xl md:text-[22px] ml-3 text-purple-500 sm:text-xl tracking-[0.20px] w-[85px]"
                      size="txtInterSemiBold24"
                      style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)" }}
                    >
                      DigiTonic
                    </Text>
                  </div>
                  {/* </div> */}
                </MenuItem>
                <div className="max-h-[85vh] w-30 overflow-y-auto overflow-x-hidden mt-5 pr-1 ">
                  <SubMenu
                    // style={{ maxHeight: "100px" }}
                    icon={
                      // <FaChartPie className="h-5 mb-2 mt-3  w-full text-gray-800 text-sm" />
                      <img
                        src={OPDImages}
                        className="h-[18px] w-[17px] ml-1"
                        // className="h-5 mb-2 mt-3  w-full text-blue-500 text-sm"
                      />
                    }
                    label="My OPD"
                    disabled={collapsed}
                  >
                    {OPDMenu?.map((menu, i) => (
                      <MenuItem
                        key={`itemMenu${i}`}
                        {...menu}
                        onClick={() => {
                          if (menu.label === "Settings") {
                            sessionStorage.setItem("Stab", "Profile");
                          }
                          navigate(menu.to);
                        }}
                        className={
                          menu.to === location.pathname
                            ? "bg-gray-200 text-blue-500 shadow-md h-5 mb-1 mt-1  w-full pl-9 "
                            : "h-5 w-full  mt-1 pl-9 overflow-hidden"
                        }
                      >
                        <Link
                          className={
                            menu.to === location.pathname
                              ? " text-teal-300 "
                              : "h-6 mb-1 w-full "
                          }
                          to={menu.to}
                        >
                          <span style={{ marginRight: "5px" }}>&#8226;</span>
                          {menu.label}
                        </Link>
                      </MenuItem>
                    ))}
                  </SubMenu>

                  <MenuItem
                    icon={
                      <img
                        src={AppointmentsImage}
                        className="h-[18px] w-[17px]"
                      />
                    }
                    component={<Link to="/appointmentsmanagements" />}
                    className={`h-5 mt-3 pl-1 w-full ${
                      isappointmentsmanagements ? "bg-gray-200 " : "text-black"
                    }`}
                  >
                    <span
                      className={` ${
                        isappointmentsmanagements
                          ? " text-teal-300 "
                          : "text-black "
                      }`}
                    >
                      {" "}
                      Appointment Managements
                    </span>
                  </MenuItem>

                  <MenuItem
                    icon={
                      <img
                        src={PatientManagement}
                        className="h-[18px] w-[17px]"
                      />
                    }
                    component={<Link to="/patientmanagement/allpatientlist" />}
                    onClick={() => {
                      sessionStorage.setItem("tab", "Bank Accounts");
                    }}
                    // className="bg-gray-200 text-blue-500 shadow-md h-5 mt-3  pl-1 w-full"
                    className={`h-5 mt-2 pl-1 w-full ${
                      isPatientManagemnet
                        ? "bg-gray-200 text-blue-500 "
                        : "text-blue-500"
                    }`}
                  >
                    <span
                      className={` ${isPatientManagemnet ? " text-teal-300 " : ""}`}
                    >
                      {" "}
                      Patients Managements
                    </span>
                  </MenuItem>
                  <MenuItem
                    icon={
                      <AiOutlinePlusCircle className="h-4  w-full text-blue-500" />
                    }
                    component={<Link to="/operationtheater/booking/get" />}
                    className={`h-5 mt-3 pl-1 w-full ${
                      isOtManagement ? "bg-gray-200 " : "text-black"
                    }`}
                  >
                    <span
                      className={` ${
                        isOtManagement ? " text-teal-300 " : "text-black "
                      }`}
                    >
                      {" "}
                      OT Managements
                    </span>
                  </MenuItem>

                  <SubMenu
                    // style={{ maxHeight: "100px" }}
                    icon={
                      // <IoMdPaper className="h-5 mb-2 mt-3  w-full text-gray-800" />
                      <img
                        src={RoomBook}
                        className="h-[18px] ml-1 mb-4 mt-4  w-[17px] text-gray-800"
                        // className="h-[18px] mb-2 mt-3  w-[17px] text-blue-500 text-sm"
                      />
                    }
                    label="IPD Menu"
                    disabled={collapsed}
                  >
                    {IPDMenu?.map((menu, i) => (
                      <MenuItem
                        key={`itemMenu${i}`}
                        {...menu}
                        onClick={() => {
                          if (menu.label === "Add Patient") {
                            sessionStorage.setItem("tab", "Add Patient");
                            navigate(menu.to);
                          }
                        }}
                        className={
                          menu.to === location.pathname
                            ? "bg-gray-200 text-teal-300 shadow-md h-5 mb-1 mt-1  w-full pl-9 "
                            : "h-5 w-full  mt-1 pl-9 overflow-hidden"
                        }
                      >
                        <Link
                          className={
                            menu.to === location.pathname
                              ? " text-teal-300 "
                              : "h-6 mb-1 w-full "
                          }
                          to={menu.to}
                        >
                          <span style={{ marginRight: "5px" }}>&#8226;</span>
                          {menu.label}
                        </Link>
                      </MenuItem>
                    ))}
                  </SubMenu>

                  <SubMenu
                    // style={{ maxHeight: "100px" }}
                    icon={
                      // <IoMdPaper className="h-5 mb-2 mt-3  w-full text-gray-800" />
                      <img
                        src={ReportsNew}
                        className="h-[18px] ml-1 mb-4 mt-4  w-[17px] text-gray-800"
                        // className="h-[18px] mb-2 mt-3 ml-4  w-[1px] text-blue-500 text-sm"
                      />
                    }
                    label="Reports"
                    disabled={collapsed}
                  >
                    {reports.map((menu, i) => {
                      if (menu.children) {
                        return (
                          <SubMenu
                            key={`submenu${i}`}
                            label={menu.label}
                            className="pl-9 pr-1"
                          >
                            {menu.children.map((child, j) => (
                              <MenuItem
                                key={`itemMenuChild${j}`}
                                {...child}
                                onClick={() => {
                                  navigate(child.to);
                                  sessionStorage.setItem(
                                    "tab",
                                    "Revenue Summary Report"
                                  );
                                }}
                                className={
                                  child.to === location.pathname
                                    ? "bg-gray-200 text-blue-500 h-5 mt-1 w-full pl-2"
                                    : "h-5 w-full mt-1 pl-2 overflow-hidden"
                                }
                              >
                                <Link
                                  className={
                                    child.to === location.pathname
                                      ? "text-teal-300"
                                      : "h-5 w-full"
                                  }
                                  to={child.to}
                                >
                                  <span style={{ marginRight: "5px" }}>
                                    &#8226;
                                  </span>
                                  {child.label}
                                </Link>
                              </MenuItem>
                            ))}
                          </SubMenu>
                        );
                      } else {
                        return (
                          <MenuItem
                            key={`itemMenu${i}`}
                            {...menu}
                            onClick={() => {
                              if (menu.label === "OPD Settings") {
                                sessionStorage.setItem(
                                  "tab",
                                  "Specializations"
                                );
                              }
                              navigate(menu.to);
                            }}
                            className={
                              menu.to === location.pathname
                                ? "bg-gray-200 text-blue-500 h-5 mt-1 w-full pl-9"
                                : "h-5 w-full mt-1 pl-9 overflow-hidden"
                            }
                          >
                            <Link
                              className={
                                menu.to === location.pathname
                                  ? "text-teal-300"
                                  : "h-5 w-full"
                              }
                              to={menu.to}
                            >
                              <span style={{ marginRight: "5px" }}>
                                &#8226;
                              </span>
                              {menu.label}
                            </Link>
                          </MenuItem>
                        );
                      }
                    })}
                  </SubMenu>

                  <SubMenu
                    icon={
                      <img
                        src={HosSetting}
                        className="h-[18px] w-[17px] ml-1"
                      />
                    }
                    label="Hospital Administration"
                    disabled={collapsed}
                  >
                    {HospitalAdministration.map((menu, i) => {
                      if (menu.children) {
                        return (
                          <SubMenu
                            key={`submenu${i}`}
                            label={menu.label}
                            className="pl-9 pr-2"
                          >
                            {menu.children.map((child, j) => (
                              <MenuItem
                                key={`itemMenuChild${j}`}
                                {...child}
                                onClick={() => navigate(child.to)}
                                className={
                                  child.to === location.pathname
                                    ? "bg-gray-200 text-blue-500 shadow-md h-5 mb-1 mt-1  w-full pl-9 "
                                    : "h-5 w-full  mt-1 pl-9 overflow-hidden"
                                }
                              >
                                <Link
                                  className={
                                    child.to === location.pathname
                                      ? "text-teal-300"
                                      : "h-5 w-full"
                                  }
                                  to={child.to}
                                >
                                  <span style={{ marginRight: "5px" }}>
                                    &#8226;
                                  </span>
                                  {child.label}
                                </Link>
                              </MenuItem>
                            ))}
                          </SubMenu>
                        );
                      } else {
                        return (
                          <MenuItem
                            key={`itemMenu${i}`}
                            {...menu}
                            onClick={() => {
                              if (menu.label === "OPD Settings") {
                                sessionStorage.setItem(
                                  "tab",
                                  "Specializations"
                                );
                              }
                              navigate(menu.to);
                            }}
                            className={
                              menu.to === location.pathname
                                ? "bg-gray-200 text-blue-500 h-5 mt-1 w-full pl-9"
                                : "h-5 w-full mt-1 pl-9 overflow-hidden"
                            }
                          >
                            <Link
                              className={
                                menu.to === location.pathname
                                  ? "text-teal-300"
                                  : "h-5 w-full"
                              }
                              to={menu.to}
                            >
                              <span style={{ marginRight: "5px" }}>
                                &#8226;
                              </span>
                              {menu.label}
                            </Link>
                          </MenuItem>
                        );
                      }
                    })}
                  </SubMenu>
                </div>
              </Menu>
            </Sidebar>
            <div
              // id="resizer"
              className=" bg-gray-300  cursor-col-resize w-[2px] hover:opacity-100 z-50"
            ></div>
            <div className="overflow-hidden h-[100vh] w-full">
              <nav class="bg-white shadow-md over">
                <div class="container flex p-1 items-center">
                  <div className="flex flex-row items-center justify-start w-full pl-2 h-8">
                    <Text
                      className="text-base md:text-[22px] text-blue-500 sm:text-sm tracking-[0.20px] w-full font-bold"
                      // size="txtInterSemiBold20"
                      style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)" }}
                    >
                      {Doctor?.hospital_name}
                    </Text>
                  </div>
                  <div class="flex items-center justify-around w-full">
                    <div
                      className={
                        collapsed
                          ? "flex flex-row gap-[22px]  items-center justify-around  md:ml-[0]   w-[90%]"
                          : "flex flex-row gap-[22px]  rounded-[10px] items-center justify-around  md:ml-[0]  w-[90%]"
                      }
                    >
                      <div className="flex flex-row gap-3 items-center justify-end  w-full  ">
                        {/* {collapsed && ( */}
                        <Text
                          className={`text-l md:text-[22px] text-blue-500 sm:text-xl tracking-[0.20px]  backdrop-blur-3xl  whitespace-nowrap`}
                          size="txtInterSemiBold24"
                        >
                          Welcome{" "}
                          {doctorFirstName
                            ? Doctor?.user_type_name === "Doctor"
                              ? " Dr. " + doctorFirstName
                              : doctorFirstName
                            : ""}
                        </Text>
                        {/* )} */}
                        <FaUserCircle
                          className="h-7 w-7 text-blue-500 cursor-pointer"
                          onClick={() => setshowProfile(!showProfile)}
                        />
                      </div>
                      <div
                        ref={profileRef}
                        className={`${
                          showProfile
                            ? "absolute top-[35px] right-10 z-[1000]"
                            : "hidden"
                        } z-50 rounded-xl shadow-lg backdrop-blur-3xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 transition-all duration-300 ease-in-out transform ${
                          showProfile
                            ? "scale-100 opacity-100"
                            : "scale-95 opacity-0"
                        }`}
                      >
                        <div className="flex justify-end p-2">
                          <IoMdClose
                            className="text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white text-xl cursor-pointer transition-colors duration-200"
                            onClick={() => setshowProfile(!showProfile)}
                          />
                        </div>

                        <div className="px-6 py-4 text-gray-700 dark:text-gray-200">
                          <Text className="text-lg font-semibold mb-2">
                            {Doctor?.name}
                          </Text>
                          <Text className="text-sm mb-2">
                            <span className="font-semibold">
                              Profession: {Doctor?.user_type_name}
                            </span>
                          </Text>
                          <Text className="text-sm mb-2">
                            <span className="font-semibold">
                              Username: {Doctor?.login_username}
                            </span>
                          </Text>
                          <Text className="text-sm mb-2">
                            <span className="font-semibold">
                              Email: {Doctor?.email}
                            </span>
                          </Text>
                          <Text className="text-sm mb-2">
                            <span className="font-semibold">
                              Mobile: {Doctor?.mobilenumber}
                            </span>
                          </Text>
                          <Text className="text-sm mb-2">
                            <span className="font-semibold">
                              Hospital: {hospitalName}
                            </span>
                          </Text>
                          <div>
                            <button
                              className="cursor-pointer font-small mb-1.5 rounded-[5px] text-center tracking-[0.20px] font-medium  text-blue-400 sm:text-xl text-sm md:text-[22px]"
                              onClick={() => navigate(`/MyProfile/MyProfile`)}
                            >
                              My Profile
                            </button>
                          </div>
                        </div>

                        <div className="flex justify-center p-4">
                          <Menu
                            menuItemStyles={{
                              button: {
                                // padding: "0.1rem 2rem",
                                gap: "0.5rem",
                                color: "#4A5568",
                                fontWeight: 600,
                                fontSize: "14px",
                                fontFamily: "Inter",
                              },
                            }}
                            className="flex flex-col border rounded-md shadow-sm items-center justify-center w-full max-w-xs hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 bg-gray-300"
                          >
                            <MenuItem
                              icon={
                                <MdLogout className="h-5 mb-3 mt-3  w-6 text-gray-800" />
                              }
                              // component={<Link to="/logout" />}
                              onClick={() => {
                                sessionStorage.clear();
                                navigate(`/`);
                              }}
                            >
                              Log Out
                            </MenuItem>
                          </Menu>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
              <div className="overflow-auto h-[calc(100vh-50px)]">
                {" "}
                {/* <-- adjust nav height here */}
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      ) : (
        navigate(`/loginempty`)
      )}
    </>
  );
};

Sidebar1.defaultProps = {};

export default Sidebar1;
