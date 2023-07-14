import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './Styles/App.css';
import { Dock } from 'primereact/dock';

const ChatPage = lazy(() => import('./Pages/Chat'));
const LoginPage = lazy(() => import('./Pages/Login'));
const MapPage = lazy(() => import('./Pages/Map'));
const RegisterPage = lazy(() => import('./Pages/Register'));

// NavBar 컴포넌트 선언
function NavBar() {
  const [position] = useState('left');
  const items = [
    {
    label: 'Finder',
    icon: () => (
    <img
             alt='Finder'
             src='https://primefaces.org/cdn/primereact/images/dock/finder.svg'
             width='100%'
           />
    ),
    command: () => {
    window.location.href = '/finder';
    },
    },
    {
    label: 'App Store',
    icon: () => (
    <img
             alt='App Store'
             src='https://primefaces.org/cdn/primereact/images/dock/appstore.svg'
             width='100%'
           />
    ),
    command: () => {
    window.location.href = '/app-store';
    },
    },
    {
    label: 'Photos',
    icon: () => (
    <img
             alt='Photos'
             src='https://primefaces.org/cdn/primereact/images/dock/photos.svg'
             width='100%'
           />
    ),
    command: () => {
    window.location.href = '/photos';
    },
    },
    {
    label: 'Trash',
    icon: () => (
    <img
             alt='trash'
             src='https://primefaces.org/cdn/primereact/images/dock/trash.png'
             width='100%'
           />
    ),
    command: () => {
    window.location.href = '/register';
    },
    },
    ];


    return (
      <div className='dock-window'>
        <Dock model={items} position={position} />
      </div>
    );
  }

function App() {
  return (
    <Router>
      <div className='card dock-demo'>
        <div className='app-container'>
          <NavBar />
          <div className='pages-container'>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path='/finder' element={<ChatPage />} />
                <Route path='/app-store' element={<LoginPage />} />
                <Route path='/photos' element={<MapPage />} />
                <Route path='/register' element={<RegisterPage />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      </div>
    </Router>
  );
}


export default App;
