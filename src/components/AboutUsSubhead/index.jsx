import React from "react";

import { Img, Text } from "components";

const AboutUsSubhead = (props) => {
  return (
    <>
      <div className={props.className}>
        <div className="absolute h-[599] md:h-[450px] sm:[350px] inset-[0] justify-center m-auto mt-0 w-full">
          <Img
            className="h-[599px] md:h-[450px] sm:[350px] m-auto object-fill rounded-sm w-full"
            src="images/groupPhoto.jpg"
            alt="teamdoctorsst"
          />
          {/* <div className="absolute flex flex-col h-full inset-[0] items-center justify-center m-auto w-full">
            <Img
              className="h-[249px] sm:h-auto object-cover rounded-bl-sm rounded-br-sm w-full"
              src="images/img_teamdoctorsst_249x1366.png"
              alt="frameTwo"
            />
          </div> */}
        </div>
        <div className="absolute bg-white-A700_7f flex flex-col h-full inset-[0] items-center justify-center m-auto w-full">
          <div
            className="bg-cover bg-no-repeat flex flex-col h-[600px] sm:[350px] md:h-[450px] items-start object-fill justify-start p-[74px] md:px-10 sm:px-5 w-full"
            style={{ backgroundImage: "url('images/img_group3.svg')" }}
          >
            <div className="flex flex-col items-start justify-start mb-1.5 ml-28 md:ml-[0]">
              <Text
                className="text-indigo-900 text-lg"
                size="txtPoppinsMedium18Indigo900"
              >
                {props?.pagetitle}
              </Text>
              <Text
                className="text-5xl sm:text-[38px] md:text-[44px] text-indigo-900"
                size="txtPoppinsSemiBold48Indigo900"
              >
                {props?.aboutustitle}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

AboutUsSubhead.defaultProps = {
  pagetitle: "",
  aboutustitle: "About us",
};

export default AboutUsSubhead;
