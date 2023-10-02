import React, { useEffect, useState } from "react";
import "../styles/Chat.css";
import axios from 'axios';

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

const Chat = () => {
  const [messages, setMessages] = useState({}); // Change this line
  const [currentRoomNumber, setCurrentRoomNumber] = useState(null); // Add this line

  const [messageInput, setMessageInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const ProfileIcon = `${process.env.PUBLIC_URL}/image/profileicon.png`;
  const BackIcon = `${process.env.PUBLIC_URL}/image/backicon.png`;


  const [data, setData] = useState([]);
  useEffect(() => {
    // Use axios instead of fetch for requests to automatically include the Authorization header.
    axios.get(`${process.env.REACT_APP_API_URL}/api/chat/list`)
      .then((response) => {
        console.log('Received chatList data:', response.data); // Add this line
        setData(response.data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleRoomClick = async (roomNum) => {
    setCurrentRoomNumber(roomNum);
    handleButtonClick();
  
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/chat/room`, {
        params: {
          roomNum: roomNum
        }
      });
      // 기존의 메시지를 상태에 설정합니다.
      setMessages(prevMessages => ({
        ...prevMessages,
        [roomNum]: response.data
      }));
  
    } catch (error) {
      console.error('데이터 가져오기 오류:', error);
    }
  };
  
  useEffect(() => {
    if (currentRoomNumber === null) return;
  
    const eventSource = new EventSource(
      `${process.env.REACT_APP_API_URL}/api/chat/room`
    );
  
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // 실시간으로 수신된 메시지를 상태에 추가합니다.
      addMessage(currentRoomNumber, data.message, data.createdAt);
    };
  
    return () => {
      eventSource.close(); // 방을 바꿀 때 EventSource를 종료합니다.
    };
  
  }, [currentRoomNumber]);
  
  function handleButtonClick() {
    setSidebarOpen(!sidebarOpen);
  }

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
    let myEmailFromData = currentRoom ? currentRoom.myEmail : "ssar";
    let otherUserFromData = currentRoom ? currentRoom.otherUserEmail : "";

    let chat = {
      user1: myEmailFromData,  // 수정된 부분
      user2: otherUserFromData,  // 수정된 부분
      message: messageInput,
      roomNum: currentRoomNumber, //여기
    };

    let response = await fetch(`${process.env.REACT_APP_API_URL}/api/chat`, {
      method: "post",
      body: JSON.stringify(chat),
      headers: {
        "Content-type": "application/json; charset=utf-8",
      },
    });

    addMessage(currentRoomNumber, messageInput, now);
    setMessageInput("");

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

  return (
    <div className="layout">
      <div className="chat-layout">
        <div className="search-container">
          <input
            className="search-input"
            type="text"
            placeholder="검색어를 입력하세요"
          />
          <button className="search-button">검색</button>
        </div>





        <div className="chat-list">
    {data.map((item) => (
        <div key={item.roomNum}>
            <button 
                className="chatting-room" 
                onClick={() => handleRoomClick(item.roomNum)}>
                <div
                    className="profile-icon"
                    style={{ backgroundImage: `url(${ProfileIcon})` }}
                ></div>
                <div className="chat-title">{item.otherUserEmail}</div>
                <div className="chat-academy">학원명</div>
            </button>
        </div>
    ))}
</div>




      </div>
      <div className={`container-fluid ${sidebarOpen ? "open" : "closed"}`}>
        <div className="row">
          <div className="col-sm-12">
            <div id="user_chat_data" className="user_chat_data">
              <div className="profile_name">
                <button
                  className="close-button"
                  onClick={handleButtonClick}
                  style={{ backgroundImage: `url(${BackIcon})` }}
                ></button>
                <div
                  className="c-profile-icon"
                  style={{ backgroundImage: `url(${ProfileIcon})` }}
                ></div>
                <div className="c-title">제목</div>
                <div className="c-academy">학원명</div>
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
                      placeholder="Type a message"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyDown={(e) => e.keyCode === 13 && handleSendClick()} 
                    />
                    <button
                      id="chat-send"
                      className="msg_send_btn"
                      type="button"
                      onClick={handleSendClick}
                      >
                      <i className="fa fa-paper-plane" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
