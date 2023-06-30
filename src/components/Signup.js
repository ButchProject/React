import React, { useState } from 'react';
import { registerUser } from "../ApiServices/auth"; // import registerUser function
import axios from 'axios';

const Signup = (props) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    const userData = {
      username: username,
      email: email,
      password: password,
    };

    axios.post('http://localhost:8080/api/users', userData)
      .then((response) => {
        // 서버에서 받은 데이터를 출력하고 성공 메시지를 표시합니다.
        console.log(response.data);
        alert('회원가입이 성공적으로 완료되었습니다.');
      })
      .catch((error) => {
        // 오류 메시지를 출력하고 실패 메시지를 표시합니다.
        console.log(error);
        setErrorMessage('회원가입에 실패했습니다.');
      });
  };




  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'username':
        setUsername(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>아이디:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>이메일:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>비밀번호:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>비밀번호 확인</label>
          <input
            type="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">회원가입 하기</button>
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Signup;
