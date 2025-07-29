import React from "react";

const DeleteConfirmationModal = ({ onConfirmSoft, onConfirmHard, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-gray-300 p-6 rounded-xl shadow-lg max-w-sm w-full">
        <h3 className="text-xl font-semibold mb-4">Choose Delete Option</h3>
        <p className="mb-6 text-sm">
          Do you want to remove the slots from the system completely or just mark them as inactive?
        </p>

        <div className="flex justify-between">
          <button
            onClick={onConfirmSoft}
            className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-md text-white"
          >
            Soft Delete
          </button>
          <button
            onClick={onConfirmHard}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-white"
          >
            Hard Delete
          </button>
          <button
            onClick={onCancel}
            className="ml-2 px-4 py-2 rounded-md text-gray-300 border border-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
