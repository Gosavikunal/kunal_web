import React from "react";

import { Img, PagerIndicator, Text } from "components";

const HomeOneColumnEleven = (props) => {
  return (
    <>
      <div className={props.className}>
        <div className="flex flex-col md:gap-10 gap-[69px] items-center justify-start w-full">
          <div className="flex flex-col items-center justify-start">
            <Text
              className="text-center text-cyan-400 text-lg tracking-[2.88px] uppercase"
              size="txtPoppinsBold18Cyan400"
            >
              {props?.trustedcare}
            </Text>
            <Text
              className="md:text-3xl sm:text-[28px] text-[32px] text-center text-indigo-900"
              size="txtPoppinsSemiBold32"
            >
              {props?.facilities}
            </Text>
          </div>
          <div className="flex sm:flex-col flex-row sm:gap-8 md:gap-10 items-center justify-between w-full">
            <Img
              className="h-[487px] md:h-auto object-cover md:w-[45%] sm:w-full rounded-[10px]"
              alt="whatsappimageTwenty"
              src={props?.userprofilepagerimageone}
            />
            <Img
              className="h-[487px] md:h-auto object-cover md:w-[45%] sm:w-full rounded-[10px]"
              alt="whatsappimageTwenty_One"
              src={props?.userprofilepagerimagetwo}
            />
          </div>
          <PagerIndicator
            className="flex h-[18px] justify-center w-[74px]"
            count={3}
            activeCss="inline-block cursor-pointer rounded-[50%] h-[18px] bg-cyan-400 w-[18px]"
            activeIndex={1}
            inactiveCss="inline-block cursor-pointer rounded-[50%] h-[18px] bg-teal-50 w-[18px]"
            selectedWrapperCss="inline-block md:ml-[0] mx-[5.00px] sm:ml-[0]"
            unselectedWrapperCss="inline-block md:ml-[0] mx-[5.00px] sm:ml-[0]"
          />
        </div>
      </div>
    </>
  );
};

HomeOneColumnEleven.defaultProps = {
  trustedcare: "Trusted Care",
  facilities: "Facilities",
  userprofilepagerimageone: "images/img_whatsappimage20231011.png",
  userprofilepagerimagetwo: "images/img_whatsappimage20231011_487x439.png",
};

export default HomeOneColumnEleven;
