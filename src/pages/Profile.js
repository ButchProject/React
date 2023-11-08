import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "../styles/Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const editProfile = () => {
    navigate('/profile/edit');
  };
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found');
      return;
    }

    axios.get(`${process.env.REACT_APP_API_URL}/api/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setProfileData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  if (!profileData) return <div>Loading...</div>;

  return (
    <div>
      <img
        className="bigprofile"
        src={`${process.env.PUBLIC_URL}/image/bigprofile.png`}
        alt="bp"
      />
      <h4 className="pguide">이름</h4>
      <p className="puser">{profileData.memberName}</p>
      <h4 className="pguide">이메일</h4>
      <p className="puser">{profileData.memberEmail}</p>
      <h4 className="pguide">비밀번호</h4>
      <p className="puser">{profileData.memberPassword}</p>
      <h4 className="pguide">전화번호</h4>//
      <p className="puser">{profileData.phoneNumber}</p>
      <h4 className="pguide">학원이름</h4>
      <p className="puser">{profileData.academyName}</p>
      <button className="editbutton" onClick={editProfile}>Edit Profile</button>
    </div>
  );
};

export default Profile;
