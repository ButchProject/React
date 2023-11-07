import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Profile from "../pages/Profile.js";
import axios from 'axios';
import "../styles/NavBar.css";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
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
  
  const [username, setUsername] = useState('');

  // 컴포넌트 마운트 시 사용자 이름을 가져오기 위한 이펙트 훅
  useEffect(() => {
    // 사용자 이름을 가져오는 비동기 함수를 정의합니다.
    const fetchUsername = async () => {
      try {
        // 'backend-endpoint'를 실제 API 엔드포인트로 교체하세요
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/navbar`);
        const data = await response.json();
        setUsername(data.username); // 반환되는 데이터 구조에 맞게 조정하세요
      } catch (error) {
        console.error("사용자 이름을 가져오는데 실패했습니다", error);
      }
    };

    // fetch 함수를 호출합니다.
    fetchUsername();
  }, []); 
  
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
