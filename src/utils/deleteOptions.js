import axios from '../api/axiosConfig';

export const softDeleteSlot = async (slot) => {
  try {
    const updatedSlot = {
      ...slot,
      isAvailable: false,
      status: "Cancelled",
      modifiedOn: new Date().toISOString(),
    };
    const res = await axios.put(`/Slot/${slot.slotId}`, updatedSlot);
    return res.status === 200;
  } catch (err) {
    console.error("Soft delete failed:", err);
    return false;
  }
};
export const hardDeleteSlot = async (id) => {
  try {
    const res = await axios.delete(`/Slot/${id}`);
    return res.status === 200;
  } catch (err) {
    console.error("Hard delete failed:", err);
    return false;
  }
};