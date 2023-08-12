import React from 'react';
import { NavLink } from 'react-router-dom';
import './adminStyles/SideBar.css';

const SideBar = () => {
  return (
    <div className="side-bar">
      <ul>
        <li>
          <NavLink activeClassName="active" to="/admin/RegisterInfo">
            회원가입 목록
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
