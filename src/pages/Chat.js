import React, { useEffect, useState } from "react";
import "../styles/Chat.css";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const ProfileIcon = `${process.env.PUBLIC_URL}/image/profileicon.png`;
  const BackIcon = `${process.env.PUBLIC_URL}/image/backicon.png`;

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
  }, []);

  function handleButtonClick() {
    setSidebarOpen(!sidebarOpen);
  }

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
          <button className="chatting-room" onClick={handleButtonClick}>
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
                      placeholder="Type a message"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyDown={handleKeyPress}
                    />
                    <button
                      id="chat-send"
                      class="msg_send_btn"
                      type="button"
                      onClick={handleSendClick}
                    >
                      <i class="fa fa-paper-plane" aria-hidden="true"></i>
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
