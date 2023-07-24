import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './Styles/App.css';
import NavBar from './Components/NavBar';

const MainPage = lazy(() => import('./Pages/mainPage'));
const ChatPage = lazy(() => import('./Pages/Chat'));
const LoginPage = lazy(() => import('./Pages/Login'));
const MapPage = lazy(() => import('./Pages/Map'));
const RegisterPage = lazy(() => import('./Pages/Register'));
const BoardPage = lazy(() => import('./Pages/Board'));

function App() {
  return (
    <Router>
      <div className="card dock-demo">
        <AppContainer />
      </div>
    </Router>
  );
}

function AppContainer() {
  const location = useLocation();
  const { pathname } = location;
  return (
    <div>
      { pathname !== "/register" && pathname !== "/" && pathname !== "/login" && <NavBar /> }
      <div className="app-container">
        <div className="pages-container">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/main" element={<MainPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/Map" element={<MapPage />} />
              <Route path="/board" element={<BoardPage />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default App;
