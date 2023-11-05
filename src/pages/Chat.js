import React, { useEffect, useState } from "react";
import "../styles/Chat.css";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const ProfileIcon = `${process.env.PUBLIC_URL}/image/profileicon.png`;
  const XIcon = `${process.env.PUBLIC_URL}/image/x.png`;
  const SendIcon = `${process.env.PUBLIC_URL}/image/sendicon.png`;

  useEffect(() => {
    const eventSource = new EventSource(
      "http://localhost:8082/sender/ssar/receiver/cos"
    );
    eventSource.onmessage = (event) => {
      console.log(1, event);
      const data = JSON.parse(event.data);
      console.log(2, data);
      addMessage(data.message, data.createdAt);
    };
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

  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleButtonClick = (id) => {
    setSidebarOpen(true);
    setSelectedRoom(id); // 새로운 버튼을 클릭하면 선택
  };

  const handleClose = () => {
    setSidebarOpen(false);
    setSelectedRoom(null);
  };

  const handleSendClick = async () => {
    let date = new Date();
    let now =
      date.getHours() +
      ":" +
      date.getMinutes() +
      " | " +
      date.getMonth() +
      "/" +
      date.getDate();

    let chat = {
      sender: "ssar",
      receiver: "cos",
      message: messageInput,
    };

    let response = await fetch("http://localhost:8082/chat", {
      method: "post",
      body: JSON.stringify(chat),
      headers: {
        "Content-type": "application/json; charset=utf-8",
      },
    });

    addMessage(messageInput, now);
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

  const addMessage = (msg, time) => {
    setMessages([...messages, { msg, time, isSent: true }]);
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
          <button
            className="chatting-room"
            onClick={() => handleButtonClick(1)}
          >
            <div
              className={`marker ${
                selectedRoom === 1 ? "marker-selected" : ""
              }`}
            ></div>
            <div
              className="profile-icon"
              style={{ backgroundImage: `url(${ProfileIcon})` }}
            ></div>
            <div className="chat-title">제목</div>
            <div className="chat-academy">학원명</div>
          </button>
          <button
            className="chatting-room"
            onClick={() => handleButtonClick(2)}
          >
            <div
              className={`marker ${
                selectedRoom === 2 ? "marker-selected" : ""
              }`}
            ></div>
            <div
              className="profile-icon"
              style={{ backgroundImage: `url(${ProfileIcon})` }}
            ></div>
            <div className="chat-title">제목</div>
            <div className="chat-academy">학원명</div>
          </button>
          <button
            className="chatting-room"
            onClick={() => handleButtonClick(3)}
          >
            <div
              className={`marker ${
                selectedRoom === 3 ? "marker-selected" : ""
              }`}
            ></div>
            <div
              className="profile-icon"
              style={{ backgroundImage: `url(${ProfileIcon})` }}
            ></div>
            <div className="chat-title">제목</div>
            <div className="chat-academy">학원명</div>
          </button>
        </div>
      </div>
      <div className={`container-fluid ${sidebarOpen ? "open" : "closed"}`}>
        <div className="row">
          <div className="col-sm-12">
            <div id="user_chat_data" className="user_chat_data">
              <div className="profile_name">
                <div
                  className="c-profile-icon"
                  style={{ backgroundImage: `url(${ProfileIcon})` }}
                ></div>
                <div className="c-title">제목</div>
                <div className="c-academy">학원명</div>
                <button
                  className="close-button"
                  onClick={handleClose}
                  style={{ backgroundImage: `url(${XIcon})` }}
                ></button>
              </div>
              <div class="chat_container">
                <div className="chat_container chat_section" id="chat-box">
                  {messages.map((message, i) => (
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
                        <span class="time_date">{message.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div class="type_msg">
                  <div class="input_msg_write">
                    <input
                      id="chat-outgoing-msg"
                      type="text"
                      class="write_msg"
                      placeholder="메시지를 작성하세요."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyDown={handleKeyPress}
                    />
                    <button
                      id="chat-send"
                      class="msg_send_btn"
                      type="button"
                      style={{ backgroundImage: `url(${SendIcon})` }}
                      onClick={handleSendClick}
                    >
                      <i class="fa fa-paper-plane" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
                <div className="cmargin"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
