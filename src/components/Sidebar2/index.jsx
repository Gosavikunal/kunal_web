import React from "react";
import {
  Menu,
  MenuItem,
  Sidebar,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";
import { MdLogout, MdMenu } from "react-icons/md";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import FamilyMembers from "../../Images/FamilyMembers.jpeg";
import Appointments from "../../Images/Appointments.jpeg";
import patient_profile from "../../Images/patient_profile.jpeg";
import BookAppointmentimg from "../../Images/online-booking.png";
import { useLocation } from "react-router-dom";
import { Text } from "components";

const Sidebar2 = () => {
  let navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const location = useLocation();
  const { collapseSidebar, collapsed } = useProSidebar();
  const BookAppointment = [
    {
      className: "h-6 mb-1 mt-1 w-full pl-9",
      label: "Doctors",
      to: "/patient/bookByDoctor",
    },
    {
      className: "h-6 mb-1 mt-1 w-full pl-9",
      label: "Specializations",
      to: "/patient/bookBySpecialization",
    },
    ,
    {
      className: "h-6 mb-1 mt-1 w-full pl-9",
      label: "Symptoms",
      to: "/patient/bookBysymptoms",
    },
  ].filter(Boolean);
  return (
    <>
      {token != null ? (
        <div className="flex  w-full">
          <Sidebar>
            <div className="max-h-[80vh] ml-5 overflow-auto w-30 overflow-y-scroll overflow-x-hidden mt-2">
              <MdMenu
                onClick={() => collapseSidebar(!collapsed)}
                className="h-[31px] w-[31px] absolute "
                src="images/img_materialsymbolsmenu.svg"
                alt="materialsymbols"
              />
              <div className="flex flex-row gap-3  items-center justify-start w-[160px]">
                <Text
                  className="text-2xl md:text-[22px] ml-14 text-blue_gray-400_01 sm:text-xl tracking-[0.20px] w-[85px]"
                  size="txtInterSemiBold24"
                >
                  <span> <br></br> </span>
                </Text>
              </div>
            </div>
            <div className="max-h-[80vh] overflow-auto w-full overflow-y-hidden overflow-x-hidden p-3">
              <Menu
                transitionDuration={700}
                menuItemStyles={{
                  button: {
                    padding: 0,
                    gap: "8px",
                    color: "#5b5b5b",
                    fontWeight: 600,
                    fontSize: "14px",
                    fontFamily: "Inter",
                    maxHeight: "35px",
                  },
                }}
                className="flex flex-col items-center justify-start ml-3 m-0 py-0 md:pr-10 sm:pr-5 pr-[20px] w-[39%]  "
              >
                <SubMenu
                  icon={
                    <img
                      src={BookAppointmentimg}
                      className="h-[20px] ml-0 mb-4 mt-4  w-[20px] text-gray-800"
                    />
                  }
                  label="Book Appointment"
                  disabled={collapsed}
                >
                  {BookAppointment.map((menu, i) => (
                    <MenuItem
                      key={`itemMenu${i}`}
                      {...menu}
                      onClick={() => {
                        navigate(menu.to);
                      }}
                      className={
                        menu.to === location.pathname
                          ? "bg-gray-200 text-blue-500 shadow-md h-5 w-full pl-9"
                          : "h-5 w-full pl-9 overflow-hidden"
                      }
                    >
                      <Link
                        className={
                          menu.to === location.pathname
                            ? "text-blue-500"
                            : "h-5 w-full"
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
                      src={FamilyMembers}
                      className="h-[22px] w-[22px] mt-2 mb-2"
                    />
                  }
                  component={<Link to="/patient/allFamilyMembers" />}
                  className=""
                >
                  {" "}
                  Family Members
                </MenuItem>
                <MenuItem
                  icon={
                    <img
                      src={Appointments}
                      className="h-[22px] w-[22px] mt-2 mb-2"
                    />
                  }
                  component={<Link to="/patient/appointment" />}
                  className=""
                >
                  {" "}
                  Appointments
                </MenuItem>

                <MenuItem
                  icon={
                    <img
                      src={patient_profile}
                      className="h-[23px] w-[23px] mt-2 mb-2"
                    />
                  }
                  component={<Link to="/patient/viewProfile" />}
                  className=""
                >
                  {" "}
                  Profile
                </MenuItem>

                <MenuItem
                  icon={<MdLogout className="h-5 w-6 mt-2 text-gray-800" />}
                  onClick={() => {
                    Swal.fire({
                      title: "Are you sure?",
                      html: `You want to Log Out <span style="color: #FF5733;"></span>`,
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Yes, Log Out it!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        sessionStorage.clear();
                        navigate(`/`);
                      }
                    });
                  }}
                >
                  Log Out
                </MenuItem>
              </Menu>
            </div>
          </Sidebar>
          <div className="overflow-hidden w-full">
            <Outlet />
          </div>
        </div>
      ) : (
        navigate(`/loginempty`)
      )}
    </>
  );
};

export default Sidebar2;
