import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';

function EditEvent() {
  const [title, settitle] = useState("");
  const [domain, setdomain] = useState("");
  const [date, setdate] = useState("");
  const [duration, setduration] = useState("");
  const [link, setlink] = useState("");
  const [trainerName, settrainerName] = useState("");
  const [location, setlocation] = useState("");
  const [desc, setdesc] = useState("");
  const [capacity, setcapacity] = useState(0);
  const [fullNames, setFullNames] = useState([]);
  
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
        setdomain(eventData.domain);
        setdate(new Date(eventData.date).toISOString().split('T')[0]); // format date
        setduration(eventData.duration);
        setlink(eventData.link);
        settrainerName(eventData.trainerName);
        setlocation(eventData.location);
        setdesc(eventData.desc);
        setcapacity(eventData.capacity)

      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    const fetchFullNames = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getfullnames');
        setFullNames(response.data);
      } catch (error) {
        console.error('Error fetching full names:', error);
      }
    };

    handleFetchEvent();
    fetchFullNames();
  }, [eventId]);

 const handleUpdate = async (e) => {
  e.preventDefault();
   try {
     console.log("Before axios");
    const response = await axios.post(`http://localhost:5000/editevent/${eventId}`, {
      title,
      domain,
      date,
      duration,
      link,
      trainerName,
      location,
      desc,
      capacity
    });
     
     console.log("After axios");
     console.log(response);

    if (response.status === 200) {
      alert('Updated successfully');
      navigate('/createevent'); 
    } else {
      alert('Update failed');
    }
  } catch (error) {
    console.error('Error updating:', error);
  }
};

  return (
    <div className="App">
      <header className="App-header">
        <h1>Edit Event</h1>
      </header>
      <div className="create-event-container">
      <form className="user-form">
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
        <div className="form-group">
          <label htmlFor="domain">Domain:</label>
          <input
            type="text"
            id="domain"
            name="domain"
            value={domain}
            onChange={e => setdomain(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={e => setdate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duration:</label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={duration}
            onChange={e => setduration(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="link">Resource:</label>
          <input
            type="text"
            id="link"
            name="link"
            value={link}
            onChange={e => setlink(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="trainerName">Trainer Name:</label>
          <select
            id="trainerName"
            name="trainerName"
            value={trainerName}
            onChange={e => settrainerName(e.target.value)}
            required
            className="form-select"
          >
            {fullNames.map((name, index) => (
              <option key={index} value={name}>{name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={e => setlocation(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={desc}
            onChange={e => setdesc(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="capacity">Capacity:</label>
          <input
            type="text"
            id="capacity"
            name="capacity"
            value={capacity}
            onChange={e => setcapacity(e.target.value)}
            required
          />
        </div>
        <button type="submit" onClick={(e) => handleUpdate(e)}>Update</button>
      </form>
      </div>
      </div>
  );
}

export default EditEvent;
