import React from "react";
import { Img, Text } from "components";
import { useNavigate } from "react-router-dom";

const Header1 = (props) => {
  const navigate = useNavigate();

  const handleAppointmentBook = () => {
    if (!sessionStorage.getItem("token")) {
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <header
        className={`${props.className} justify-between flex md:flex-row sm:flex-col flex-row md:gap-0 items-center md:px-5 w-full`}
      >
        <div className="w-[10%] md:w-full flex justify-center md:ml-auto">
          <Img
            className="h-[105px] sm:h-auto md:ml-[0] ml-[0] object-cover w-[100%] md:[52px] sm:w-1/2 md:h-auto sm:items-center sm:justify-center sm:mx-0"
            src="images/img_aurindamjpeg.png"
            alt="aurindamjpeg"
          />
        </div>
        <div className="flex flex-col gap-2 w-[60%] md:w-full">
          <div className="flex md:flex-col flex-row md:gap-1 gap-4 items-center justify-center md:ml-[0] md:mt-0 md:mb-0 w-full md:w-full">
            <div className="justify-center items-center">
              <Text
                className="text-base text-indigo-900 uppercase w-max"
                size="txtDMSansRegular18"
              >
                Multispeciality Hospital
              </Text>
            </div>
            <div className="flex flex-col items-center justify-start md:w-full">
              <div className="flex flex-row gap-[2px] items-center justify-center w-full">
                <Img
                  className="h-[14px]"
                  src="images/img_reply_indigo_900.svg"
                  alt="reply"
                />
                <div className="flex flex-row items-start gap-1 justify-center">
                  <Text
                    className="text-base text-indigo-900 uppercase w-max lg"
                    size="txtDMSansRegular16"
                  >
                    Emergency No:
                  </Text>
                  <a href="tel:9224564569" className="text-base text-pink-A200">
                    9224564569
                  </a>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-center md:w-full">
              <div className="flex flex-row gap-[2px] items-center justify-center w-full">
                <Img
                  className="h-[14px]"
                  src="images/img_clock_indigo_900_30x30.svg"
                  alt="clock"
                />
                <div className="flex flex-row items-center gap-1 justify-center">
                  <Text
                    className="text-base text-indigo-900 uppercase w-max"
                    size="txtDMSansRegular16"
                  >
                    Appointment no:
                  </Text>
                  <a href="tel:8652333322" className="text-base text-pink-A200">
                    8652333322
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="flex md:flex-col flex-row md:gap-1 gap-4 items-center justify-center md:ml-[0] md:mt-0 md:mb-0 w-full md:w-full">
            <div className="justify-center items-center">
              <Text
                className="text-base text-indigo-900 gap-1 uppercase w-max"
                size="txtDMSansRegular18"
              >
                Mother & Child Care Hospital
              </Text>
            </div>
            <div className="flex flex-col items-center justify-start md:w-full">
              <div className="flex flex-row gap-[2px] items-center justify-center w-full">
                <Img
                  className="h-[14px]"
                  src="images/img_reply_indigo_900.svg"
                  alt="reply"
                />
                <div className="flex flex-row items-start gap-1 justify-center">
                  <Text
                    className="text-base text-indigo-900 uppercase w-max"
                    size="txtDMSansRegular16"
                  >
                    Emergency No:
                  </Text>
                  <a href="tel:7506111199" className="text-base text-pink-A200">
                    7506111199
                  </a>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-center md:w-full">
              <div className="flex flex-row gap-[2px] items-center justify-center w-full">
                <Img
                  className="h-[14px] "
                  src="images/img_clock_indigo_900_30x30.svg"
                  alt="clock"
                />
                <div className="flex flex-row items-center gap-1 justify-center">
                  <Text
                    className="text-base text-indigo-900 uppercase w-max"
                    size="txtDMSansRegular16"
                  >
                    Appointment no:
                  </Text>
                  <a href="tel:7506111188" className="text-base text-pink-A200">
                    7506111188
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[15%] min-w-[192px] md:w-full flex justify-center items-center md:mx-0">
          <button
            className="bg-cyan-400 py-3 px-2 hover:bg-cyan-500 rounded-md"
            onClick={handleAppointmentBook}
          >
            Book an appointment
          </button>
        </div>
        <a
          href="https://play.google.com/store/apps/details?id=com.purplepatient.aurindam&pcampaignid=web_share"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="w-[15%] min-w-[192px] md:w-full flex justify-center items-center md:mx-0">
            <button
              type="button"
              className="flex items-center justify-center w-44 m-3 text-white bg-black rounded-lg border-2 border-black h-12"
            >
              <div className="mr-3">
                <svg viewBox="30 336.7 120.9 129.2" width="30">
                  <path
                    fill="#FFD400"
                    d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7  c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z"
                  ></path>
                  <path
                    fill="#FF3333"
                    d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3  c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1L99.1,401.1z"
                  ></path>
                  <path
                    fill="#48FF48"
                    d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1  c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z"
                  ></path>
                  <path
                    fill="#3BCCFF"
                    d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6  c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z"
                  ></path>
                </svg>
              </div>
              <div>
                <div className="text-xs">GET IT ON</div>
                <div className="-mt-1 font-sans text-xl font-semibold">
                  Google Play
                </div>
              </div>
            </button>
          </div>
        </a>
      </header>
    </>
  );
};

Header1.defaultProps = {};

export default Header1;
