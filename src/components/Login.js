import React, { useState } from 'react';
import { loginUser } from "../ApiServices/auth"; // import loginUser function

const Login = (props) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ id, password });
      // 로그인 성공 시, 메인 페이지로 이동하거나 사용자에게 완료 메시지를 표시합니다.

    } catch (error) {
      // 로그인 실패 시, 에러 메시지를 사용자에게 표시합니다.
      setErrorMessage("로그인에 실패하였습니다.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'id':
        setId(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>아이디: </label>
          <input
            type="id"
            name="id"
            value={id}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">확인</button>
          <button type="button" onClick={props.changeMode}>회원가입</button>
          <button type="button" onClick={props.changeMode}>비밀번호 찾기</button>
          <button type="button" onClick={props.changeMode}>아이디 찾기</button>
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Login;
