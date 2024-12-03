const fetch = require('node-fetch');  // Import node-fetch for making HTTP requests

const url = 'http://localhost:4000/signin'; // Replace with your API endpoint
const data = {
    username: "john_doe",
    password: "hashed_password_123", // Ensure this is hashed
    email: "johndoe@example.com",
    verified: false
};

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN' // Replace with actual token if required
  },
  body: JSON.stringify(data)
};

fetch(url, options)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Response from server:', data); // Handle the response
  })
  .catch(error => {
    console.error('There was an error!', error); // Handle errors
  });
