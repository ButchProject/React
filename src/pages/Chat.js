import React, { useEffect, useState } from "react";
import axios from 'axios';
import "../styles/Chat.css";

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
  const [data, setData] = useState([]);
  const [eventSource, setEventSource] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const ProfileIcon = `${process.env.PUBLIC_URL}/image/profileicon.png`;
  const XIcon = `${process.env.PUBLIC_URL}/image/x.png`;
  const SendIcon = `${process.env.PUBLIC_URL}/image/sendicon.png`;

//채팅방 리스트 받아오는거
  useEffect(() => {
    // Use axios instead of fetch for requests to automatically include the Authorization header.
    axios.get(`${process.env.REACT_APP_API_URL}/api/chat/list`)
      .then((response) => {
        console.log('Received chatList data:', response.data); // Add this line
        setData(response.data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  //방을 클릭했을 때, 해당 방의 메세지 가져오기
  const handleRoomClick = async (roomNum) => {
    setCurrentRoomNumber(roomNum);
    handleButtonClick(roomNum);
  
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

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          options.center = new window.kakao.maps.LatLng(latitude, longitude);
          new window.kakao.maps.Map(container, options);
        },
        (error) => {
          console.error(error);
          new window.kakao.maps.Map(container, options);
        }
      );
    } else {
      new window.kakao.maps.Map(container, options);
    }
  }, []);

  const handleButtonClick = (roomNum) => {
    setSidebarOpen(true);
    setSelectedRoom(roomNum); // 새로운 버튼을 클릭하면 선택
  };

  const handleClose = () => {
    setSidebarOpen(false);
    setSelectedRoom(null);
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

    addMessage(currentRoomNumber, messageInput, now);
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
      <div id="map" className="mapContainer">
        {/* 이곳에 맵이 표시됩니다 */}
      </div>

      <div className="chat-layout">
        <div className="search-container">
          <input
            className="search-input"
            type="text"
            placeholder="채팅방 이름을 검색하세요."
          />
          <button className="search-button">
            <img
              src={`${process.env.PUBLIC_URL}/image/searchicon.png`}
              alt="search icon"
            />
          </button>
        </div>





        <div className="chat-list">
          {data.map((item) => (
            <div key={item.roomNum}>
              <button
                className="chatting-room"
                onClick={() => handleRoomClick(item.roomNum)}
              >
                <div
                  className={`marker ${selectedRoom === item.roomNum ? "marker-selected" : ""
                    }`}
                ></div>
                <div
                  className="profile-icon"
                  style={{ backgroundImage: `url(${ProfileIcon})` }}
                ></div>
                <div className="chat-title">{item.otherUserAcademyName}</div>
              </button>
            </div>
          ))}
        </div>




      </div>

      {data.map((item) => (
        <div className={`container-fluid ${sidebarOpen ? "open" : "closed"}`}>
          <div className="row">
            <div className="col-sm-12">
              <div id="user_chat_data" className="user_chat_data">
                <div className="profile_name">
                  <div
                    className="c-profile-icon"
                    style={{ backgroundImage: `url(${ProfileIcon})` }}
                  ></div>
                  <div className="c-title">{item.otherUserAcademy}</div>
                  <button
                    className="close-button"
                    onClick={handleClose}
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

    </div>
  );
};

export default Chat;
