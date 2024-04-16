import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link} from 'react-router-dom';
import { useAuth } from './AuthProvider';


function Create() {
  const [emailID, setEmailID] = useState("");
  const [role, setrole] = useState("");
  const [fullName, setfullName] = useState("");
  const [username, setusername] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [department, setdepartment] = useState("");
  const navigate = useNavigate();

  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios
                      .post('http://localhost:5000/create', 
                      {emailID, role, fullName, username, phoneNumber, department});
      if (response.status === 200) {
        alert('Created successful');
        window.location.reload();
      } else {
        alert('Creation failed');
      }
    } catch (error) {
      console.error('Error Creatin:', error);
    }
  };

  return token ? (
    <div className="App">
      <header className="App-header">
        <h1>Create User</h1>
      </header>
      <div className="create-user-container">
      <form onSubmit={handleSubmit} className="user-form">
      <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={emailID}
            onChange={e => setEmailID(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={fullName}
            onChange={e => setfullName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={e=>setusername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            onChange={e=>setphoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="department">Department:</label>
          <input
            type="text"
            id="department"
            name="department"
            value={department}
            onChange={e=>setdepartment(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <input
            type="text"
            id="role"
            name="role"
            value={role}
            onChange={e => setrole(e.target.value)}
            required
          />
        </div>
        <div className="create-user-buttons">
        <button type="submit">Create</button>
        </div>
      </form>
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

export default Create;
