import React from 'react';
import SideBar from './SideBar';
import './adminStyles/AdminLayout.css';

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <SideBar />
      <div className="admin-content">{children}</div>
    </div>
  );
};

export default AdminLayout;
