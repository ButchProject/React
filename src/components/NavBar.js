import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Profile from "../pages/Profile.js";
import "../styles/NavBar.css";

function NavBar() {
  const [isBoardHovered, setIsBoardHovered] = useState(false);
  const [isChatHovered, setIsChatHovered] = useState(false);
  const [isProfileClicked, setIsProfileClicked] = useState(false);

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

  useEffect(() => {
    if (window.location.pathname === profilePath) {
      setIsProfileClicked(true);
    }
  }, []);

  const boardPath = "/board";
  const writeboardPath = "/writeboard";
  const chatPath = "/chat";
  const profilePath = "/profilepage";
  const loginPath = "/";

  const currentPath = window.location.pathname;
  const boardnormal = `${process.env.PUBLIC_URL}/image/board.png`;
  const boardclick = `${process.env.PUBLIC_URL}/image/board-click.png`;
  const chatnormal = `${process.env.PUBLIC_URL}/image/chat.png`;
  const chatclick = `${process.env.PUBLIC_URL}/image/chat-click.png`;

  return (
    <div>
      <div className="dock-window">
        <img
          className="navbar-logo"
          src={`${process.env.PUBLIC_URL}/image/logo-black.png`}
          alt="Mini Logo"
          onClick={() => (window.location.href = "/main")}
        />
        <ButtonGroup className="button-group">
          <div>
            <Button
              className={`board-button ${isBoardHovered ? "hover-image" : ""}`}
              onClick={() => (window.location.href = boardPath)}
              onMouseEnter={handleBoardMouseEnter}
              onMouseLeave={handleBoardMouseLeave}
              style={{
                backgroundImage: `url(${
                  currentPath === boardPath ||
                  currentPath === writeboardPath ||
                  isBoardHovered
                    ? boardclick
                    : boardnormal
                })`,
              }}
            ></Button>
            <div
              className={`underbar-board ${
                currentPath === boardPath ||
                currentPath === writeboardPath ||
                isBoardHovered
                  ? "hover-underbar"
                  : ""
              }`}
              onClick={() => (window.location.href = boardPath)}
              onMouseEnter={handleBoardMouseEnter}
              onMouseLeave={handleBoardMouseLeave}
            ></div>
          </div>

          <div>
            <Button
              className={`chat-button ${isChatHovered ? "hover-image" : ""}`}
              onClick={() => (window.location.href = chatPath)}
              onMouseEnter={handleChatMouseEnter}
              onMouseLeave={handleChatMouseLeave}
              style={{
                backgroundImage: `url(${
                  currentPath === chatPath || isChatHovered
                    ? chatclick
                    : chatnormal
                })`,
              }}
            ></Button>
            <div
              className={`underbar-board ${
                currentPath === chatPath || isChatHovered
                  ? "hover-underbarc"
                  : ""
              }`}
              onClick={() => (window.location.href = chatPath)}
              onMouseEnter={handleBoardMouseEnter}
              onMouseLeave={handleBoardMouseLeave}
            ></div>
          </div>
        </ButtonGroup>

        <div
          className="user-container"
          onClick={() => setIsProfileClicked(!isProfileClicked)}
        >
          <img
            className="profileicon"
            src={`${process.env.PUBLIC_URL}/image/profile-icon.png`}
            alt="profile icon"
          />
          <h3 className="username">홍길동</h3>
          <p4 style={{ marginLeft: "5px" }}>님</p4>
          <img
            className="tri"
            src={`${process.env.PUBLIC_URL}/image/tri.png`}
            alt="tri"
          />
        </div>
        <Button
          className="logout-button"
          onClick={() => (window.location.href = loginPath)}
        >
          로그아웃
        </Button>
      </div>
      <div
        className="dropdown"
        style={{ display: isProfileClicked ? "block" : "none" }}
      >
        <Profile />
      </div>
    </div>
  );
}

export default NavBar;
