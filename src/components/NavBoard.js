// NavBoard.js
import React from "react";
import { useNavigate } from "react-router-dom";

const NavBoard = ({ onWriteButtonClick }) => {
    return (
        <div>
            {/* 다른 코드... */}
            <button onClick={onWriteButtonClick}>게시글 작성</button>
        </div>
    );
};

export default NavBoard;
