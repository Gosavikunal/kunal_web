import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import CreatableSelect from "react-select/creatable";

const Pagination = ({
  count,
  page,
  setPage,
  setRecordPerPage,
  recordPerPage,
  setLoading,
  setData,
}) => {
  const pageSizeInput = [
    { size: 50 },
    { size: 100 },
    { size: 200 },
    { size: 300 },
    { size: 500 },
    { size: 1000 },
  ];
  const totalPages = count / recordPerPage;
  const roundedTotalPages = Math.ceil(totalPages);

  const options = pageSizeInput.map((resstate) => ({
    label: resstate.size,
    value: resstate.size,
  }));

  //   const defaultOption = options.find((option) => option.value === 200);
  //for serach fuctionallity ...

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= roundedTotalPages) {
      setPage(newPage);
    } else if (newPage < 1) {
      setPage(1);
    } else if (newPage > roundedTotalPages) {
      setPage(roundedTotalPages);
    }
  };

  const decrementCount = () => {
    if (page > 1) {
      setData([]);
      setLoading(true);
      setPage(page - 1);
    }
  };

  const incrementCount = () => {
    if (page < roundedTotalPages) {
      setData([]);
      setLoading(true);
      setPage(page + 1);
    }
  };

  const handleChangePageSize = (selectedOption) => {
    if (selectedOption) {
      setData([]);
      setLoading(true);
      setRecordPerPage(selectedOption.value);
    } else {
      setRecordPerPage(""); // Handle case where selection is cleared
    }
    setPage(1);
  };

  return (
    <div className="flex items-center justify-end space-x-4  mr-3 mt-1">
      <test className="text-sm text-gray-700">Page Size</test>
      <CreatableSelect
        options={options}
        className="bg-white-A700 border border-gray-200_02 border-solid h-3 rounded-[5px] w-25 mb-7"
        menuPlacement="top"
        defaultValue={options[0]} // Set default value
        onChange={handleChangePageSize}
        isClearable
        placeholder="Select Page"
        formatCreateLabel={(inputValue) => `${inputValue}`}
        onInputChange={(inputValue, { action }) => {
          if (action === "input-change") {
            return inputValue.replace(/\D/g, ""); // Remove non-numeric characters
          }
          return inputValue;
        }}
        isValidNewOption={(inputValue) => /^\d+$/.test(inputValue)} // Ensures only numbers can be created
      />

      <button
        onClick={decrementCount}
        disabled={page === 1}
        //  className="text-white-A700 bg-blue-700  hover:bg-blue-800 font-medium rounded-lg text-sm px-3 py-1.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 "
      >
        <IoIosArrowBack className="inline-block align-middle cursor-pointer" />
      </button>

      <div className="flex items-center space-x-2">
        <span className="text-gray-700 text-sm">Page</span>
        <input
          type="number"
          min="1"
          max={roundedTotalPages}
          value={page}
          onChange={(e) => setPage(parseInt(e.target.value))}
          onBlur={() => handlePageChange(page)}
          className="appearance-none block w-16 px-3 py-2 border border-gray-300 rounded-md leading-tight focus:outline-none focus:border-blue-500 text-center"
        />
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-gray-700 text-sm ">of</span>
        <input
          type="number"
          value={roundedTotalPages}
          className="appearance-none block w-16 px-3 py-2 border border-gray-300 rounded-md leading-tight focus:outline-none focus:border-blue-500 text-center"
        />
      </div>
      <button onClick={incrementCount}>
        <IoIosArrowForward className="inline-block align-middle" />
      </button>
    </div>
  );
};

export default Pagination;
