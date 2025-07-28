import React, { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import { format } from "date-fns";

function ViewSlot() {
  const [slots, setSlots] = useState([]);
  const [filteredSlots, setFilteredSlots] = useState([]);
  const [availabilityFilter, setAvailabilityFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  const [userFilter, setUserFilter] = useState("");
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchSlots();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [availabilityFilter, dateFilter, userFilter, slots]);

    const fetchSlots = async () => {
        try {
            const endpoint = role === "Admin" ? "/Slot/all" : "/Slot";
            const res = await axios.get(endpoint);
            setSlots(res.data);
        } catch (err) {
            console.error("Error fetching slots:", err);
        }
    };


  const applyFilters = () => {
    let result = [...slots];
    if (role === "User") {
      result = result.filter(s => s.status === "Available");
    } else {
      if (availabilityFilter !== "All") {
        result = result.filter(s => s.status === availabilityFilter);
      }
      if (dateFilter) {
        result = result.filter(s => s.startTime.startsWith(dateFilter));
      }
      if (userFilter) {
        result = result.filter(s => s.createdByUserId == userFilter);
      }
    }
    setFilteredSlots(result);
  };

    const handleBookSlot = async (id) => {
        try {
            const existing = slots.find(s => s.slotId === id);

            const updatedSlot = {
            ...existing,
            status: "Booked",
            isAvailable: false,
            };

            await axios.put(`/Slot/${id}`, updatedSlot);
            fetchSlots(); // refresh view
        } catch (err) {
            console.error("Booking failed:", err);
        }
    };


  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Available Time Slots</h1>

      {role === "Admin" && (
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded-md"
          />
          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded-md"
          >
            <option value="All">All</option>
            <option value="Available">Available</option>
            <option value="Booked">Booked</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <input
            type="number"
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
            placeholder="Filter by User ID"
            className="bg-gray-800 text-white px-4 py-2 rounded-md"
          />
        </div>
      )}

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {filteredSlots.map((slot) => (
          <div
            key={slot.slotId}
            className="bg-gray-800 rounded-xl p-6 shadow-lg flex flex-col justify-between"
          >
            <p className="text-lg font-semibold mb-2">
              {format(new Date(slot.startTime), "MMM dd, yyyy HH:mm")} -{" "}
              {format(new Date(slot.endTime), "HH:mm")}
            </p>
            <p className="text-sm text-gray-400">Status: {slot.status}</p>
            {role === "User" && slot.status === "Available" && (
              <button
                onClick={() => handleBookSlot(slot.slotId)}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                Book
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewSlot;
