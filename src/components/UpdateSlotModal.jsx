import React, { useState } from "react";
import { extractKsaTimeParts, convertKsaDateTimeToUtc } from "../utils/time";
import axios from "../api/axiosConfig";
import {InputField,SelectField,AvailabilityToggle} from "../components/FormComponents";


function UpdateSlotModal({ slot, onCancel, onUpdate }) {
    const { time: localTime } = extractKsaTimeParts(slot.startTime);
    const [date, setDate] = useState(slot.startTime.slice(0, 10)); 
    const [startTime, setStartTime] = useState(localTime); 
    const [status, setStatus] = useState(slot.status);
    const [isAvailable, setIsAvailable] = useState(slot.isAvailable);
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async () => {
        const utcStart = convertKsaDateTimeToUtc(date, startTime);
        const utcEnd = new Date(utcStart.getTime() + 30 * 60 * 1000);

        try {
        const response = await axios.get("/Slot/all");
        const allSlots = response.data;
        const others = allSlots.filter((s) => s.slotId !== slot.slotId);
        const conflict = others.find((s) => {
          const otherStart = new Date(s.startTime);
          const otherEnd = new Date(s.endTime);
          return !(
            utcEnd <= otherStart || utcStart >= otherEnd
          ) && s.status === "Available";
        });

        if (conflict) {
            setErrorMsg("⚠️ Conflict: Another slot is already available at this time.");
            return;
        }

        const updatedSlot = {
            ...slot,
            startTime: utcStart.toISOString(),
            endTime: utcEnd.toISOString(),
            status,
            isAvailable,
        };

        onUpdate(updatedSlot);
        } catch (err) {
        console.error("Validation or update failed:", err);
        setErrorMsg("❌ Failed to validate or update. Try again.");
        }
    };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-gray-900 text-gray-300 p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Update Slot</h2>
        <InputField label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <InputField label="Start Time" type="time" step="1800" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        <SelectField label="Status" value={status} onChange={(e) => setStatus(e.target.value)} options={["Available", "Booked", "Cancelled"]}/>
        <AvailabilityToggle isAvailable={isAvailable} onChange={(e) => setIsAvailable(e.target.checked)} />
        {errorMsg && (
          <div className="text-red-600 text-sm mb-3">{errorMsg}</div>
        )}

        <div className="flex justify-end gap-4">
          <button onClick={onCancel} className="text-gray-300 hover:underline">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateSlotModal;
