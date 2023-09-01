import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "primereact/sidebar";
import { Button } from "react-bootstrap";
import { ScrollTop } from "primereact/scrolltop";
import { loginUser } from "../apiServices/Auth";
import "../styles/Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [memberEmail, setEmail] = useState("");
  const [memberPassword, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const Pbus1 = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/image/bus1.png)`,
  };

  const Pbus2 = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/image/bus2.png)`,
  };

  const Pbus3 = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/image/bus3.png)`,
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const normalImage = `${process.env.PUBLIC_URL}/image/userIcon-black.png`;
  const hoverImage = `${process.env.PUBLIC_URL}/image/userIcon.png`;

  // 스크롤 이벤트 처리 함수
  const handleScroll = () => {
    const elements = document.querySelectorAll(".scroll-animation");
    const windowHeight = window.innerHeight;

    elements.forEach(function (element) {
      const positionFromTop = element.getBoundingClientRect().top;

      if (positionFromTop - windowHeight <= 0) {
        element.classList.add("visible");
      } else {
        element.classList.remove("visible");
      }
    });
  };

  // 스크롤 이벤트 리스너 등록 및 해제
  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      memberEmail: memberEmail,
      memberPassword: memberPassword,
    };

    // 콘솔에 userData 객체 출력
    console.log("userData:", userData);

    loginUser(userData)
      .then((response) => {
        // 서버에서 받은 데이터를 출력하고 성공 메시지를 표시합니다.
        console.log(response.data);
        navigate("/main");
      })
      .catch((error) => {
        // 오류 메시지를 출력하고 실패 메시지를 표시합니다.
        console.log(error);
        setErrorMessage("로그인에 실패했습니다.");
      });
  };

  return (
    <div className="login-container">
      <section className="section" id="Pbus1" style={Pbus1}>
        <div className="main-title-container">
          <div className="main-title">함께 타는 공유버스, BUTCH</div>
        </div>
      </section>

      <section
        className="section with-text image-centered scroll-animation"
        id="Pbus2"
        style={Pbus2}
      >
        <div className="text-box">
          <h2>서비스 설명1</h2>
          <p>설명설명</p>
          <p>설명설명</p>
          <p>설명설명</p>
        </div>
      </section>

      <section
        className="section with-text image-centered scroll-animation"
        id="Pbus3"
        style={Pbus3}
      >
        <div className="text-box">
          <h2>서비스 설명2</h2>
          <p>설명설명</p>
          <p>설명설명</p>
          <p>설명설명</p>
        </div>
      </section>

      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        className="w-full md:w-20rem lg:w-30rem"
      >
        <form className="login-form" onSubmit={handleSubmit}>
          <img
            src={`${process.env.PUBLIC_URL}/image/logo-black.png`}
            alt="logo-black"
            className="logo-black"
          />
          <br />
          <h2 className="login-title">로그인</h2>
          <input
            className="email-input"
            type="email"
            id="email"
            name="email"
            autoComplete="off"
            placeholder="E-mail"
            value={memberEmail}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="pw-input"
            type="password"
            id="password"
            name="password"
            autoComplete="off"
            placeholder="Password"
            value={memberPassword}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage && (
            <div className="error-container">
              <p className="error-message">{errorMessage}</p>
            </div>
          )}
          <Button
            className="login-button"
            type="submit"
            onMouseDownCapture={(e) => e.stopPropagation()}
            onMouseUpCapture={(e) => e.stopPropagation()}
          >
            로그인하기
          </Button>
          <div className="parent-container">
            <div className="text-container">
              <span
                className="text-action"
                onClick={() => (window.location.href = "/register")}
              >
                회원가입
              </span>
              <span className="separator">|</span>
              <span
                className="text-action"
                onClick={() => (window.location.href = "/findUser")}
              >
                아이디 / 비밀번호 찾기
              </span>
            </div>
          </div>
        </form>
      </Sidebar>

      <div className="sidebar-button-container">
        <Button
          className={`sidebar-button ${isHovered ? "hover-image" : ""}`}
          variant="outline-warning"
          onClick={() => setVisible(true)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            backgroundImage: `url(${isHovered ? hoverImage : normalImage})`,
            opacity: isHovered ? 1 : 0.3,
          }}
        ></Button>
      </div>

      <ScrollTop />
    </div>
  );
}
