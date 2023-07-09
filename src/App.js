import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Chat from './Pages/Chat';
import Map from './Pages/Map';
import CollapsibleExample from './nav';

function App() {
  return (
    <Router>
      <div className="App">
        <CollapsibleExample />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/map" element={<Map />} /> {/* 수정된 부분 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
