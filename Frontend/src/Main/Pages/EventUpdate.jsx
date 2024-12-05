import React, { useEffect, useState } from 'react';
import style from '../PagesCSS/AddPost.Module.css';
import { useNavigate, useParams } from 'react-router-dom';

const EventUpdate = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    description: '',
    location: '',
    date: '',
    time: '',
    type: 'Predavanje',
    tag: 'Statistika',
  });

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/event/${postId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setPost(data);

          // Populate form data with fetched post data
          setFormData({
            title: data.title,
            name: data.name,
            description: data.description,
            location: data.location,
            date: data.date,
            time: data.time,
            type: data.type,
            tag: data.tag,
          });
        } else {
          console.error('Failed to fetch post data');
        }
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchPostData();
  }, [postId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/event/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/');
      } else {
        console.error('Failed to update post');
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div className={style['main']}>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="time">Time:</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="type">Type:</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="Predavanje">Predavanje</option>
            <option value="Izlozba">Izlozba</option>
            <option value="Dan otvorenih vrata">Dan otvorenih vrata</option>
          </select>
        </div>
        <div>
          <label htmlFor="tag">Tag:</label>
          <select
            id="tag"
            name="tag"
            value={formData.tag}
            onChange={handleChange}
            required
          >
            <option value="Statistika">Statistika</option>
            <option value="Numerika">Numerika</option>
            <option value="Vestacka inteligencija">Vestacka inteligencija</option>
            <option value="Back-end">Back-end</option>
            <option value="Front-end">Front-end</option>
            <option value="Primenjena Fizika i Elektrotehnika">Primenjena Fizika i Elektrotehnika</option>
          </select>
        </div>
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default EventUpdate;
