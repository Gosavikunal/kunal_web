import React from "react";
import { Link } from "react-router-dom";

import { Button, Img, Text } from "components";

const DoctorsOneDoctorscard = (props) => {
  return (
    <>
      <div className={props.className}>
        <Img
          className="h-[350px] sm:h-auto object-fill w-[317px] md:w-full rounded-t-[5px] bg-gray-200"
          alt="rectangleTwenty"
          src={props?.userimage}
        />
        <div className="bg-cyan-400_2b flex flex-col gap-[7px] items-center justify-center sm:px-5 w-[317px] md:w-full rounded-b-[5px]">
          {/* <Text
            className="text-indigo-900 text-lg"
            size="txtPoppinsRegular18Indigo900"
          >
            {props?.doctorname}
          </Text> */}
          <Text
            className="text-indigo-900 text-lg"
            size="txtPoppinsBold18Indigo900"
          >
            {props?.doctorname}
          </Text>
          <div class="h-[60px] w-[317px] truncate flex justify-center items-start">
            <Text
              className="text-indigo-900 whitespace-normal  px-5 text-sm uppercase text-center"
              size="txtPoppinsRegular18Indigo900"
            >
              {Array.isArray(props.specialization)
                ? props.specialization.length === 1
                  ? props.specialization[0]
                  : props.specialization.join(", ")
                : props.specialization}
            </Text>
            {/* <Text
              className="text-indigo-900 text-sm tracking-[2.50px] uppercase"
              size="txtPoppinsBold18Indigo900"
            >
              {props?.specialization}
            </Text> */}
          </div>
        </div>
        {/* <Button
          className="!text-white-A700_01 cursor-pointer font-poppins min-w-[317px] rounded-bl-[5px] rounded-br-[5px] text-base text-center"
          color="cyan_400"
          size="md"
          variant="fill"
        >
          {props?.viewprofile}
        </Button> */}
        {/* <Link to='/doctors'>
        </Link> */}
      </div>
    </>
  );
};

DoctorsOneDoctorscard.defaultProps = [
  {
    doctorname: "Dr. Amarish D Nanda",
    userimage: "images/amarish.jpg",
    specialization: ["Internal Medicine"],
    viewprofile: "View Profile",
  },
  {
    doctorname: "Dr. Amey Kakirde",
    userimage: "images/amey.jpg",
    specialization: [
      "Consultant Neonatologist and Pediatrician",
      "Pediatrics",
      "Neonatology",
    ],
  },

  {
    doctorname: "Dr. Amol Ghaisas",
    userimage: "images/AmolGhaisas.jpeg",
    specialization: ["Maxillofacial Surgery"],
    viewprofile: "View Profile",
  },
  {
    doctorname: "Dr. Ashish Dhande",
    userimage: "images/AshishDhande.jpg",
    specialization: ["Urology"],
    viewprofile: "View Profile",
  },
  {
    doctorname: "Dr. Bharat Jain",
    userimage: "images/BharatJain.jpeg",
    specialization: ["Cardiology & Echocardiography"],
  },
  {
    doctorname: "Dr. Hitendra Patil",
    userimage: "images/HitendraPatil.jpeg",
    specialization: ["Oncosurgery"],
  },
  {
    doctorname: "Dr. Hemant Patil",
    userimage: "images/HemantPatil.jpg",
    specialization: ["Plastic, Cosmetic & Reconstructive Surgery"],
  },
  {
    doctorname: "Dr. Hemraj Ingale",
    userimage: "images/HemrajIngale.jpg",
    specialization: ["Pediatrician & Neonatologist", "Pediatrics"],
  },
  {
    doctorname: "Dr. Kavita Barhate",
    userimage: "images/KavitaBarhate.jpeg",
    specialization: ["Neurology"],
  },
  {
    doctorname: "Dr. Keerti Patil",
    userimage: "images/KeertiPatil.jpeg",
    specialization: ["Neurology"],
  },
  {
    doctorname: "Dr. Makarand Ganpule",
    userimage: "images/makarand.jpg",
    specialization: ["Pathology"],
  },
  {
    doctorname: "Dr. Meena Pruthi",
    userimage: "images/pruthi.jpg",
    specialization: ["Internal Medicine", "Cardiology & Echocardiography"],
  },
  {
    doctorname: "Dr. Mohini Patil",
    userimage: "images/doctor.png",
    specialization: ["Obstetric & Reproductive Medicine"],
  },
  {
    doctorname: "Dr. Naren Nayak",
    userimage: "images/NarenNayak.jpeg",
    specialization: ["Neurosurgey & Spine"],
  },
  {
    doctorname: "Dr. Nikhil Patil",
    userimage: "images/nikhil.jpg",
    specialization: ["Orthopedic, Trauma & Joint Replacement"],
  },
  {
    doctorname: "Dr. Nikhil Shinde",
    userimage: "images/NikhilShinde.jpeg",
    specialization: ["Nephrology"],
  },
  {
    doctorname: "Dr. Nimesh Thakurdesai",
    userimage: "images/doctor.png",
    specialization: ["Physiotherapy"],
  },
  {
    doctorname: "Dr. Prasanna Mahajan",
    userimage: "images/prasanna.jpg",
    specialization: ["Anesthesia", "Critical Care Medicine"],
  },
  {
    doctorname: "Dr. Pradnya Ganpule",
    userimage: "images/PradnyaGanapule.jpeg",
    specialization: ["Radiology & Ultrasonography", "Ultrasonography"],
  },
  {
    doctorname: "Dr. Rahul Bhirud",
    userimage: "images/rahul.jpg",
    specialization: ["Pediatrics", "Pediatrician & Neonatologist"],
  },
  {
    doctorname: "Dr. Sandeep Pradeep Patil",
    userimage: "images/SandeepPradeepPatil.jpg",
    specialization: ["Internal Medicine", "Critical Care Medicine"],
  },
  {
    doctorname: "Dr. Sandip Firake",
    userimage: "images/sandip.jpg",
    specialization: ["Laparoscopic Gynecology"],
  },
  {
    doctorname: "Dr. Sanjay Patil",
    userimage: "images/sanjay.jpg",
    specialization: ["Ear, Nose & Throat"],
  },
  {
    doctorname: "Dr. Sohan Barhate",
    userimage: "images/sohan.jpg",
    specialization: ["Orthopedic, Trauma & Joint Replacement"],
  },
  {
    doctorname: "Dr. Sunita Kamath",
    userimage: "images/SunitaKamath.jpeg",
    specialization: ["Pediatric Surgery"],
  },
  {
    doctorname: "Dr. Sushil Shinde",
    userimage: "images/SushilShinde.jpeg",
    specialization: ["Obstetric & Reproductive Medicine"],
  },
  {
    doctorname: "Dr. Tejas Savdekar",
    userimage: "images/tejas.jpg",
    specialization: ["Surgery"],
  },
  {
    doctorname: "Dr. Vineeth Chaudhary",
    userimage: "images/doctor.png",
    specialization: ["Gastroenterology"],
  },
  {
    doctorname: "Dr. Vivek Bharambe",
    userimage: "images/vivek.jpg",
    specialization: ["Obstetric & Reproductive Medicine"],
  },
];

export default DoctorsOneDoctorscard;
