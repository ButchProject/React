import { Route, Routes } from 'react-router-dom';
import './adminStyles/SideBar.css';
import RegisterInfo from './RegisterInfo';
import LoginLog from './LoginLog';
import SideBar from './SideBar'; 

const Main = () => {
  return (
      <div style={{ display: 'flex' }}>
        <SideBar />
        <div style={{ flex: '1' }}>
          <Routes>
            <Route path="/admin/page1" component={RegisterInfo} />
            <Route path="/admin/LoginLog" component={LoginLog} />
          </Routes>
        </div>
      </div>
  );
};

export default Main;