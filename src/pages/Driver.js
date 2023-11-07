import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Driver.css";

const Driver = () => {
  const navigate = useNavigate();

  const goToPage = (path) => {
    navigate(path);
  };

  return (
    <div className="layer">
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
        <div className="description-container">
          <div className="d1">
            <h1 className="bigtitle">기사용 앱</h1>
            <div className="smalltitle">학원 버스를 운영하시나요?</div>
          </div>
          <h3 className="d2">
            탑승할 학생들의 위치를 파악하고 편하게 관리해보세요
          </h3>
        </div>
        <button className="download">모바일 버전 다운로드</button>
        <img
          className="driverhome"
          alt="driverhome"
          src={`${process.env.PUBLIC_URL}/image/driverhome.png`}
        />
      </div>
    </div>
  );
};

export default Driver;
