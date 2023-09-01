import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import '../styles/NavBar.css';

function NavBar() {
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const [isBoardHovered, setIsBoardHovered] = useState(false);
  const [isChatHovered, setIsChatHovered] = useState(false);

  const handleProfileMouseEnter = () => {
    setIsProfileHovered(true);
  };
  const handleProfileMouseLeave = () => {
    setIsProfileHovered(false);
  };

  const handleBoardMouseEnter = () => {
    setIsBoardHovered(true);
  };
  const handleBoardMouseLeave = () => {
    setIsBoardHovered(false);
  };

  const handleChatMouseEnter = () => {
    setIsChatHovered(true);
  };
  const handleChatMouseLeave = () => {
    setIsChatHovered(false);
  };

  const profilePath = "/profile";
  const boardPath = "/board";
  const chatPath = "/chat";
  const loginPath = "/";

  const currentPath = window.location.pathname;


  const profilenormal = `${process.env.PUBLIC_URL}/image/profile.png`;
  const profileclick = `${process.env.PUBLIC_URL}/image/profile-click.png`;
  const boardnormal = `${process.env.PUBLIC_URL}/image/board.png`;
  const boardclick = `${process.env.PUBLIC_URL}/image/board-click.png`;
  const chatnormal = `${process.env.PUBLIC_URL}/image/chat.png`;
  const chatclick = `${process.env.PUBLIC_URL}/image/chat-click.png`;

  return (
    <div className="dock-window">
      <div className="navbar-logo">
        <img
          src={`${process.env.PUBLIC_URL}/image/miniLogo.png`}
          alt="Mini Logo"
          onClick={() => (window.location.href = "/main")}
        />
      </div>
      <ButtonGroup vertical className="button-group">
        <Button
          className={`profile-button ${isProfileHovered ? "hover-image" : ""}`}
          onClick={() => (window.location.href = profilePath)}
          onMouseEnter={handleProfileMouseEnter}
          onMouseLeave={handleProfileMouseLeave}
          style={{
            backgroundImage: `url(${
              currentPath === profilePath || isProfileHovered ? profileclick : profilenormal
            })`,
          }}
        >
        </Button>
        <Button
          className={`board-button ${isBoardHovered ? "hover-image" : ""}`}
          onClick={() => (window.location.href = boardPath)}
          onMouseEnter={handleBoardMouseEnter}
          onMouseLeave={handleBoardMouseLeave}
          style={{
            backgroundImage: `url(${
              currentPath === boardPath || isBoardHovered ? boardclick : boardnormal
            })`,
          }}
        >
        </Button>
        <Button
          className={`chat-button ${isChatHovered ? "hover-image" : ""}`}
          onClick={() => (window.location.href = chatPath)}
          onMouseEnter={handleChatMouseEnter}
          onMouseLeave={handleChatMouseLeave}
          style={{
            backgroundImage: `url(${
              currentPath === chatPath || isChatHovered ? chatclick : chatnormal
            })`,
          }}
        >
        </Button>
      </ButtonGroup>
      <Button
        className="logout-button"
        onClick={() => (window.location.href = loginPath)}
      >
        로그아웃
      </Button>
    </div>
  );
}

export default NavBar;