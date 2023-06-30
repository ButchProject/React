import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Chat from './components/Chat';
import Map from './components/Map';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">회원가입</Link>
            </li>
            <li>
              <Link to="/chat">채팅</Link>
            </li>
            <li>
              <Link to="/map">맵</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/map" element={<Map />} /> {/* 수정된 부분 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
