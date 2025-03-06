import React from "react";

const Button = ({ text, onClick, className = "", type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-1/3 py-2 bg-black text-white font-semibold rounded-lg transition duration-300 ease-in-out hover:bg-gray-800 hover:cursor-pointer focus:outline-none ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
