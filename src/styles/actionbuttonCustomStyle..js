const actionbuttonCustomStyle = {
  control: (base) => ({
    ...base,
    backgroundColor: "transparent",
    border: "none",
    boxShadow: "none",
    cursor: "pointer",
    "&:hover": {
      border: "none",
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: "#3B82F7", // Text color
  }),
  placeholder: (base) => ({
    ...base,
    color: "#3B82F7", // Placeholder color
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  // dropdownIndicator: () => null,
  dropdownIndicator: (base) => ({
    ...base,
    color: "#3B82F7", // Dropdown indicator color
    "&:hover": {
      color: "#3B82F7",
    },
  }),
  menuPortal: (base) => ({
    ...base,
    zIndex: 9999,
  }),
  menu: (base) => ({
    ...base,
    marginTop: "-100px", // Space above the menu
    marginRight: "100px", // Space on the right of the menu
    marginBottom: "0", // Space below the menu
    marginLeft: "-250px", // Space on the left of the menu
    paddingTop: "0", // Space inside the top of the menu container
    paddingRight: "0", // Space inside the right of the menu container
    paddingBottom: "0", // Space inside the bottom of the menu container
    paddingLeft: "0", // Space inside the left of the menu container
    zIndex: 9999,
  }),
};

export default actionbuttonCustomStyle;

export const CustomOption = (props) => {
  const { innerRef, innerProps, data } = props;
  return (
    <div
      ref={innerRef}
      {...innerProps}
      className="flex items-center p-2 cursor-pointer space-x-2 hover:bg-gray-200"
      // style={{ width: "fit-content" }}
    >
      {data.icon && (
        <data.icon className="w-3 h-3" style={{ color: data.iconColor }} />
      )}
      <span style={{ color: data.labelColor }}>{data.label}</span>
    </div>
  );
};
