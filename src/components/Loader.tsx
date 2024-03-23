import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <div
        className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 border-t-white h-5 w-5 animate-spin"
        style={{
          animationDuration: "1s",
          animationIterationCount: "infinite",
        }}
      />
    </div>
  );
};

export default Loader;
