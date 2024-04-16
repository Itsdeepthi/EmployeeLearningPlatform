import React, { useEffect } from 'react';
import { useLocation, Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider'; // Import the useAuth hook

function Dashboard() {
  const location = useLocation();
  const { userId } = useParams();
  const role = location.state ? location.state.role : '';
  console.log(userId);
  const navigate = useNavigate();

  const { token, logout } = useAuth(); // Use the useAuth hook

  useEffect(() => {
    if (!token) {
      navigate(`/login`)
    }
  })

  return token ? (
    <div className="App">
      <header className="App-header">
        <h1 style={{ margin: '0 auto' }}>{role === 'user' ? 'Hello User' : 'Hello Admin'}</h1>
        <div className="header-buttons"><button onClick={logout}>Logout</button></div>
      </header>
      <div className="dashboard-container">
          {
        role === 'user' ? <>
          <Link to={`/registerevent/${userId}`}>
            <button>Register</button>
          </Link>
          <Link to={`/landing/${userId}/skill`}>
            <button>Skills</button>
          </Link>
        </> : 
                  <>
                      <Link to={`/createevent`}>
                          <button>Create Events</button>
                      </Link>
                      <Link to={`/create`}>
                          <button>Create Users</button>
                    </Link>
                  </>
      }
      </div>
      
      {/* <div>
        <button onClick={logout}>Logout</button>
      </div> */}
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

export default Dashboard;
