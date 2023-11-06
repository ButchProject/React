import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../apiServices/Auth";
import { Button } from "react-bootstrap";
import "../styles/Register.css";

const Register = (props) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [academyName, setAcademyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [academyAdress, setAcademyAdress] = useState("");
  const [numberOfStudents, setNumberOfStudents] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    const userData = {
      //왼쪽에 있는게 전달하는거임
      memberEmail: email,
      memberPassword: password,
      memberName: name,
      phoneNumber: phoneNumber,
      academyName: academyName,
      academyAdress: academyAdress,
      numberOfStudents: numberOfStudents,
    };

    // 콘솔에 userData 객체 출력
    console.log("userData:", userData);

    registerUser(userData)
      .then((response) => {
        // 서버에서 받은 데이터를 출력하고 성공 메시지를 표시합니다.
        console.log(response.data);
        navigate("/");
      })
      .catch((error) => {
        // 오류 메시지를 출력하고 실패 메시지를 표시합니다.
        console.log(error);
        setErrorMessage("회원가입에 실패했습니다.");
      });
  };

  // handleSubmit 끝
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      case "academyName":
        setAcademyName(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      case "academyAdress":
        setAcademyAdress(value);
        break;
      case "numberOfStudents":
        setNumberOfStudents(value);
        break;
      default:
        break;
    }
  };

  const allInputsFilled = () => {
    return (
      name.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0 &&
      academyName.length > 0 &&
      phoneNumber.length > 0 &&
      academyAdress.length > 0 &&
      numberOfStudents.length > 0 
    );
  };
  

  return (
    <div>
      <img
        className="logo-black"
        alt="logo-black"
        src={`${process.env.PUBLIC_URL}/image/logo-black.png`}
      />
      <Button className="go_login" onClick={() => (window.location.href = "/")}>
        홈페이지 | 로그인
      </Button>
      <div className="container">
        <div className="register-title-container">
          <h2 className="register-title">회원가입</h2>
        </div>
        <div className="inputs">
          <form onSubmit={handleSubmit}>
            <h4 className="email-guide">사용하실 E-mail을 입력해주세요.</h4>
            <div>
              <input
                className="email-input"
                type="email"
                name="email"
                placeholder="E-mail 입력"
                value={email}
                onChange={handleChange}
              />
            </div>
            <h4 className="password-guide">
              사용하실 PASSWORD를 입력해주세요.
            </h4>
            <div>
              <input
                className="firstpw-input"
                type="password"
                name="password"
                placeholder="PASSWORD 입력"
                value={password}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                className="secondpw-input"
                type="password"
                name="confirmPassword"
                placeholder="PASSWORD 확인"
                value={confirmPassword}
                onChange={handleChange}
              />
            </div>
            {password && confirmPassword ? (
              password === confirmPassword ? (
                <p
                  className="password-match-message"
                  style={{ color: "green" }}
                >
                  *PASSWORD가 일치합니다.
                </p>
              ) : (
                <p className="password-match-message" style={{ color: "red" }}>
                  *PASSWORD가 일치하지 않습니다.
                </p>
              )
            ) : null}
            <h4 className="name-guide">이름을 입력해주세요.</h4>
            <div>
              <input
                className="name-input"
                type="text"
                name="name"
                placeholder="이름"
                value={name}
                onChange={handleChange}
              />
            </div>
            <h4 className="phonenumber-guide">전화번호를 입력해주세요.</h4>
            <div>
              <input
                className="phonenumber-input"
                type="tel"
                name="phoneNumber"
                placeholder="전화번호"
                value={phoneNumber}
                onChange={handleChange}
              />
            </div>
            <h4 className="academyname-guide">학원 이름을 입력해주세요.</h4>
            <div>
              <input
                className="academyname-input"
                type="text"
                name="academyName"
                placeholder="학원 이름"
                value={academyName}
                onChange={handleChange}
              />
            </div>
            <h4 className="academyadress-guide">학원 주소를 입력해주세요.</h4>
            <div>
              <input
                className="academyadress-input"
                type="text"
                name="academyAdress"
                placeholder="학원 주소"
                value={academyAdress}
                onChange={handleChange}
              />
            </div>
            <h4 className="numberOfStudent-guide">학생 수를 입력해주세요.</h4>
            <div>
              <input
                className="numberOfStudent-input"
                type="number"
                name="numberOfStudents"
                placeholder="학생 수"
                value={numberOfStudents}
                onChange={handleChange}
              />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div>
              <Button 
                className={`register-button ${allInputsFilled() ? "active" : "inactive"}`}
                type="submit"
                disabled={!allInputsFilled()}
              >
                회원가입 하기
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}; // Register 컴포넌트 끝

export default Register;
