import React from 'react';
import { Link } from 'react-router-dom';

function Welcome() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome</h1>
      </header>
      <div className="dashboard-container">
        {
          
          <Link to="/login">
            <button>Login</button>
          </Link>
        }
        </div>
    </div>
  );
}

export default Welcome;
