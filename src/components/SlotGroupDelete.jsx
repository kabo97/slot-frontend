import React from "react";
import { format, parseISO } from "date-fns";
import { formatKsaTime } from "../utils/time";

const SlotGroupDelete = ({ groupedSlots, selectedIds, toggleSlot }) => {
  return (
    <>
      {Object.entries(groupedSlots).map(([monthYear, slots]) => (
        <div key={monthYear} className="mb-10">
          <h2 className="text-xl text-purple-400 font-semibold mb-4 border-b border-gray-600 pb-1">
            {monthYear}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {slots.map((slot) => {
              const isSelected = selectedIds.includes(slot.slotId);
              const isBooked = slot.status === "Booked";

              return (
                <button
                  key={slot.slotId}
                  onClick={() => !isBooked && toggleSlot(slot.slotId)}
                  className={`p-4 text-left rounded-xl border transition-all ${
                    isBooked
                      ? "border-red-400 cursor-not-allowed opacity-60"
                      : isSelected
                      ? "border-purple-500 bg-gray-700"
                      : "border-gray-600 hover:border-purple-500"
                  }`}
                >
                  <p className="font-medium">
                    {format(parseISO(slot.startTime), "EEE, MMM dd")}
                  </p>
                  <p className="text-sm text-gray-400">
                          {formatKsaTime(slot.startTime)} - {formatKsaTime(slot.endTime)}

                  </p>
                  <p className="text-sm mt-1">Status: {slot.status}</p>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
};

export default SlotGroupDelete;
