import React, { useState, useEffect } from 'react';
import style from '../PagesCSS/Main.module.css';
import Post from '../Objects/Post';

const PostList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/display', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            typePost: 'event',
          }),
          credentials: 'include',
        })
        
        if (response.ok) {
          const data = await response.json();
          console.log('Events:', data);
          setEvents(data);  // Update your state with the fetched data
        } else {
          throw new Error('Failed to fetch events');
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        setError(error.message);  // Show error in UI
      }    
    };

    fetchEvents();
  }, []);  // Empty dependency array ensures this runs only once, when the component mounts

  const handleDelete = (id) => {
    // Delete event by ID
    fetch(`http://localhost:3000/api/events/${id}`, {
      method: 'DELETE',
      credentials: 'include', // Include credentials (cookies)
    })
      .then(response => {
        if (response.ok) {
          // If the response is successful, remove the deleted post from the list
          setPosts(posts.filter(post => post._id !== id));
        } else {
          alert('Error deleting event');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
    {events.length > 0 ? (
      events.map((event) => (
        <Post 
          key={event._id}
          info={event}
        />
      ))
    ) : (
      <p>No events found.</p>
    )}
  </div>
  );
};

export default PostList;
