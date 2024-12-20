import React, { useState } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Main from './Main/Pages/Main';
import AddPost from './Main/Pages/AddPost.jsx';
import EventDetails from './Main/Pages/EventDetails';
import EventUpdate from './Main/Pages/EventUpdate';
import SignUp from './Main/Pages/SignUp';
import LogIn from './Main/Pages/LogIn.jsx';
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
        <Route path="/event-details/:postId" element={<EventDetails />}/>
        <Route path="/event-update/:postId" element={<EventUpdate />}/>
        <Route path="/sign-up" element={<SignUp />}/>
        <Route path="/log-in" element={<LogIn />}/>
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
 