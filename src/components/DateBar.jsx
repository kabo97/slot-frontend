import React, { useState, useEffect } from "react";
import { format, addDays, isSameDay } from "date-fns";

const generateDates = (start, end) => {
  const dateArray = [];
  let current = start;
  while (current <= end) {
    dateArray.push(current);
    current = addDays(current, 1);
  }
  return dateArray;
};

const DateBar = ({ onSelectDate }) => {
  const start = new Date("2025-06-01");
  const end = new Date("2026-01-31");
  const allDates = generateDates(start, end);
  const today = new Date();

  const findStartIndex = () => {
    const index = allDates.findIndex(d => format(d, "yyyy-MM-dd") === format(today, "yyyy-MM-dd"));
    return Math.max(0, index - (index % 7));
  };

  const [startIndex, setStartIndex] = useState(findStartIndex());
  const [selectedDate, setSelectedDate] = useState(today);

  const handlePrev = () => {
    setStartIndex(Math.max(0, startIndex - 7));
  };

  const handleNext = () => {
    if (startIndex + 7 < allDates.length) setStartIndex(startIndex + 7);
  };

  const handleSelect = (date) => {
    setSelectedDate(date);
    onSelectDate(format(date, "yyyy-MM-dd"));
  };

  useEffect(() => {
    handleSelect(today);
  }, []);

  return (
    <div className="flex items-center justify-center space-x-2 mb-6">
      <button onClick={handlePrev} className="px-2 text-xl">&lt;</button>
      <div className="flex space-x-2 bg-gray-800 px-4 py-2 rounded-lg">
        {allDates.slice(startIndex, startIndex + 7).map((date) => (
            <button
                key={date}
                onClick={() => handleSelect(date)}
                className={`w-20 text-center px-3 py-2 rounded-md transition ${
                    isSameDay(date, selectedDate)
                    ? "bg-purple-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
                >
                {format(date, "MMM d")}
            </button>
        ))}
      </div>
      <button onClick={handleNext} className="px-2 text-xl">&gt;</button>
    </div>
  );
};

export default DateBar;