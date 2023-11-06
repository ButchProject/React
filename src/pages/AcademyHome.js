import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AcademyHome.css";

const AcademyHome = () => {
  const navigate = useNavigate();

  const goToPage = (path) => {
    navigate(path);
  };

  return (
    <div>
      <img
        className="logo-black"
        alt="logo-black"
        src={`${process.env.PUBLIC_URL}/image/logo-black.png`}
        onClick={() => goToPage("/")}
      />
      <button className="go_login" onClick={() => goToPage("/login")}>
        로그인
      </button>

      <div className="contents-container">
        <div className="description-container">서비스 설명</div>
        <div className="button-container">
          <button className="button1" onClick={() => goToPage("/login")}>
            프로필
          </button>
          <button className="button2" onClick={() => goToPage("/login")}>
            게시판
          </button>
          <button className="button3" onClick={() => goToPage("/login")}>
            채팅
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcademyHome;
