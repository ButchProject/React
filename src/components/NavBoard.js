import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "../styles/NavBoard.css";

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
  const [ChatSidebarOpen, setChatSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [data, setData] = useState([]);
  const [detailData, setDetailData] = useState([]);
  const [RoomData, setRoomData] = useState([]);
  const [selectedButton, setSelectedButton] = useState(null);
  const [currentRoomNumber, setCurrentRoomNumber] = useState(null); // Add this line
  const [eventSource, setEventSource] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);


  const ProfileIcon = `${process.env.PUBLIC_URL}/image/profileicon.png`;
  const XIcon = `${process.env.PUBLIC_URL}/image/x.png`;
  const SendIcon = `${process.env.PUBLIC_URL}/image/sendicon.png`;
  const minimapicon = `${process.env.PUBLIC_URL}/image/minimap.png`;
  const minimapgreenicon = `${process.env.PUBLIC_URL}/image/minimapgreen.png`;

  const handleWriteButtonClick = () => {
    navigate("/WriteBoard");
  };

  const handleMiniMapClick = (locations, boardId) => {
    setLocations(locations);
    if (selectedButton === boardId) {
      setSelectedButton(null); // 이미 선택된 버튼을 다시 클릭하면 선택 해제
    } else {
      setSelectedButton(boardId); // 새로운 버튼을 클릭하면 선택
    }
  }

  const handleOpenButtonClick = () => {
    setSidebarOpen(!sidebarOpen);
  };



  useEffect(() => {
    // Use axios instead of fetch for requests to automatically include the Authorization header.
    axios.get(`${process.env.REACT_APP_API_URL}/api/Board`)
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleCombinedClick = (boardId) => {
    const token = localStorage.getItem('token'); // Get token from local storage

    axios.get(`${process.env.REACT_APP_API_URL}/api/detailBoard/${boardId}`, {
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

  const handleChatClick = (boardWriter) => {
    setChatSidebarOpen(!ChatSidebarOpen);

    const token = localStorage.getItem('token'); // Get token from local storage

    axios.post(`${process.env.REACT_APP_API_URL}/api/chat/createRoom`, {
      user2: boardWriter //여기가 body
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

  const handleSendClick = async () => {
    if (!currentRoomNumber) return;

    let date = new Date();
    let now =
      date.getHours() +
      ":" +
      date.getMinutes() +
      " | " +
      date.getMonth() +
      "/" +
      date.getDate();

    // 현재 선택된 roomNum에 해당하는 데이터 항목을 찾습니다.
    let currentRoom = data.find(item => item.roomNum === currentRoomNumber);

    // 해당 항목에서 이메일 정보를 추출합니다.
    let myEmailFromData = currentRoom ? currentRoom.myEmail : "";
    let otherUserFromData = currentRoom ? currentRoom.otherUserEmail : "";

    let chat = {
      user1: myEmailFromData,  // 수정된 부분
      user2: otherUserFromData,  // 수정된 부분
      message: messageInput,
      roomNum: currentRoomNumber,
    };

    let postURL = `${process.env.REACT_APP_API_URL}/api/chat?roomNum=${currentRoomNumber}`;
    let response = await fetch(postURL, {
      method: "post",
      body: JSON.stringify(chat),
      headers: {
        "Content-type": "application/json; charset=utf-8",
      },
    });

    setMessageInput("");  // 메시지 입력 필드 초기화

    console.log(response);

    let parseResponse = await response.json();

    console.log(parseResponse);
  };

  const handleKeyPress = (e) => {
    console.log(e.keyCode);
    if (e.keyCode === 13) {
      handleSendClick();
    }
  };

  const addMessage = (roomNumber, msg, time) => { // Change this line
    setMessages(prevMessages => ({
      ...prevMessages,
      [roomNumber]: [...(prevMessages[roomNumber] || []), { msg, time }]
    }));
  };


  useEffect(() => {
    if (currentRoomNumber === null) {
      console.log('currentRoomNumber is null. Exiting useEffect.');
      return;
    }

    console.log(`Setting up EventSource for room number: ${currentRoomNumber}`);

    // 기존 EventSource 연결 닫기
    if (eventSource) {
      console.log('Closing existing EventSource connection.');
      eventSource.close();
    }

    const newEventSource = new EventSource(`${process.env.REACT_APP_API_URL}/api/chat/room?roomNum=${currentRoomNumber}`);
    console.log('Created new EventSource connection.');

    newEventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Received new message from EventSource:', data);
      setMessages(prevMessages => ({
        ...prevMessages,
        [currentRoomNumber]: [...(prevMessages[currentRoomNumber] || []), data]
      }));
    };

    newEventSource.onerror = (error) => {
      console.error('EventSource failed:', error);
      newEventSource.close();
    };

    setEventSource(newEventSource); // 새 EventSource 인스턴스를 상태에 저장
    console.log('Saved new EventSource instance to state.');

    return () => {
      console.log('useEffect cleanup. Closing EventSource connection.');
      if (newEventSource) {
        newEventSource.close(); // 컴포넌트 언마운트나 roomNumber 변경시 EventSource 종료
      }
    };
  }, [currentRoomNumber]);


  const handleClose = () => {
    setSidebarOpen(false);
    setSelectedRoom(null);
  };

  return (
    <div>
      <div className="sidebar">
        <div className="search-container">
          <input
            className="search-input"
            type="text"
            placeholder="원하는 게시글을 찾아보세요."
          />
          <button className="search-button">
            <img
              src={`${process.env.PUBLIC_URL}/image/searchicon.png`}
              alt="search icon"
            />
          </button>
        </div>
        <div className="container">
          <div className="region-container">
            <div className="province">경기도</div>
            <div className="city">수원시</div>
            <div className="district">영통구</div>
          </div>
          <button className="write-button" onClick={handleWriteButtonClick}>
            <img
              className="pencil"
              src={`${process.env.PUBLIC_URL}/image/pencil.png`}
              alt="pencil icon"
            />
            게시글 작성
          </button>
        </div>

        <div className="list-container">

          {data.map((item, index) => (
            <div key={index}>
              <div className="list">
                <button className="llist" onClick={() => handleCombinedClick(item.boardDTO.boardId)}>
                  <div className="left">
                    <div className="lregion">{item.boardDTO.boardCity}</div>
                    <div className="ltitle">{item.boardDTO.boardTitle}</div>
                  </div>
                  <div className="right">
                    <div className="current">{item.boardDTO.boardCurrentStudents}</div>
                    <img
                      className="person"
                      src={`${process.env.PUBLIC_URL}/image/personicon.png`}
                      alt="person"
                    ></img>
                  </div>
                </button>
                <button className="minimap"
                  style={{
                    backgroundImage: `url(${selectedButton === item.boardDTO.boardId ? minimapgreenicon : minimapicon
                      })`,
                  }}
                  onClick={() => handleMiniMapClick(item.nodeDTOList.map(node => ({ latitude: node.latitude, longitude: node.longitude })), item.boardDTO.boardId)}>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>


      <div className={`detail-sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="detail-top">
          <button
            className="detail-closebutton"
            onClick={handleOpenButtonClick}
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/image/backicon.png)`,
            }}
          ></button>
          <h4>게시글 정보</h4>
        </div>
        {detailData.map((item, index) => (
          <div key={index}>
            <div className="dtitle-container">
              <div className="dtitle">{item.boardDTO.boardTitle}</div>
              <div className="dacademy">학원명(고쳐야함)</div>
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
              <div className="c1">
                <div className="c2"></div>
                {item.nodeDTOList.map((node, nodeIndex) => (
                  <div key={nodeIndex}>
                    <div className="c3">
                      <div className="circle"></div>
                      <div className="ctime">
                        <div className="chour">{node.nodeHour}</div>
                        <div className="divide">:</div>
                        <div className="cmin">{node.nodeMinute}</div>
                      </div>
                      <div className="cplace">{node.nodeName}({node.nodeDetail})</div>
                    </div>
                  </div>)
                )}
              </div>
            </div>

            <div className="number-container">
              <div className="numberguide-container">
                <h4 className="number-guide">현재 학생 수</h4>
                <div className="num">
                  <h4 className="number">{item.boardDTO.boardCurrentStudents}</h4>
                  <h4 className="aud">명</h4>
                </div>
              </div>
              <div className="bus-container">
                <div className="ybox">
                  <h5 className="ybus-guide">12인승 버스</h5>
                  <h1 className="ybusnum">{item.boardDTO.boardBus12}</h1>
                  <img
                    className="bus"
                    src={`${process.env.PUBLIC_URL}/image/bus-y2.png`}
                    alt="ybus"
                  />
                </div>
                <div className="gbox">
                  <h5 className="gbus-guide">25인승 버스</h5>
                  <h1 className="gbusnum">{item.boardDTO.boardBus25}</h1>
                  <img
                    className="bus"
                    src={`${process.env.PUBLIC_URL}/image/bus-g2.png`}
                    alt="ybus"
                  />
                </div>
                <div className="bbox">
                  <h5 className="bbus-guide">45인승 버스</h5>
                  <h1 className="bbusnum">{item.boardDTO.boardBus45}</h1>
                  <img
                    className="bus"
                    src={`${process.env.PUBLIC_URL}/image/bus-b2.png`}
                    alt="ybus"
                  />
                </div>
              </div>
            </div>

            <div className="dmemo-container">
              <div className="memo-context">{item.boardDTO.boardDetail}</div>
            </div>

            <div className="price-container">
              <div className="total-container">
                <h4 className="total-guide">총 버스 총합 금액</h4>
                <div className="tprice">
                  <h4 className="total-money">{item.boardDTO.boardBusSumMoney}</h4>
                  <h4 className="total-won">원</h4>
                </div>
              </div>
              <div className="one-container">
                <h4 className="one-guide">1인 버스 대여 금액</h4>
                <div className="oprice">
                  <h4 className="one-money">{item.boardDTO.boardSoloMoney}</h4>
                  <h4 className="one-won">원</h4>
                </div>
              </div>
            </div>

            <div className="pay-container">
              <h5 className="pay-guide">부담해야할 금액</h5>
              <h2 className="pay-price">{item.boardDTO.boardBusSaleMoney}</h2>
              <h2 className="pay-won">원</h2>
            </div>

            <button
              className="dchat-button"
              onClick={() => handleChatClick(item.boardDTO.boardWriter)} // boardUserEmail should be provided in your API response.
            >
              <img
                className="chaticon"
                src={`${process.env.PUBLIC_URL}/image/chat2.png`}
                alt="chaticon"
              />
              채팅하기
            </button>
            <button className="dsign-button">신청하기</button>
          </div>
        ))}
      </div >
      

      {data.map((item) => (
        <div className={`chat-sidebar ${ChatSidebarOpen ? "open" : "closed"}`}>

          <div className="row">
            <div className="col-sm-12">
              <div id="user_chat_data" className="user_chat_data">
                <div className="profile_name">
                  <div
                    className="c-profile-icon"
                    style={{ backgroundImage: `url(${ProfileIcon})` }}
                  ></div>
                  <div className="c-title">영통역 근처 구해요</div>
                  <div className="c-academy">버치학원</div>
                  <button
                    className="close-button"
                    onClick={setChatSidebarOpen}
                    style={{ backgroundImage: `url(${XIcon})` }}
                  ></button>
                </div>
                <div className="chat_container">
                <div className="chat_container chat_section" id="chat-box">
                  {messages[currentRoomNumber] && messages[currentRoomNumber].map((message, i) => (
                    <div
                      key={i}
                      className={
                        message.isSent ? "outgoing_msg" : "incoming_msg"
                      }
                    >
                      <div
                        className={
                          message.isSent ? "sent_msg" : "received_withd_msg"
                        }
                      >
                        <p>{message.msg}</p>
                        <span className="time_date">{message.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="type_msg">
                  <div className="input_msg_write">
                    <input
                      id="chat-outgoing-msg"
                      type="text"
                      className="write_msg"
                      placeholder="메시지를 작성하세요."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyDown={(e) => e.keyCode === 13 && handleSendClick()} 
                    />
                    <button
                      id="chat-send"
                      className="msg_send_btn"
                      type="button"
                      style={{ backgroundImage: `url(${SendIcon})` }}
                      onClick={handleSendClick}
                      >
                      <i className="fa fa-paper-plane" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
                <div className="cmargin"></div>
              </div>
              </div>
            </div>
          </div>
        </div>
      ))}


    </div >
  );
};

export default NavBoard;