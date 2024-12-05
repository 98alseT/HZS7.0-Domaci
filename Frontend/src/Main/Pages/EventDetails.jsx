import React, { useEffect, useState } from 'react';
import style from '../PagesCSS/AddPost.Module.css';
import img from '../../assets/testEvent.jpg';
import { useNavigate, useParams } from 'react-router-dom';

const EventDetails = () => {
  const navigate = useNavigate();
  const { postId } = useParams(); // Extract postId from URL
  const [post, setPost] = useState(null); // State for post data

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/event/${postId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Include cookies for authentication
        });

        if (response.ok) {
          const data = await response.json();
          setPost(data); // Store post data in state
        } else {
          console.error('Failed to fetch post data');
        }
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchPostData();
  }, [postId]);

  // Display loading message until data is fetched
  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div className={style['main']}>
      <div className={style['left-section']}>
        <h1>{post.title}</h1>
        <div className={style['description']}>
          <p>{post.description}</p>
        </div>
        <div className={style['buttons']}>
          <button className={style['backButton']} onClick={() => navigate('/')}>
            Nazad
          </button>
          <button className={style['includeButton']}>Uključi</button>
        </div>
      </div>

      <div className={style['right-section']}>
        <div className={style['imageContainer']}>
          <img
            src={post.eventImage || 'placeholder.jpg'} // Use post image or a fallback
            alt="event-poster"
            className={style['image']}
          />
        </div>
        <div className={style['details']}>
          <div className={style['locationAndTime']}>
            <span className={style['location']}>{post.location}</span>
            <span className={style['time']}>
              {post.date} {post.time}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
