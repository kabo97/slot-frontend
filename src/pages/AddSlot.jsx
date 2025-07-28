import { useState } from 'react';
import axios from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const AddSlot = () => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newSlot = {
      startTime,
      endTime,
      isAvailable: true,
      status: 'Available'
    };

    try {
      await axios.post('/Slot', newSlot);
      navigate('/');
    } catch (error) {
      console.error('Error creating slot:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Slot</h2>
      <input type="datetime-local" value={startTime} onChange={e => setStartTime(e.target.value)} required />
      <input type="datetime-local" value={endTime} onChange={e => setEndTime(e.target.value)} required />
      <button type="submit">Create Slot</button>
    </form>
  );
};

export default AddSlot;
