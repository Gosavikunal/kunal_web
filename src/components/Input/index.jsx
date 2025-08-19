import React from "react";
import PropTypes from "prop-types";
import { ErrorMessage } from "../../components/ErrorMessage";

const variants = {
  fill: {
    white_A700: "bg-white-A700 text-blue_gray-100_02",
    green_800_01: "bg-green-800_01 shadow-bs text-white-A700",
    gray_50_04: "bg-gray-50_04 text-blue_gray-400",
    gray_50_05: "bg-gray-50_05 text-blue_gray-400",
    gray_200: "bg-gray-200 text-gray-800_02",
  },
  outline: {
    indigo_50: "border border-gray-300 border-solid text-blue_gray-300",
    cyan_400: "border border-cyan-400 border-solid text-gray-900_08",
    gray_500_01: "border border-gray-500_01 border-solid text-gray-500_01",
  },
};
const shapes = { round: "rounded-[12px]" };
const sizes = {
  xs: "pb-2 pt-[11px] px-2",
  sm: "pb-3 pl-1.5 pr-3 pt-[13px]",
  md: "pb-2.5 pt-3.5 px-2.5",
  lg: "p-4",
};

const Input = React.forwardRef(
  (
    {
      wrapClassName = "",
      className = "",
      name = "",
      placeholder = "",
      type = "text",
      children,
      errors = [],
      label = "",
      prefix,
      suffix,
      onChange,
      shape = "",
      size = "md",
      variant = "fill",
      color = "white_A700",
      ...restProps
    },
    ref,
  ) => {
    const handleChange = (e) => {
      if (onChange) onChange(e?.target?.value);
    };

    return (
      <>
        <div
          className={`${wrapClassName} 
              ${shapes[shape] || ""} 
              ${variants[variant]?.[color] || ""} 
              ${sizes[size] || ""}`}
        >
          {!!label && label}
          {!!prefix && prefix}
          <input
            ref={ref}
            className={`${className} bg-transparent border-0`}
            type={type}
            name={name}
            onChange={handleChange}
            placeholder={placeholder}
            {...restProps}
          />
          {!!suffix && suffix}
        </div>
        {!!errors && <ErrorMessage errors={errors} />}
      </>
    );
  },
);

Input.propTypes = {
  wrapClassName: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  shape: PropTypes.oneOf(["round"]),
  size: PropTypes.oneOf(["xs", "sm", "md", "lg"]),
  variant: PropTypes.oneOf(["fill", "outline"]),
  color: PropTypes.oneOf([
    "white_A700",
    "green_800_01",
    "gray_50_04",
    "gray_50_05",
    "gray_200",
    "indigo_50",
    "cyan_400",
    "gray_500_01",
  ]),
};

export { Input };
