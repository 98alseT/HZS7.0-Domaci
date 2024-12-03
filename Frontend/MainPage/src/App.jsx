import React, { useState } from 'react';
import Header from './Header/Header'
import Main from './Main/Main';

const App = () => {
  const [isSideSearchVisible, setSideSearchVisible] = useState(false);

  const toggleSideSearch = () => {
    setSideSearchVisible(!isSideSearchVisible);
  };

  return (
    <>
      <Header toggleSideSearch={toggleSideSearch} />
      <Main isSideSearchVisible={isSideSearchVisible} />
    </>
  );
};

export default App;
