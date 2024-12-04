import React, { useState } from 'react';
import Header from './Header/Header';
import Main from './Main/Main';
import AddPost from './Main/AddPost';
import EventDetails from './Main/EventDetails';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  const [isSideSearchVisible, setSideSearchVisible] = useState(false);

  const toggleSideSearch = () => {
    setSideSearchVisible(!isSideSearchVisible);
  };

  return (
    <Router>
      <Header toggleSideSearch={toggleSideSearch} />
      <Routes>
        <Route path="/" element={<Main isSideSearchVisible={isSideSearchVisible} />}/>
        <Route path="/add-post" element={<AddPost />} />
        <Route path="/event-details" element={<EventDetails />}/>
      </Routes>
    </Router>
  );
};

export default App;
