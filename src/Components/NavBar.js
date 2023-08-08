import React, { useState } from 'react';
import '../Styles/NavBar.css';

function NavBar() {
  const [activeIndex, setActiveIndex] = useState(null);
  const items = [
    { label: 'Chat', icon: 'chat', onClick: () => (window.location.href = '/chat') },
    { label: 'Map', icon: 'map', onClick: () => (window.location.href = '/map') },
    { label: 'Board', icon: 'board', onClick: () => (window.location.href = '/board') },
  ];

  const handleItemClick = (index, item) => {
    setActiveIndex(index);
    item.onClick();
  };

  const handleClick = (path) => {
    window.location.href = path;
  };

  return (
    <div className="dock-window">
      <div className="navbar-logo">
        <img
          src={`${process.env.PUBLIC_URL}/image/miniLogo.png`}
          alt="Mini Logo"
          onClick={() => (window.location.href = "/main")}
        />
      </div>
      <div className="navbar">
        <ul>
          {items.map((item, index) => (
            <li
              key={index}
              className={`nav-item ${activeIndex === index ? "nav-item-active" : ""}`}
              onClick={() => handleItemClick(index, item)}
            >
              <button>
                <img
                  src={`${process.env.PUBLIC_URL}/image/${item.icon}.svg`}
                  alt={item.label}
                  className="nav-item-icon"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="login-actions">
        <button onClick={() => handleClick("/login")}>로그인</button>
      </div>
    </div>
  );
}

export default NavBar;
