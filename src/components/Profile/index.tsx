'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileClient = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const userId = localStorage.getItem('userId'); // Replace with actual logic to get the logged-in user's ID

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/user/${userId}`);
        setUser(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/user/${userId}`, {
        name,
        email,
        password, // Ensure to handle password securely (e.g., hashing on the server side)
      });
      alert('Profile updated successfully!');
      router.push('/profile'); // Redirect or update UI as needed
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleClick = () => {
    router.push('/settings');
  };

  return (
    <div>
      {user ? (
        <form onSubmit={handleUpdate}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="flex cursor-pointer items-center justify-center gap-2 rounded bg-primary px-2 py-1 text-sm font-medium text-white hover:bg-opacity-80 xsm:px-4"
          >
            <span>Update Profile</span>
          </button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfileClient;
