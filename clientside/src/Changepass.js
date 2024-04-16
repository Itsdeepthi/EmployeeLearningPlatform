import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Changepass = () => {
  const emailID = new URLSearchParams(useLocation().search).get('emailID');
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("changed pass frontend");
    
    axios.post('http://localhost:5000/update', { emailID, newpassword: password })
      .then((res) => {
        if (res.status === 200) {
          console.log("changed pass frontend");
          navigate('/'); // Navigate to /login page
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <header className="App-header">
        <h1>Change Password</h1>
      </header>
      <div className="change-password-container">
        <div className="login-form">
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="change-password-buttons">
            <button type="button" onClick={handleClick}>Change Password</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Changepass;
