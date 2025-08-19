import React, { useEffect, useState, Component } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { Button, Img, Text } from "components";
import { Router } from "react-router-dom";
import LoginDoctor from "pages/LogInPage/LoginDoctor";

const HomeOneNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        style={props.style}
        className={`sticky top-0 z-50 ${props.className}`}
      >
        <div className="hidden md:flex w-0 items-end justify-end md:w-full">
          <button className="text-indigo-900 text-3xl" onClick={toggleNavbar}>
            {isOpen ? "X" : "☰"}
          </button>
        </div>
        <div
          className={`flex md:flex-col flex-1 flex-row gap-[40px] md:gap-[10px] pr-auto sm:gap-[0px] md:${isOpen ? "block" : "hidden"} items-start justify-start pl-[2%] w-[100%] md:w-full`}
        >
          <Text
            className={`${useLocation().pathname == "/" ? "text-white-A700" : "text-indigo-900"} text-lg w-auto`}
            id="home"
            size="txtPoppinsRegular18Indigo900"
          >
            <Link to="/">
              <a href="#">{props?.home}</a>
            </Link>
          </Text>
          <Text
            className={`${useLocation().pathname == "/multispecialtyHospital" ? "text-white-A700" : "text-indigo-900"} text-lg w-auto`}
            id="home"
            size="txtPoppinsRegular18Indigo900"
          >
            <Link to="/multispecialtyHospital">
              <a href="#">{props?.multispeciality}</a>
            </Link>
          </Text>
          <Text
            className={`${useLocation().pathname == "/motherandchildcare" ? "text-white-A700" : "text-indigo-900"} text-lg w-auto`}
            size="txtPoppinsRegular18Indigo900"
            id="mother"
          >
            <Link to="/motherandchildcare">
              <a href="#">{props?.motherchildcareOne}</a>
            </Link>
          </Text>
          <Text
            className={`${useLocation().pathname == "/doctorsone" ? "text-white-A700" : "text-indigo-900"} text-lg w-auto`}
            size="txtPoppinsRegular18WhiteA700"
            id="doctor"
          >
            <Link to="/doctorsone">
              <a href="">{props?.doctors}</a>
            </Link>
          </Text>
          <Text
            className={`${useLocation().pathname == "/aboutus" ? "text-white-A700" : "text-indigo-900"} text-lg w-auto`}
            size="txtPoppinsRegular18Indigo900"
            id="aboutus"
          >
            <Link to="/aboutus">
              <a href="">{props?.aboutus}</a>
            </Link>
          </Text>
          <Text
            className={`${useLocation().pathname == "/contact" ? "text-white-A700" : "text-indigo-900"} text-lg w-auto`}
            size="txtPoppinsRegular18Indigo900"
            id="contactus"
          >
            <Link to="/contact">
              <a href="">{props?.contact}</a>
            </Link>
          </Text>
          <Text
            className={`${useLocation().pathname == "/loginfordoctor" ? "text-white-A700" : "text-indigo-900"} text-lg w-auto`}
            size="txtPoppinsRegular18Indigo900"
            id="Login"
          >
            <Link to="/loginfordoctor">
              <a href="">{props?.Login}</a>
            </Link>
          </Text>
        </div>
      </div>
    </>
  );
};

HomeOneNavbar.defaultProps = {
  home: "Home",
  motherchildcareOne: "Mother & Child Care Hospital",
  multispeciality: "Multispeciality Hospital",
  services: "Services",
  doctors: "Doctors",
  aboutus: "About us",
  contact: "Contact us",
  Login: "Hospital User Login",
  searchimage: "images/img_search.svg",
  contactbuttontext: "Contact",
};

export default HomeOneNavbar;
