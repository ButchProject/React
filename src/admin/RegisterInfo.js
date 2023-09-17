import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminLayout from './AdminLayout';
import './adminStyles/RegisterInfo.css';

const API_URL = "http://localhost:8080"; // 백엔드 서버가 실행되는 IP와 포트


const RegisterInfo = () => {
  const [memberList, setMemberList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const token = window.localStorage.getItem('token');
        
        if (!token) {
          throw new Error("No token found");
        }

        const config = { 
          headers: { 
            'Authorization': `Bearer ${token}`
          }
        };

        const response = await axios.get(`${API_URL}/admin/RegisterInfo`, config);
        setMemberList(response.data);
      } catch (error) {
        console.error('Error fetching member data:', error);
        
        // If there's an error (like no valid token), redirect to login page
        navigate("/");
      }
    };
    fetchMemberData();
  }, []);

  const handleViewMember = async (id) => {
    try {
      const response = await fetch(`${API_URL}/admin/registerInfo/${id}`);
      const data = await response.json();
      if (response.ok) {
        // 이 부분에 조회한 회원정보를 보여줄 컴포넌트나 모달 창을 연결하세요.
        console.log('회원 정보:', data); // 일단 콘솔창에 표시합니다.
      } else {
        console.error('회원 정보 조회 실패>');
      }
    } catch (error) {
      console.error('Error fetching member data>');
    }
  };

  const handleDeleteMember = async (id) => {
    try {
      const response = await fetch(`${API_URL}/admin/registerInfo/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // 삭제 성공 시 목록에서 제거
        setMemberList(memberList.filter((member) => member.id !== id));
      } else {
        // 삭제 실패 메시지 출력
        console.error('회원 정보 삭제 실패>');
      }
    } catch (error) {
      console.error('Error deleting member data>');
    }
  };

  return (
    <AdminLayout>
      <h1>회원가입 목록</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>비밀번호</th>
            <th>이메일</th>
            <th>회원 이름</th>
            <th>학원 이름</th>
            <th>전화번호</th>
            <th>상세조회</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {memberList.map((member) => (
            <tr key={member.id}>
              <td>{member.id}</td>
              <td>{member.memberPassword}</td>
              <td>{member.memberEmail}</td>
              <td>{member.memberName}</td>
              <td>{member.academyName}</td>
              <td>{member.phoneNumber}</td>
              <td>
                <button
                  onClick={() => handleViewMember(member.id)}
                  style={{ textDecoration: 'underline', color: 'blue', border: 'none', cursor: 'pointer', background: 'none' }}
                >
                  조회
                </button>
              </td>
              <td>
                <button
                  onClick={() => handleDeleteMember(member.id)}
                  style={{ textDecoration: 'underline', color: 'blue', border: 'none', cursor: 'pointer', background: 'none' }}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
};

export default RegisterInfo;
