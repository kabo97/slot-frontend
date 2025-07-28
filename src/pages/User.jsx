import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';

function User() {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    axios.get('/Slot')
      .then(res => setSlots(res.data))
      .catch(err => console.error('Failed to load slots', err));
  }, []);

  const handleBook = (slotId) => {
    // Simple mock booking logic
    alert(`Slot ${slotId} booked!`);
    // In real app, you’d POST to /api/Booking or PUT to update status
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Available Slots</h2>
      <ul>
        {slots.map(slot => (
          <li key={slot.slotId}>
            {new Date(slot.startTime).toLocaleString()} - {new Date(slot.endTime).toLocaleString()} ({slot.status})
            {slot.status === 'Available' && (
              <button onClick={() => handleBook(slot.slotId)} style={{ marginLeft: '1rem' }}>Book</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default User;
