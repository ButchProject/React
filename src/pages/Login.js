import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../apiServices/Auth";
import "../styles/Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [memberEmail, setEmail] = useState("");
  const [memberPassword, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const goToPage = (path) => {
    navigate(path);
  };

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
        console.log("Response from server:", response);

        // Assuming the token is located at response.data.token
        const token = response.token;
        window.localStorage.setItem("token", token);

        navigate("/main");
      })

      .catch((error) => {
        // 오류 메시지를 출력하고 실패 메시지를 표시합니다.
        console.log(error);
        setErrorMessage("로그인에 실패했습니다.");
      });
  };

  return (
    <div>
      <img
        className="logo-black"
        alt="logo-black"
        src={`${process.env.PUBLIC_URL}/image/logo-black.png`}
        onClick={() => goToPage("/")}
      />
      <button className="go_home" onClick={() => goToPage("/academyhome")}>
        홈페이지
      </button>

      <img
        className="logo-big"
        alt="logo-big"
        src={`${process.env.PUBLIC_URL}/image/logo-big.png`}
        onClick={() => goToPage("/academyhome")}
      />
      <div className="login-container">
        <h1 className="title">로그인</h1>
        <form className="login-form" onSubmit={handleSubmit}>
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
          <button
            className="login-button"
            type="submit"
            onMouseDownCapture={(e) => e.stopPropagation()}
            onMouseUpCapture={(e) => e.stopPropagation()}
          >
            로그인하기
          </button>
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
      </div>
    </div>
  );
}
