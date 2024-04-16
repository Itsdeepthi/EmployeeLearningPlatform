// src/components/UserDetails.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDetails = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/first/'); // assuming your backend server is running on port 5000
                setUser(response); // Get the first user
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>User Details</h2>
            {user ? (
                <div>
                    <p><strong>Full Name:</strong> {user.fullName}</p>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
                    <p><strong>Email ID:</strong> {user.emailID}</p>
                    <p><strong>Department:</strong> {user.department}</p>
                </div>
            ) : (
                <div>No user found</div>
            )}
        </div>
    );
};

export default UserDetails;
