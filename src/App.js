import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Chat from "./Pages/Chat";
import Map from "./Pages/Map";
import CollapsibleExample from "./nav";
import "./Styles/App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <video muted autoPlay loop>
          <source src="https://tunabus.s3.ap-northeast-2.amazonaws.com/Video/videoTest.mp4" type="video/webm" />
          <strong>Your browser does not support the video tag.</strong>
        </video>
        <div className="jb-text">
          <p>Lorem Ipsum Dolor</p>
        </div>
        <CollapsibleExample />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/map" element={<Map />} />
        </Routes> 
      </div>
    </Router>
  );
}

export default App;