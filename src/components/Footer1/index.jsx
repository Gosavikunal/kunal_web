import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { Img, Line, Text } from "components";

const Footer1 = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <footer style={props.style} className={props.className}>
        <div className="flex flex-col gap-[10px] items-center justify-center mb-[15px] sm:ml-0 sm:mr-0  mt-[20px] w-[100%]">
          <div className=" justify-center items-center w-full">
            <div className="flex flex-col inset-y-[0] items-center justify-center  left-[0] my-auto sm:w-full md:mx-0 md:w-full mx-[2%] w-[96%]">
              <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between w-full">
                <div className="flex md:flex-col flex-col sm:w-full gap-[9px] justify-start md:justify-center md:items-center sm:items-center sm:justify-center w-[12%] md:w-full">
                  <div className="bg-white-A700  flex items-center justify-center md:justify-center md:items-center md:w-[131px] sm:w-1/2 md:ml-[0] md:mr-0 mr-auto sm:mr-0 rounded-[17px] w-[100%] md:px-0">
                    <Img
                      className="h-[79px] md:h-auto object-cover rounded-[17px] items-center justify-center md:w-[121px] sm:w-full"
                      src="images/img_aurindamjpeg_79x121.png"
                      alt="aurindamjpeg_One"
                    />
                  </div>
                  <Text
                    className="leading-[140.00%] text-base text-center text-white-A700"
                    size="txtPoppinsRegular16WhiteA700"
                  >
                    <>Rhythm of Health</>
                  </Text>
                </div>
                <div className="flex md:flex sm:flex-col flex-row sm:gap-10 md:gap-x-5 items-start gap-x-5 justify-between sm:w-full w-[84%] md:w-full">
                  <div className="w-[30%] sm:w-full md:w-[33%] whitespace-normal">
                    <div className="flex flex-col gap-4 h-full sm:w-full inset-y-[0] items-start justify-start left-[0] my-auto w-[100%]">
                      <Text
                        className="text-xl text-white-A700"
                        size="txtWorkSansSemiBold18"
                      >
                        Important Links:
                      </Text>
                      <div className="flex flex-col gap-1 items-start justify-start w-[100%]">
                        <Text className="h-[3vh] text-base text-white-A700 w-max whitespace-normal cursor-pointer hover:text-lg hover:text-indigo-900">
                          <span
                            onClick={() => navigate("/multispecialtyHospital")}
                          >
                            Aurindam Multispeciality Hospital
                          </span>
                        </Text>
                        <Text className="h-[3vh] text-base text-white-A700 w-max whitespace-normal cursor-pointer hover:text-lg hover:text-indigo-900">
                          <span onClick={() => navigate("/motherandchildcare")}>
                            Aurindam Mother & Child Care
                          </span>
                        </Text>
                        <Text className="h-[3vh] text-base text-white-A700 w-max whitespace-normal cursor-pointer hover:text-lg hover:text-indigo-900">
                          <span onClick={() => navigate("/aboutus")}>
                            About Us
                          </span>
                        </Text>
                        <Text className="h-[3vh] text-base text-white-A700 w-max whitespace-normal cursor-pointer hover:text-lg hover:text-indigo-900">
                          <span onClick={() => navigate("/contact")}>
                            Contact
                          </span>
                        </Text>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-[19px] md:w-[33%] items-start justify-start w-[36%] sm:w-full">
                    <Text
                      className="text-xl text-white-A700"
                      size="txtWorkSansSemiBold18"
                    >
                      Aurindam Multispeciality Hospital
                    </Text>
                    <div className="flex flex-col items-start justify-start gap-y-5 w-full">
                      <Text className="text-white-A700 font-poppins text-left font-normal whitespace-normal inline-block w-full">
                        <b>Address:</b> P 29/4, Next to Pendharkar
                        College,Opposite Bharat Gas Godown, MIDC,Dombivli East,
                        Pin-421203.
                      </Text>
                      <div className="w-full flex flex-row items-start justify-between">
                        <Text className="text-white-A700 font-poppins text-left font-normal whitespace-normal inline-block">
                          <b>Contact:</b> 9224564569
                        </Text>
                        <Text className="text-white-A700 font-poppins text-left font-normal whitespace-normal inline-block">
                          <b>Appointment No:</b> 8652333322
                        </Text>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[19px] items-start justify-start md:w-[34%] w-[35%] sm:w-full">
                    <Text
                      className="text-xl text-white-A700"
                      size="txtWorkSansSemiBold18"
                    >
                      Aurindam Mother & Child Care Hospital
                    </Text>
                    <div className="flex flex-col items-start justify-start w-full gap-y-5">
                      <Text className="text-white-A700 font-poppins text-left font-normal whitespace-normal inline-block w-full">
                        <b>Address:</b>P 76,Next to Shivai Balak Vidya Mandir
                        School,Near Nivasi Bus Stop,MIDC Phase II,Dombivli
                        East,Pin-421203.
                      </Text>
                      <div className="w-full flex flex-row items-start gap-x-5 justify-between">
                        <Text className="text-white-A700 font-poppins text-left font-normal whitespace-normal inline-block">
                          <b>Contact:</b> 7506111199
                        </Text>
                        <Text className="text-white-A700 font-poppins text-left font-normal whitespace-normal inline-block">
                          <b>Appointment No:</b> 7506111188
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Line className="flex bg-white-A700 flex-row h-[2px] w-[100%]" />
          <div className="flex md:flex-row flex-row items-center sm:w-full justify-between mx-[3%] w-[94%] md:w-full my-0">
            <div className="flex w-[60%] justify-start items-start ml-0 ">
              <Text
                className="md:mt-0 mt-1 text-base text-white-A700 sm:w-full text-left"
                size="txtPoppinsMedium16WhiteA700"
              >
                © 2024 Aurindam Hospital All Rights Reserved.{" "}
              </Text>
            </div>
            <div className="flex flex-row w-[30%] justify-end">
              <Img
                className="h-[30px] md:ml-[5px] w-[30px]"
                src="images/img_info.svg"
                alt="info"
              />
              <Img
                className="h-[30px] ml-3.5 md:ml-[5px] w-[30px]"
                src="images/img_facebook_white_a700_01.svg"
                alt="facebook_One"
              />
              <Img
                className="h-[30px] ml-3.5 md:ml-[5px] w-[30px]"
                src="images/img_eye_white_a700_01.svg"
                alt="eye"
              />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

Footer1.defaultProps = {};

export default Footer1;
