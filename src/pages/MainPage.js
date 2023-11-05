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
    <div>
      <img
        className="logo-black"
        alt="logo-black"
        src={`${process.env.PUBLIC_URL}/image/logo-black.png`}
        onClick={() => moveToPage("/")}
      />
      <button className="go_login" onClick={() => moveToPage("/academyhome")}>
        로그아웃
      </button>

      <div className="description-container">서비스 설명</div>
      <button
        className={`button1 ${isClicked ? "button1-clicked" : ""} ${isClicked ? "move-left" : ""}`}
        style={
          isClicked
            ? { backgroundImage: `url(${clickedImage})`, opacity: 1 }
            : {}
        }
        onClick={() => goToPage("/profilepage")}
      >
        프로필
      </button>
      <button className="button2" onClick={() => goToPage("/board")}>
        게시판
      </button>
      <button className="button3" onClick={() => goToPage("/chat")}>
        채팅
      </button>
    </div>
  );
};

export default MainPage;
