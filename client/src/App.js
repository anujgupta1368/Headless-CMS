import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import "./index.css"
import CreateEntity from './pages/CreateEntity';
import AllEntity from './pages/AllEntity';

const App = () => {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <Routes>
          <Route path="/" element={<AllEntity />} />
          <Route path="/createEntity" element={<CreateEntity/>}/>
        </Routes>
      </div>
    </>
  );
};

export default App;
