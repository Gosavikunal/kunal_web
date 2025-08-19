import React from "react";
import PropTypes from "prop-types";

const shapes = { circle: "rounded-[50%]", round: "rounded-[12px]" };
const variants = {
  fill: {
    white_A700: "bg-white-A700 text-blue_gray-400",
    pink_A200: "bg-pink-A200 text-white-A700",
    purple_50: "bg-purple-50 text-indigo-900",
    gray_100_04: "bg-gray-100_04",
    blue_100_01: "bg-blue-100_01",
    cyan_400: "bg-cyan-400 text-white-A700",
    cyan_400_87: "bg-cyan-400_87 text-white-A700",
    gray_100: "bg-gray-100",
    white_A700_3d: "bg-white-A700_3d text-blue_gray-900",
    cyan_400_af: "bg-cyan-400_af",
  },
};
const sizes = {
  xs: "p-1",
  sm: "p-[7px]",
  md: "p-[11px]",
  lg: "p-3.5",
  xl: "p-[17px]",
  "2xl": "p-5",
  "3xl": "p-7 sm:px-5",
};

const Button = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape = "",
  size = "",
  variant = "",
  color = "",
  ...restProps
}) => {
  return (
    <button
      className={`${className} ${(shape && shapes[shape]) || ""} ${
        (size && sizes[size]) || ""
      } ${(variant && variants[variant]?.[color]) || ""}`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  shape: PropTypes.oneOf(["circle", "round"]),
  size: PropTypes.oneOf(["xs", "sm", "base", "md", "lg", "xl", "2xl", "3xl"]),
  variant: PropTypes.oneOf(["fill"]),
  color: PropTypes.oneOf([
    "white_A700",
    "pink_A200",
    "purple_50",
    "gray_100_04",
    "blue_100_01",
    "cyan_400",
    "cyan_400_87",
    "gray_100",
    "white_A700_3d",
    "cyan_400_af",
  ]),
};

export { Button };
