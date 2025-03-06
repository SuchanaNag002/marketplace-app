import React from "react";

const Input = ({ label, type = "text", placeholder, value, onChange }) => {
  return (
    <div className="w-full mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-2 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
      />
    </div>
  );
};

export default Input;