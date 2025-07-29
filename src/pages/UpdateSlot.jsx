import React, { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import { format, parseISO } from "date-fns";
import { groupSlotsByMonth } from "../utils/groupSlotsByMonth";
import UpdateSlotModal from "../components/UpdateSlotModal";
import { formatKsaTime } from "../utils/time";
import SignOutButton from "../components/SignOutButton";

function UpdateSlot() {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const res = await axios.get("/Slot/all");
        const filtered = res.data
        .filter((s) => s.status === "Available" || s.status === "Cancelled")
        .sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
        setSlots(filtered);
      } catch (err) {
        console.error("Failed to fetch slots", err);
      }
    };
    fetchSlots();
  }, []);

  const handleUpdate = async (updatedSlot) => {
    try {
      await axios.put(`/Slot/${updatedSlot.slotId}`, updatedSlot);
      window.location.reload();
    } catch (err) {
      console.error("Failed to update slot", err);
    }
  };

  const groupedSlots = groupSlotsByMonth(slots);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-800 via-gray-900 to-black text-white flex flex-col items-center px-6 py-10">
      <SignOutButton />
      <div className="w-full max-w-5xl bg-gray-900 text-purple-600 rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Update Slots</h1>

        {Object.keys(groupedSlots).map((monthYear) => (
          <div key={monthYear} className="mb-10">
            <h2 className="text-xl text-purple-400 font-semibold mb-4 border-b border-gray-600 pb-1">
              {monthYear}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupedSlots[monthYear].map((slot) => (
                <button
                  key={slot.slotId}
                  onClick={() => setSelectedSlot(slot)}
                  className="p-4 text-left rounded-xl border transition-all border-gray-600 hover:border-purple-500"
                >
                  <p className="font-medium">
                    {format(parseISO(slot.startTime), "EEE, MMM dd")}
                  </p>
                  <p className="text-sm text-gray-400">
                    {formatKsaTime(slot.startTime)} - {formatKsaTime(slot.endTime)}
                  </p>
                  <p className="text-sm mt-1">Status: {slot.status}</p>
                </button>
              ))}
            </div>
          </div>
        ))}

        {selectedSlot && (
          <UpdateSlotModal
            slot={selectedSlot}
            onCancel={() => setSelectedSlot(null)}
            onUpdate={handleUpdate}
          />
        )}
      </div>
    </div>
  );
}

export default UpdateSlot;