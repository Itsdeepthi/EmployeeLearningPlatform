import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
// import { DisplaySkills } from './DisplaySkills';
import { useAuth } from './AuthProvider';

function SkillForm() {
    const [skills, setSkills] = useState([]);
    const [skill, setSkill] = useState('');
    const [experience, setExperience] = useState(0);
    const [strength, setStrength] = useState(0);
    const { userId } = useParams();
  const [userData, setUserData] = useState({});
  
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  })

 

    useEffect(() => {
        const fetchCurrentUser = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/currentuser/${userId}`);
            setUserData(response.data);

        } catch (error) {
            console.error('Error fetching current user:', error);
        }
    };
        fetchCurrentUser();
    }, []);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/displayskills/${userId}`);
                setSkills(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchSkills();
    }, []);

    const handleSubmit = async (e) => {
        try {
            // console.log("entering ",{skill, experience, strength});
        const response = await axios.post(`http://localhost:5000/createskills/${userId}`,
            {skill, experience, strength}
        );
        console.log("after response")
        // Check if skillName is not empty
        if (response.status === 200) {
            alert('Created skills successful');
            console.log(response);
            setSkills([...skills, response.data.data]);
            setSkill("");
            setExperience(0);
            setStrength(0);
        } else {
            alert('Creation failed');
        } 
    }
        catch (error) {
        console.error('Error Creating:', error);
        }
    };
    
    useEffect(() => {
        console.log(skills);
    }, [skills]);   

  return (
    <div className="App">
      <header className="App-header">
        <h1>Skills</h1>
      </header>
      <div className="skill-container">
      <form onSubmit={handleSubmit} className="skill-form">
        <div className="form-grp">
          <label>
            Skill Name:
            <input
              type="text"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-grp">
          <label>
            Years of Experience:
            <input
              type="number"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-grp">
          <label>
            Strength:
            <input
              type="text"
              value={strength}
              onChange={(e) => setStrength(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="skill-buttons">
        <button type="submit">Add Skill</button>
        </div>
      </form>

      <div className="skills-list">
         <h3>Skills List</h3>
        <ul>
          {skills.map((skill, index) => (
            <li key={index}>
              <strong>{skill.skill}</strong> - {skill.experience} years, Strength: {skill.strength}
            </li>
          ))}
        </ul> 
      </div>
          {/* <DisplaySkills
              userData={userData}
              userId = {userId}
          /> */}
    </div>
    </div>
  );
};

export default SkillForm;
