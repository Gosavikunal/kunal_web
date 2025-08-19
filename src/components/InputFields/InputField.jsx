import React from "react";

export const InputField = ({
  label,
  name,
  value = "",
  onChange,
  type = "text",
  readOnly = false, // NEW
}) => (
  <div className="flex items-center gap-2 w-full">
    <label className="w-[20%] text-black-700 font-semibold text-xs ">
      {label}:
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      readOnly={readOnly} // NEW
      className={`flex-1 border-b border-gray-400 focus:outline-none py-0.5 w-[80%] text-xs rounded-md ${
        readOnly ? "bg-gray-300 cursor-not-allowed" : ""
      }`}
    />
  </div>
);

export const InputFieldAge = ({ label, name, value = "", onChange }) => {
  const handleInput = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 3);
    onChange({ target: { name, value: digitsOnly } });
  };

  return (
    <div className="flex items-center gap-2">
      <label className="w-[48%] text-black-700 font-semibold text-xs">
        {label}:
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={handleInput}
        className="flex-1 border-b border-gray-400 focus:outline-none py-0.5 w-full text-xs rounded-md"
        inputMode="numeric"
      />
    </div>
  );
};

export const InputFieldMobileNumber = ({
  label,
  name,
  value = "",
  onChange,
}) => {
  const handleInput = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 10);
    onChange({ target: { name, value: digitsOnly } });
  };

  return (
    <div className="flex items-center gap-2 w-[70%] ml-5">
      <label className="w-[40%] text-black-700 font-semibold text-xs ">
        {label}:
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={handleInput}
        className="flex-1 border-b border-gray-400 focus:outline-none py-0.5 w-full text-xs rounded-md"
        inputMode="numeric"
      />
    </div>
  );
};

export const Checkbox = ({ label, name, checked, onChange }) => (
  <label className="flex items-center gap-2 text-black text-sm">
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
      className="form-checkbox"
    />
    <span>{label}</span>
  </label>
);

export const InputFieldCheckbox = ({
  label,
  name,
  checked = false,
  onChange,
}) => (
  <div className="flex items-center gap-2">
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
      className="w-4 h-4 text-xs"
    />
    <label className="text-black-700 text-sm">{label}</label>
  </div>
);
