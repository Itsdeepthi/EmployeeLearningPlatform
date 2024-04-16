import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

function DisplayRegisteredEvents() {
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const { userId } = useParams();

  // const token = localStorage.getItem('token');
  
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  })

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
          const response = await axios.get(`http://localhost:5000/registeredevents/${userId}/display`);
        //  console.log(response)
           console.log(response.data[0].eventId)
        setRegisteredEvents(response.data);
      } catch (error) {
        console.error('Error fetching registered events:', error);
      }
    };

    fetchRegisteredEvents();
  }, [userId]);

  return token ?(
    <div className="App">
      <header className="App-header">
        <h1>Your Registered Events</h1>
      </header>
      
      <div className="events-list">
        {registeredEvents.map((event, index) => (
          <div key={index} className="event-card">
            <p><strong></strong><h3>{event.eventId.title}</h3></p>
            <p><strong>Domain:</strong> {event.eventId.domain}</p>
            <p><strong>Date:</strong> {event.eventId.date.slice(0, 10)}</p>
            <p><strong>Duration:</strong> {event.eventId.duration}</p>
            <p><strong>Link:</strong> <a href={event.link} target="_blank" rel="noopener noreferrer" style={{ color: 'red' }}>Access {event.title}</a></p>
            <p><strong>Trainer Name:</strong> {event.eventId.trainerName}</p>
            <p><strong>Location:</strong> {event.eventId.location}</p>
                <p><strong>Description:</strong> {event.eventId.desc}</p>
                <p><strong></strong></p>
          </div>
        ))}
      </div>
    </div>
  ): (
      <div className="App">
        <header className="App-header">
        <h1 style={{ margin: '0 auto' }}>Please login</h1>
        </header>
        <div className="dashboard-container">
      <Link to={'/login'}>
        <button>Login</button>
          </Link>
          </div>
    </div>
  );
}

export default DisplayRegisteredEvents;
