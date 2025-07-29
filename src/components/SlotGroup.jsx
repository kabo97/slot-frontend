import React from "react";
import SlotCard from "./SlotCard";
import { format } from "date-fns";

function SlotGroup({ date, slots, role, onBook }) {
  return (
    <div className="mb-10">
      <h3 className="text-lg font-semibold text-purple-600 mb-4 border-b border-gray-500 pb-1">
        {format(new Date(date), "EEEE, MMM dd")}
      </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {slots
            .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
            .map((slot) => (
                <SlotCard key={slot.slotId} slot={slot} role={role} onBook={onBook} />
            ))}
      </div>
    </div>
  );
}

export default SlotGroup;