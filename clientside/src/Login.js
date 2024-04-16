import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider'; // Import the useAuth hook

function Login() {
  const navigate = useNavigate();

  const [emailID, setEmailID] = useState("");
  const [password, setPassword] = useState("");

  const { token, userid, role, login } = useAuth(); // Use the useAuth hook
  useEffect(() => {
    console.log(token);
    if (token) {
      navigate(`/landing/${userid}`, { state: { role: role } })
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/login', { emailID, password });
      const userId = response.data.userId;
      console.log('paka userid' + userId);
      const responseData = await response.data;

      const jwtToken = responseData.token;
      console.log("jwttt----", jwtToken)

      if (response.status === 200) {
        alert('Login successful');
        // localStorage.setItem('token', jwtToken); 
        login(jwtToken, userId, responseData.role);
        navigate(`/landing/${userId}`, {state: responseData});
      } else if (response.status === 501) {
    alert('Login failed');
  } else {
    alert(`Unexpected response status: ${response.status}`);
  }
    } catch (error) {
      if ( error.response.status === 501)
      alert('Incorrect email or password');
      console.error('Error logging in:', error);
    }
  };

  const onForgetClicked = async () => {
    axios
      .get('http://localhost:5000/sendmail', {params: {requestingUser: emailID}})
      .then((res) => {
        if(res.status === 200)
          alert('Mail Sent!');
      }).catch(err => {
        console.log("i",err);
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Login</h1>
      </header>
      <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
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
        <div className="login-buttons">
        <button type="submit">Login</button>
        <button type="button" onClick={() => {
          onForgetClicked();
        }}>Forget pw</button>
        </div>
      </form>
      </div>
    </div>
  );
}

export default Login;
