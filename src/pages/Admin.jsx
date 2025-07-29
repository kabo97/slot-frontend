import React from "react";
import { useNavigate } from "react-router-dom";
import SignOutButton from "../components/SignOutButton";

function AdminPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-800 via-gray-900 to-black text-white px-6 py-10">
      <SignOutButton />
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-3xl text-purple-600 font-bold">Admin Dashboard</h1>
        </header>

        <section className="grid grid-cols-1 text-purple-500 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            onClick={() => navigate("/view-slots")}
            className="bg-gray-800 p-6 rounded-xl shadow-lg cursor-pointer hover:bg-gray-700 transition"
          >
            <h2 className="text-xl font-semibold mb-2">View Slots</h2>
            <p className="text-gray-400">Manage and monitor all available slots.</p>
          </div>

          <div
            onClick={() => navigate("/add-slot")}
            className="bg-gray-800 p-6 rounded-xl shadow-lg cursor-pointer hover:bg-gray-700 transition"
          >
            <h2 className="text-xl font-semibold mb-2">Add Slot</h2>
            <p className="text-gray-400">Add a new time slot for booking.</p>
          </div>

          <div
            onClick={() => navigate("/delete-slot")}
            className="bg-gray-800 p-6 rounded-xl shadow-lg cursor-pointer hover:bg-gray-700 transition"
          >
            <h2 className="text-xl font-semibold mb-2">Delete Slots</h2>
            <p className="text-gray-400">Remove one or more existing slots.</p>
          </div>

          <div
            onClick={() => navigate("/update-slot")}
            className="bg-gray-800 p-6 rounded-xl shadow-lg cursor-pointer hover:bg-gray-700 transition"
          >
            <h2 className="text-xl font-semibold mb-2">Update Slots</h2>
            <p className="text-gray-400">Edit existing slot details.</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminPage;