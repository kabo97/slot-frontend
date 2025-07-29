import React, { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import { format, parseISO } from "date-fns";
import { groupSlotsByDate } from "../utils/groupSlotsByDate";
import SlotGroup from "../components/SlotGroup";
import AdminFilters from "../components/AdminFilters";
import SignOutButton from "../components/SignOutButton";

import DateBar from "../components/DateBar";
function ViewSlot() {
  const [slots, setSlots] = useState([]);
  const [groupedSlots, setGroupedSlots] = useState({});
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [userFilter, setUserFilter] = useState("");
  const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const endpoint = role === "Admin" ? "/Slot/all" : "/Slot";
        const res = await axios.get(endpoint);
        const data = res.data;

        let filtered = [...data];
        if (role === "User") {
          filtered = filtered.filter((s) => s.status === "Available" && format(parseISO(s.startTime), "yyyy-MM-dd") === selectedDate);
        } else {
          if (availabilityFilter && availabilityFilter !== "All") {
            filtered = filtered.filter((s) => s.status === availabilityFilter);
            setSelectedDate("");
        }else if (availabilityFilter === "All") {
            setSelectedDate(""); 
        }
          if (selectedDate) {
            filtered = filtered.filter((s) => s.startTime.startsWith(selectedDate));
          }
          if (userFilter) {
            filtered = filtered.filter((s) => s.createdByUserId == userFilter);
          }
        }
        filtered.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
        const grouped = groupSlotsByDate(filtered);
        setGroupedSlots(grouped);
        setSlots(data);
      } catch (err) {
        console.error("Error fetching slots:", err);
      }
    };

    fetchSlots();
  }, [role, availabilityFilter, userFilter,selectedDate]);

  const handleBookSlot = async (id) => {
    try {
      const slot = slots.find((s) => s.slotId === id);
      const updated = { ...slot, status: "Booked", isAvailable: false };
      await axios.put(`/Slot/${id}`, updated);
      window.location.reload(); 
    } catch (err) {
      console.error("Booking failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-800 via-gray-900 to-black text-white flex flex-col items-center px-6 py-10">
      <SignOutButton />
      <div className="w-full max-w-5xl bg-gray-900 text-purple-600 rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Time Slots</h2>
        {role === "Admin" && (
        <AdminFilters availabilityFilter={availabilityFilter} setAvailabilityFilter={setAvailabilityFilter} userFilter={userFilter} setUserFilter={setUserFilter}/>
        )}
        <DateBar selectedDate={selectedDate} onSelectDate={(date) => { setSelectedDate(date);if (role === "Admin") { setAvailabilityFilter("");}}}/>        
        {Object.keys(groupedSlots).length === 0 ? (
          <p className="text-center text-gray-400">No slots found</p>
        ) : (
        Object.entries(groupedSlots).map(([date, slots]) => (
            <SlotGroup key={date} date={date} slots={slots} role={role} onBook={handleBookSlot} />
        ))
        )}
      </div>
    </div>
  );
}

export default ViewSlot;
