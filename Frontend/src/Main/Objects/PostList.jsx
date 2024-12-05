import React, { useState, useEffect } from 'react';
import Post from '../Objects/Post';

const PostList = () => {
  const [events, setEvents] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Fetch the logged-in username from the backend
    const fetchUsername = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/get-username', {
          method: 'GET',
          credentials: 'include',  // Send cookies with the request
        });

        if (response.ok) {
          const data = await response.json();
          setUsername(data.username);  // Set the username in state
        } else {
          throw new Error('Failed to fetch username');
        }
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    // Fetch the events
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/display', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            typePost: 'event',
          }),
          credentials: 'include',  // Include cookies with the request
        });

        if (response.ok) {
          const data = await response.json();
          setEvents(data);  // Update state with fetched events
        } else {
          throw new Error('Failed to fetch events');
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchUsername();  // Fetch username
    fetchEvents();    // Fetch events
  }, []);

  return (
    <div>
      {events.length > 0 ? (
        events.map((event) => (
          <Post
            key={event._id}
            info={event}
            username={username}  // Pass username to Post component
          />
        ))
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
};

export default PostList;
