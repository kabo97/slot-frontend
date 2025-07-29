import React from "react";

export const InputField = ({ label, type, value, onChange, step }) => (
  <>
    <label className="block mb-2">{label}</label>
    <input
      type={type}
      value={value}
      step={step}
      onChange={onChange}
      className="bg-gray-700 text-purple-500 w-full mb-3 p-2 border rounded"
    />
  </>
);

export const SelectField = ({ label, value, onChange, options }) => (
  <>
    <label className="block mb-2">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className="bg-gray-700 text-purple-500 w-full mb-3 p-2 border rounded"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </>
);

export const AvailabilityToggle = ({ isAvailable, onChange }) => (
  <div className="flex items-center mb-4">
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          checked={isAvailable}
          onChange={onChange}
          className="sr-only"
        />
        <div
          className={`w-10 h-5 rounded-full transition-colors duration-300 ${
            isAvailable ? "bg-purple-600" : "bg-gray-400"
          }`}
        ></div>
        <div
          className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            isAvailable ? "translate-x-5" : "translate-x-0"
          }`}
        ></div>
      </div>
      <span className="ml-3 text-sm font-medium text-gray-300">
        Is Available
      </span>
    </label>
  </div>
);