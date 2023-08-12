import React from "react";
import { useNavigate } from "react-router-dom";
import NavBoard from "../components/NavBoard"; // navBoard.js를 가져옵니다.

const WriteBoard = () => {
  const navigate = useNavigate();

  const goToWriteBoard = () => {
    navigate("/writeBoard");
  };

  return (
    <NavBoard>
      <button onClick={goToWriteBoard}>게시글 작성</button>
    </NavBoard>
  );
};

export default WriteBoard;
