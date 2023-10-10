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

  const [eventSource, setEventSource] = useState(null);
  const handleButtonClick = () => {
    setSidebarOpen((prevState) => !prevState);
  };
  const handleRoomClick = (roomNum) => {
    setCurrentRoomNumber(roomNum);
    handleButtonClick();
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
                      className={message.user1 === "song@gmail.com" ? "outgoing_msg" : "incoming_msg"}
                    >
                      <div className={message.user1 === "song@gmail.com" ? "sent_msg" : "received_withd_msg"}>
                        <p>{message.message}</p>
                        <span className="time_date">{message.createdAt}</span>
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
