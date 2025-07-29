import React, { useState } from "react";
import axios from "../api/axiosConfig";
import { convertKsaDateTimeToUtc } from "../utils/time";
import { InputField, SelectField, AvailabilityToggle } from "../components/FormComponents";
import SignOutButton from "../components/SignOutButton";

function AddSlot() {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [status, setStatus] = useState("Available");
  const [isAvailable, setIsAvailable] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async () => {
    if (!date || !startTime) {
      setErrorMsg("❌ Date and Time are required.");
      return;
    }

    const utcStart = convertKsaDateTimeToUtc(date, startTime);
    const utcEnd = new Date(utcStart.getTime() + 30 * 60 * 1000);

    try {
      const res = await axios.get("/Slot/all");
      const conflict = res.data.find((s) => {
      const otherStart = new Date(s.startTime);
      const otherEnd = new Date(s.endTime);
      return (
        !(utcEnd <= otherStart || utcStart >= otherEnd) &&
        s.status === "Available");
      });

      if (conflict) {
        setErrorMsg("⚠️ A conflicting slot already exists.");
        setSuccessMsg(""); 
        return;
      }
      const newSlot = {
        startTime: utcStart.toISOString(),
        endTime: utcEnd.toISOString(),
        status,
        isAvailable,
        createdByUserId: parseInt(localStorage.getItem("id")),
      };

      await axios.post("/Slot", newSlot);
      setSuccessMsg("✅ Slot added successfully!");
      setErrorMsg("");
      setDate("");
      setStartTime("");
      setStatus("Available");
      setIsAvailable(true);
    } catch (err) {
      console.error("Failed to add slot", err);
      setErrorMsg("❌ Error adding slot.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-800 via-gray-900 to-black text-white flex justify-center px-6 py-12">
      <SignOutButton />
      <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md text-purple-500">
        <h1 className="text-2xl font-bold mb-6 text-center">Add New Slot</h1>
        <InputField label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <InputField label="Start Time" type="time" step="1800" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        <SelectField
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          options={["Available", "Booked", "Cancelled"]}
        />
        <AvailabilityToggle isAvailable={isAvailable} onChange={(e) => setIsAvailable(e.target.checked)} />
        {errorMsg && <p className="text-red-500 text-sm mt-2">{errorMsg}</p>}
        {successMsg && <p className="text-green-500 text-sm mt-2">{successMsg}</p>}
        <button
          onClick={handleSubmit}
          className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded"
        >
          Add Slot
        </button>
      </div>
    </div>
  );
}
export default AddSlot;