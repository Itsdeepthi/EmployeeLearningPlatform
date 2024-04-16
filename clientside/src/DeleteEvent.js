import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export default function DeleteEvent() {
    const [title, settitle] = useState(""); 
    
  const [events, setEvents] = useState([]);

  const { eventId } = useParams();

  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  })

    useEffect(() => {
    const handleFetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/fetch-event/${eventId}`);
        const eventData = response.data;

        settitle(eventData.title);

      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    handleFetchEvent();
  }, [eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/deleteevent/${eventId}`, {
      title
    });
      console.log(response.data.savedTrainingEvent);

      if (response.status === 200) {
        alert('Deleted successful');
        setEvents([...events, response.data.savedTrainingEvent]);
        // Clear form fields after successful submission
        settitle("");
        navigate('/createevent');
      } else {
        alert('Creation failed');
      }
    } catch (error) {
      console.error('Error Creating:', error);
    }
  };
 
  return (
    <div className="App">
      <header className="App-header">
        <h1>Delete Event</h1>
      </header>
      <div className="create-event-container">
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={e => settitle(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" onClick={(e) => handleSubmit(e)}>Delete</button>
      </form>

      </div>
       </div>
  );
}
