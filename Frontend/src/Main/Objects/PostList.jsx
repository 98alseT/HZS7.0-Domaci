import React, { useState, useEffect } from 'react';
import Post from '../Objects/Post';

const PostList = ({ events }) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/get-username', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setUsername(data.username);
        } else {
          throw new Error('Failed to fetch username');
        }
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchUsername(); // Call the function inside useEffect
  }, []); // Run only once when the component mounts

  return (
    <div>
      {events.length > 0 ? (
        events.map((event) => (
          <Post key={event._id} info={event} username={username} />
        ))
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
};

export default PostList;
