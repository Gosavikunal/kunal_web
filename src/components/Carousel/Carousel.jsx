import React, { useEffect, useState } from "react";

const Carousel = ({ images }, props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevSlide = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    console.log("Current Index:", currentIndex);
  };

  const goToNextSlide = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    console.log("Current Index:", currentIndex);
  };

  // Function to handle automatic change of reviews
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change review every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={props.className}>
      <div className="flex flex-row gap-2  items-center justify-between w-full">
        <div className="w-[12%] flex justify-end items-center">
          <button
            onClick={goToPrevSlide}
            className=" transform  bg-transparent text-white font-semibold px-4 py-2 border border-blue_gray-200 rounded-full hover:bg-blue_gray-200"
          >
            &lt;
          </button>
        </div>
        <div className="flex sm:hidden md:flex-col flex-row font-dmsans md:gap-5 gap-3 items-center justify-evenly w-[75%] ">
          {images.slice(currentIndex, currentIndex + 2).map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index}`}
              className={`${index === currentIndex ? "active" : ""} h-[487px] md:h-auto object-fill md:w-[45%] sm:w-full w-[43%] rounded-[10px]`}
              // style={{ height: '500px', width: '400px', objectFit: 'fill' }}
            />
          ))}
        </div>
        <div className="hidden sm:block  md:hidden lg:hidden md:flex-col flex-row font-dmsans md:gap-5 items-start justify-center w-full sm:w-[75%]">
          {images.slice(currentIndex, currentIndex + 1).map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index}`}
              className={`${index === currentIndex ? "active" : ""} h-[287px] object-fill w-full`}
            />
          ))}
        </div>
        <div className="w-[12%] flex justify-start items-center">
          <button
            onClick={goToNextSlide}
            className="transform bg-transparent text-white font-semibold py-2 px-4 border border-blue_gray-200 rounded-full hover:bg-blue_gray-200"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
