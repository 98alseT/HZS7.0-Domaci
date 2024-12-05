import React, { useState } from 'react';
import style from '../PagesCSS/AddPost.Module.css';
import { useNavigate } from 'react-router-dom';

const AddPost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    description: '',
    location: '',
    date: '',
    time: '',
    type: 'Predavanje',
    tag: 'Statistika'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const postData = {
      title: formData.title,
      name: formData.name,
      description: formData.description,
      location: formData.location,
      date: formData.date,
      time: formData.time,
      type: formData.type,
      tag: formData.tag
    };

    fetch('http://localhost:3000/api/event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
      credentials: 'include',
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(errorData => {
            throw new Error(errorData.message || 'Something went wrong');
          });
        }
        return response.json(); 
      })
      .then(data => {
        console.log('Success:', data);
        navigate('/');
      })
      .catch(error => {
        console.error('Error:', error);
        alert(`Error: ${error.message}`);
      });
    
  };

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

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddPost;
