import { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import { Link } from 'react-router-dom';

const SlotList = () => {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    axios.get('/Slot')
      .then(res => setSlots(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Available Slots</h2>
      <Link to="/add-slot">Add New Slot</Link>
      {slots.length === 0 ? (
        <p>No slots found.</p>
      ) : (
        <ul>
          {slots.map(slot => (
            <li key={slot.slotId}>
              {slot.startTime} to {slot.endTime} - {slot.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SlotList;
