import React, { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import { format, parseISO } from "date-fns";
import { groupSlotsByMonth } from "../utils/groupSlotsByMonth";
import { hardDeleteSlot,softDeleteSlot } from "../utils/deleteOptions";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import SlotGroupDelete from "../components/SlotGroupDelete";
import SignOutButton from "../components/SignOutButton";


function DeleteSlot() {
  const [slots, setSlots] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const res = await axios.get("/Slot/all");
        const sorted = res.data.sort(
          (a, b) => new Date(a.startTime) - new Date(b.startTime)
        );
        setSlots(sorted);
      } catch (err) {
        console.error("Failed to fetch slots", err);
      }
    };
    fetchSlots();
  }, []);

  const toggleSlot = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const groupedSlots = groupSlotsByMonth(slots);


const handleDelete = async (type) => {
  if (type === "hard") {
    await Promise.all(selectedIds.map(id => hardDeleteSlot(id)));
  } else if (type === "soft") {
    await Promise.all(
      selectedIds.map(id => {
        const slot = slots.find(s => s.slotId === id);
        return softDeleteSlot(slot);
      })
    );
  }

  window.location.reload();
};
  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-800 via-gray-900 to-black text-white flex flex-col items-center px-6 py-10">
      <SignOutButton />
      <div className="w-full max-w-5xl bg-gray-900 text-purple-600 rounded-2xl shadow-xl p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Delete Slots</h1>

        <SlotGroupDelete
          groupedSlots={groupedSlots}
          selectedIds={selectedIds}
          toggleSlot={toggleSlot}
        />
    {showPopup && (
  <DeleteConfirmationModal
    onConfirmSoft={() => {
      handleDelete("soft");
      setShowPopup(false);
    }}
    onConfirmHard={() => {
      handleDelete("hard");
      setShowPopup(false);
    }}
    onCancel={() => setShowPopup(false)}
  />
)}
<button
  disabled={selectedIds.length === 0}
  onClick={() => setShowPopup(true)}
  className="mt-8 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-md text-white font-semibold disabled:opacity-50"
>
  Delete Selected
</button>
    </div>
</div>
  );
}

export default DeleteSlot;
