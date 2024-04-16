import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

function CreateEvent() {
  const [events, setEvents] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [likedEvents, setLikedEvents] = useState([]);
  const { userId } = useParams();
  //  const token = localStorage.getItem('token');

  const navigate = useNavigate();
  const { token } = useAuth();

  console.log(currentUser)

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  })

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/displayevents');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/currentuser/${userId}`);
        setCurrentUser(response.data);
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    fetchEvents();
    fetchCurrentUser();
    
  }, [userId]);

  const fetchRegisteredEvents = async () => {
      try {
          const response = await axios.get(`http://localhost:5000/registeredevents/${userId}/display`);
        setRegisteredEvents(response.data);
      } catch (error) {
        console.error('Error fetching registered events:', error);
      }
  };

  const fetchLikedEvents = async () => {
      try {
          const response = await axios.get(`http://localhost:5000/likedevents/${userId}/display`);
        setLikedEvents(response.data);
      } catch (error) {
        console.error('Error fetching liked events:', error);
      }
  };
  
  const handleAccept = async (eventId, title) => {
    if (isEventRegistered(eventId)) {
      alert('Already registered for this event');
      console.log('Already registered for this event');
      return;
    }
    try {
      const response = await axios.post(`http://localhost:5000/acceptevent/${eventId}`, {
        userId: userId,
      });
      if (response.status === 200) {
        alert('Event accepted successfully');
        window.location.reload();
        // navigate(`/registerevent/${userId}`);
      } else {
        console.log('Acceptance failed');
      }
      fetchRegisteredEvents();
    }
    catch (error) {
      alert("Event aldready reg")
      console.error('Error accepting event:', error);
    }
  };

  const handleLike = async (eventId, title) => {
    const event_ids = likedEvents.map(event => event.eventId._id);
    if (event_ids.includes(eventId)) {
      const response = await axios.post(`http://localhost:5000/deletelikeevent/${eventId}`, {
          userId: userId,
        });
        console.log(response)
      console.log('Already liked this event');
      return;
    } else {
      try {
        const response = await axios.post(`http://localhost:5000/likeevent/${eventId}`, {
          userId: userId,
        });
        if (response.status === 200) {
          alert('Event liked successfully');
        } else {
          console.log('like failed');
        }
        fetchLikedEvents();
      }
      catch (error) {
        alert("Event aldready liked")
        console.error('Error liking event:', error);
      }
    }
  };

  const isEventRegistered = (eventId) => {
    return registeredEvents.includes(eventId);
  };

  useEffect(() => {
    fetchRegisteredEvents();
  }, [registeredEvents])
  

  useEffect(() => {
    fetchLikedEvents();
  }, [likedEvents])

  return token ? (
    <div className="App">
      <header className="App-header">
        <h1 style={{ margin: '0 auto' }}>Register Event</h1>
        <div className="header-buttons">
        <Link to={`/registerevent/${userId}/display`}>
          <button>View registered events</button>
        </Link>
        <Link to={`/likedevents/${userId}/display`}>
          <button>View liked events</button>
        </Link>
        </div>
      </header>
      
      <div className="events-list">
  {events.map((event, index) => {
    const eventDate = new Date(event.date.slice(0, 10));
    const currentDate = new Date();
    
    if (eventDate > currentDate) {
      return (
        <div key={index} className="event-card">
          <h3>{event.title}</h3>
          <p><strong>Domain:</strong> {event.domain}</p>
          <p><strong>Date:</strong> {event.date.slice(0, 10)}</p>
          <p><strong>Duration:</strong> {event.duration}</p>
          <p><strong>Link:</strong> <a href={event.link} target="_blank" rel="noopener noreferrer" style={{ color: 'red' }}>Access {event.title}</a></p>
          <p><strong>Trainer Name:</strong> {event.trainerName}</p>
          <p><strong>Location:</strong> {event.location}</p>
          <p><strong>Description:</strong> {event.desc}</p>
          <p><strong>Capacity:</strong> {event.currentcapacity} of {event.capacity}</p>
          
          <button 
            onClick={() => {
              console.log(registeredEvents.map(item => item.eventId._id));
              handleAccept(event._id, event.title);
            }}
            disabled={ registeredEvents.length > 0 && registeredEvents.map(item => item.eventId?._id).includes(event._id) }
          >
            { registeredEvents.length > 0 && registeredEvents.map(item => item.eventId?._id).includes(event._id) ? 'Accepted' : 'Accept'}
          </button>
          <button onClick={() => {
            handleLike(event._id, event.title);
          }}>
            { likedEvents.length > 0 && likedEvents.map(item => item.eventId?._id).includes(event._id) ? 'Liked' : 'Like'}
          </button>
        </div>
      );
    }
    return null;
  })}
</div>

    </div>
  ) : (
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

export default CreateEvent;