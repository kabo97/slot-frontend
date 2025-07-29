import React from "react";

function AdminFilters({ availabilityFilter, setAvailabilityFilter, userFilter, setUserFilter }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      <select
        value={availabilityFilter}
        onChange={(e) => setAvailabilityFilter(e.target.value)}
        className="bg-gray-700 w-32 text-center text-purple-500  appearance-none rounded-md">
        <option value="" disabled hidden>Filter by Status</option>
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
        className="bg-gray-700 text-center text-purple-500 px-4 py-2 rounded-md [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
    </div>
  );
}

export default AdminFilters;
