import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
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
        <h1>asdf</h1>
        <h1>{profileData.memberName}</h1>
        <p>Email: {profileData.memberEmail}</p>
        <p>Password: {profileData.memberPassword}</p> {/* 보안상의 이유로 비밀번호는 보통 표시하지 않습니다 */}
        <p>Phone Number: {profileData.phoneNumber}</p>
        <p>Academy Name: {profileData.academyName}</p>
        <button onClick={editProfile}>Edit Profile</button>
   </div>
  );
};

export default Profile;
