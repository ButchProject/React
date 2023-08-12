import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './styles/App.css';
import NavBar from './components/NavBar';


const MainPage = lazy(() => import('./pages/MainPage'));
const ChatPage = lazy(() => import('./pages/Chat'));
const LoginPage = lazy(() => import('./pages/Login'));
const WriteBoardPage = lazy(() => import('./pages/WriteBoard'));
const RegisterPage = lazy(() => import('./pages/Register'));
const BoardPage = lazy(() => import('./pages/Board'));
const AdminMain = lazy(() => import('./admin/Main'));
const RegisterInfo = lazy(() => import('./admin/RegisterInfo'));


function App() {
  return (
    <Router>
      <div className="card dock-demo">
        <div className="card-container">
          <AppContainer />
        </div>
      </div>
    </Router>
  );
}
function AppContainer() {
  const location = useLocation();
  const { pathname } = location;
  const displayNavbar =
   pathname 
      !== "/" 
      && pathname !== "/login" 
      && pathname !== "/findUser" 
      && pathname !== "/register" 
      && pathname !== "/admin"
      && pathname !== "/admin/RegisterInfo";

  return (
    <div className={`app-container ${displayNavbar ? "" : "full-width"}`}>
      {displayNavbar && (
        <div className="navbar-container">
          <NavBar />
        </div>
      )}
      <div
        className={`pages-container ${
          displayNavbar ? "page-layout" : "full-width"
        }`}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/WriteBoard" element={<WriteBoardPage />} />
            <Route path="/board" element={<BoardPage />} />
            <Route path="/admin" element={<AdminMain />} />
            <Route path="/admin/RegisterInfo" element={<RegisterInfo />} />
            
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}


export default App;
