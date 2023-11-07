import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MainPage.css";

const MainPage = () => {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);

  const moveToPage = (path) => {
    navigate(path);
  };

  const goToPage = (path) => {
    setIsClicked(true);
    setTimeout(() => navigate(path), 1000); // Adjust delay as needed
  };

  const clickedImage = `${process.env.PUBLIC_URL}/image/bus-y.png`;

  return (
    <div className="layer">
      <img
        className="logo-black"
        alt="logo-black"
        src={`${process.env.PUBLIC_URL}/image/logo-black.png`}
        onClick={() => moveToPage("/")}
      />
      <button className="go_login" onClick={() => moveToPage("/academyhome")}>
        로그아웃
      </button>

      <div className="contents-container">
        <div className="description-container">
          <div className="d1">
            <h1 className="bigtitle">학원 HOME</h1>
            <div className="smalltitle">학원을 운영하시나요?</div>
          </div>
          <h3 className="d2">
            학원 간 셔틀버스 노선 공유를 통해 비용을 절약해보세요
          </h3>
        </div>
        <button className="button1" onClick={() => goToPage("/profilepage")}>
          <img
            className="profilepic"
            alt="profilepic"
            src={`${process.env.PUBLIC_URL}/image/profilepic.png`}
          />
          <div className="profile-guide">
            <h2 className="guide1">프로필</h2>
            <div className="guide2">
              운영하는 학원에 대한 정보를 업로드할 수 있어요
            </div>
            <h4 className="gonow">바로가기</h4>
            <img
              className="gopic"
              alt="gopic"
              src={`${process.env.PUBLIC_URL}/image/goicon.png`}
            />
          </div>
        </button>
        <button className="button2" onClick={() => goToPage("/board")}>
          <img
            className="boardpic"
            alt="boardpic"
            src={`${process.env.PUBLIC_URL}/image/boardpic.png`}
          />
          <div className="board-guide">
            <h2 className="guide1">게시판</h2>
            <div className="guide2">
              함께 버스 노선을 공유할 학원을 찾아보세요
            </div>
            <h4 className="gonow">바로가기</h4>
            <img
              className="gopic"
              alt="gopic"
              src={`${process.env.PUBLIC_URL}/image/goicon.png`}
            />
          </div>
        </button>
        <button className="button3" onClick={() => goToPage("/chat")}>
        <img
            className="chatpic"
            alt="chatpic"
            src={`${process.env.PUBLIC_URL}/image/chatpic.png`}
          />
          <div className="chat-guide">
            <h2 className="guide1">채팅</h2>
            <div className="guide2">
              다른 학원들과 채팅을 통해 공유할 노선을 짜보세요
            </div>
            <h4 className="gonow">바로가기</h4>
            <img
              className="gopic"
              alt="gopic"
              src={`${process.env.PUBLIC_URL}/image/goicon.png`}
            />
          </div>
        </button>
      </div>
    </div>
  );
};

export default MainPage;
