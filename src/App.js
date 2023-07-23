// App.js
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Redirect } from 'react-router-dom';
import './Styles/App.css';
import NavBar from './Components/NavBar';
import Login from './Pages/Login';

const MainPage = lazy(() => import('./Pages/mainPage'));
const ChatPage = lazy(() => import('./Pages/Chat'));
const LoginPage = lazy(() => import('./Pages/Login'));
const MapPage = lazy(() => import('./Pages/Map'));
const RegisterPage = lazy(() => import('./Pages/Register'));

function App() {
    return (
        <Router>
            <div className='card dock-demo'>
                <div className='app-container'>
                    <NavBar />
                    <div className='pages-container'>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Routes>
                                <Route path='/' element={<LoginPage />} />
                                <Route path="/main" element={<MainPage />} />
                                <Route path='/finder' element={<ChatPage />} />
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