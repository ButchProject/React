
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/NavBoard.css";
import axios from 'axios';

// Add this code to set up the interceptor
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) { // If the token is expired or invalid
      localStorage.removeItem('token'); // Remove the expired or invalid token
      window.location = "/"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);


function NavBoard({ setLocations }) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const minimapicon = `${process.env.PUBLIC_URL}/image/minimap.png`;

  const handleMiniMapClick = (locations) => {
    setLocations(locations);
  }

  const handleWriteButtonClick = () => {
    navigate("/WriteBoard");
  };


  const [data, setData] = useState([]);
  const [detailData, setDetailData] = useState([]);


  useEffect(() => {
    // Use axios instead of fetch for requests to automatically include the Authorization header.
    axios.get("http://localhost:8080/api/Board")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleCombinedClick = (boardId) => {
    const token = localStorage.getItem('token'); // Get token from local storage

    axios.get(`http://localhost:8080/api/detailBoard/${boardId}`, {
      headers: {
        'Authorization': `Bearer ${token}` // Add token to request header
      }
    })
      .then(response => {
        console.log('Received data:', response.data);
        setDetailData([response.data]);
      })
      .catch((error) => console.error('Error:', error));

    setSidebarOpen(!sidebarOpen);
  };


  const [RoomData, setRoomData] = useState([]);

  const handleChatClick = (boardWriter) => {
    const token = localStorage.getItem('token'); // Get token from local storage

    axios.post('http://localhost:8080/api/chat/createRoom', {
      user2:boardWriter //여기가 body
      }, {
      headers: {
        'Authorization': `Bearer ${token}` // Add token to request header
      }
    })
      .then(response => {
        console.log('Received data:', response.data);
        setRoomData([response.data]);
      })
      .catch((error) => console.error('Error:', error));
  };



  const handleOpenButtonClick = () => {
    setSidebarOpen(!sidebarOpen);
  }


  return (
    <div>
      <div className="sidebar">
        <div className="search-container">
          <input
            className="search-input"
            type="text"
            placeholder="검색어를 입력하세요"
          />
          <button className="search-button">검색</button>
        </div>
        <div className="container">
          <div className="region-container">
            <div className="province">경기도</div>
            <div className="city">수원시</div>
            <div className="district">영통구</div>
          </div>
          <button className="write-button" onClick={handleWriteButtonClick}>
            게시글 작성
          </button>
        </div>
        <div className="list-container">


          {data.map((item, index) => (
            <div key={index}>


              <div className="list">
                <button className="llist" onClick={() => handleCombinedClick(item.boardDTO.boardId)}>
                  <div className="left">
                    <div className="lregion">운행지역</div>
                    <div className="ltitle">{item.boardDTO.boardTitle}</div>
                  </div>
                  <div className="right">
                    <div className="current">25/50</div>
                  </div>
                </button>
                <button className="minimap" style={{ backgroundImage: `url(${minimapicon})` }} onClick={() => handleMiniMapClick(item.nodeDTOList.map(node => ({ latitude: node.latitude, longitude: node.longitude })))}></button>
              </div>
            </div>
          ))}
        </div>
      </div>


      <div className={`detail-sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <button className="detail-closebutton" onClick={handleOpenButtonClick}>
          x
        </button>
        {detailData.map((item, index) => (
          <div key={index}>
            <div className="dtitle-container">
              <div className="dtitle">{item.boardDTO.boardTitle}</div>
              <div className="dacademy">학원명</div>
            </div>
            <div className="dregion-container">
              <h4 className="dregion-guide">운행지역</h4>
              <div className="dregion">
                <div className="dprovince">{item.boardDTO.boardState}</div>
                <div className="dcity">{item.boardDTO.boardCity}</div>
                <div className="ddistrict">{item.boardDTO.boardWhere}</div>
              </div>
            </div>
            <div className="dcourse-container">
              <h4 className="dcourse-guide">정류장 운영시간표</h4>
            </div>
            {/* node list */}
            {
              item.nodeDTOList.map((node, nodeIndex) => (
                <div key={nodeIndex}>
                  <h3>{node.nodeName} ({node.nodeHour}:{node.nodeMinute})</h3>
                  <h3>{node.latitude}</h3>
                  <h3>{node.longitude}</h3>
                </div>)
              )
            }
            <div className="dmemo">{item.boardDTO.boardDetail}</div>
            <div className="before-container">
              <h4 className="before-guide">기존금액</h4>
              <div className="bprice">
                <div className="before-money">0000</div>
                <h4 className="before-won">원</h4>
              </div>
            </div>
            <div className="discount-container">
              <h4 className="discount-guide">할인금액</h4>
              <div className="dprice">
                <h4 className="minus">-</h4>
                <div className="discount-money">0000</div>
                <h4 className="discount-won">원</h4>
              </div>
            </div>
            <div className="total-container">
              <div className="total-guide">총 금액</div>
              <div className="total-price">0000</div>
              <div className="total-won">원</div>
            </div>
            <button
              className="chat-button"
              onClick={() => handleChatClick(item.boardDTO.boardWriter)} // boardUserEmail should be provided in your API response.
            >
              chat
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default NavBoard;

