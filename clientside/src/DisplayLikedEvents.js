import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

function DisplayLikedEvents() {
  const [likedEvents, setLikedEvents] = useState([]);
  const { userId } = useParams();

  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  })

  // const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchLikedEvents = async () => {
      try {
          const response = await axios.get(`http://localhost:5000/likedevents/${userId}/display`);
        //  console.log(response)
           console.log(response.data[0].eventId)
        setLikedEvents(response.data);
      } catch (error) {
        console.error('Error fetching registered events:', error);
      }
    };

    fetchLikedEvents();
  }, [userId]);

  return token ? (
    <div className="App">
      <header className="App-header">
        <h1>Your Liked Events</h1>
      </header>
      
      <div className="events-list">
        {likedEvents.map((event, index) => (
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
  ):(<div className="App">
        <header className="App-header">
        <h1 style={{ margin: '0 auto' }}>Please login</h1>
        </header>
        <div className="dashboard-container">
      <Link to={'/login'}>
        <button>Login</button>
          </Link>
          </div>
    </div>);
}

export default DisplayLikedEvents;
