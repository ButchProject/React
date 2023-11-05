import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/NavBoard.css";
import axios from "axios";

// Add this code to set up the interceptor
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const NavBoard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [ChatSidebarOpen, setChatSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  const ProfileIcon = `${process.env.PUBLIC_URL}/image/profileicon.png`;
  const XIcon = `${process.env.PUBLIC_URL}/image/x.png`;
  const SendIcon = `${process.env.PUBLIC_URL}/image/sendicon.png`;
  const minimapicon = `${process.env.PUBLIC_URL}/image/minimap.png`;
  const minimapgreenicon = `${process.env.PUBLIC_URL}/image/minimapgreen.png`;

  const handleWriteButtonClick = () => {
    navigate("/writeboard");
  };

  const handleOpenButtonClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  function handleChatButtonClick() {
    setChatSidebarOpen(!ChatSidebarOpen);
  }

  const [data, setData] = useState([]);
  const [detailData, setDetailData] = useState([]);

  useEffect(() => {
    // Use axios instead of fetch for requests to automatically include the Authorization header.
    axios
      .get("http://localhost:8080/api/Board")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleCombinedClick = (boardId) => {
    const token = localStorage.getItem("token"); // Get token from local storage

    axios
      .get(`http://localhost:8080/api/detailBoard/${boardId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to request header
        },
      })
      .then((response) => {
        console.log("Received data:", response.data);
        setDetailData([response.data]);
      })
      .catch((error) => console.error("Error:", error));

    setSidebarOpen(!sidebarOpen);
  };

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

  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (id) => {
    if (selectedButton === id) {
      setSelectedButton(null); // 이미 선택된 버튼을 다시 클릭하면 선택 해제
    } else {
      setSelectedButton(id); // 새로운 버튼을 클릭하면 선택
    }
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
          <div className="list" onClick={() => setSidebarOpen(true)}>
            <button className="llist">
              <div className="left">
                <div className="lregion">지역</div>
                <div className="ltitle">제목1</div>
              </div>
              <div className="right">
                <div className="current">00</div>
                <img
                  className="person"
                  src={`${process.env.PUBLIC_URL}/image/personicon.png`}
                  alt="person"
                ></img>
              </div>
            </button>
            <button
              className="minimap"
              style={{
                backgroundImage: `url(${
                  selectedButton === 1 ? minimapgreenicon : minimapicon
                })`,
              }}
              onClick={() => handleButtonClick(1)}
            ></button>
          </div>

          <div className="list" onClick={() => setSidebarOpen(true)}>
            <button className="llist">
              <div className="left">
                <div className="lregion">지역</div>
                <div className="ltitle">제목1</div>
              </div>
              <div className="right">
                <div className="current">00</div>
                <img
                  className="person"
                  src={`${process.env.PUBLIC_URL}/image/personicon.png`}
                  alt="person"
                ></img>
              </div>
            </button>
            <button
              className="minimap"
              style={{
                backgroundImage: `url(${
                  selectedButton === 2 ? minimapgreenicon : minimapicon
                })`,
              }}
              onClick={() => handleButtonClick(2)}
            ></button>
          </div>

          <div className="list" onClick={() => setSidebarOpen(true)}>
            <button className="llist">
              <div className="left">
                <div className="lregion">지역</div>
                <div className="ltitle">제목1</div>
              </div>
              <div className="right">
                <div className="current">00</div>
                <img
                  className="person"
                  src={`${process.env.PUBLIC_URL}/image/personicon.png`}
                  alt="person"
                ></img>
              </div>
            </button>
            <button
              className="minimap"
              style={{
                backgroundImage: `url(${
                  selectedButton === 3 ? minimapgreenicon : minimapicon
                })`,
              }}
              onClick={() => handleButtonClick(3)}
            ></button>
          </div>

          {data.map((item, index) => (
            <div key={index}>
              <div className="list">
                <button
                  className="llist"
                  onClick={() => handleCombinedClick(item.boardDTO.boardId)}
                >
                  <div className="left">
                    <div className="lregion">운행지역</div>
                    <div className="ltitle">{item.boardDTO.boardTitle}</div>
                  </div>
                  <div className="right">
                    <div className="current">25/50</div>
                  </div>
                </button>
                <button
                  className="minimap"
                  style={{ backgroundImage: `url(${minimapicon})` }}
                ></button>
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
        <div className="dtitle-container">
          <div className="dtitle">제목</div>
          <div className="dacademy">학원명</div>
        </div>
        <div className="dregion-container">
          <h4 className="dregion-guide">운행지역</h4>
          <div className="dregion">
            <div className="dprovince">경기도</div>
            <div className="dcity">수원시</div>
            <div className="ddistrict">영통구</div>
          </div>
        </div>
        <div className="dcourse-container">
          <h4 className="dcourse-guide">정류장 운영시간표</h4>
          <div className="c1">
            <div className="c2"></div>
            <div className="c3">
              <div className="circle"></div>
              <div className="ctime">
                <div className="chour">22</div>
                <div className="divide">:</div>
                <div className="cmin">00</div>
              </div>
              <div className="cplace">asdfasdf</div>
            </div>
            <div className="c3">
              <div className="circle"></div>
              <div className="ctime">
                <div className="chour">22</div>
                <div className="divide">:</div>
                <div className="cmin">00</div>
              </div>
              <div className="cplace">asdfasdf</div>
            </div>
            <div className="c3">
              <div className="circle"></div>
              <div className="ctime">
                <div className="chour">22</div>
                <div className="divide">:</div>
                <div className="cmin">00</div>
              </div>
              <div className="cplace">asdfasdf</div>
            </div>
            <div className="c3">
              <div className="circle"></div>
              <div className="ctime">
                <div className="chour">22</div>
                <div className="divide">:</div>
                <div className="cmin">00</div>
              </div>
              <div className="cplace">asdfasdf</div>
            </div>
          </div>
        </div>
        <div className="number-container">
          <div className="numberguide-container">
            <h4 className="number-guide">현재 학생 수</h4>
            <div className="num">
              <h4 className="number">00</h4>
              <h4 className="aud">명</h4>
            </div>
          </div>
          <div className="bus-container">
            <div className="ybox">
              <h5 className="ybus-guide">12인승 버스</h5>
              <h1 className="ybusnum">0</h1>
              <img
                className="bus"
                src={`${process.env.PUBLIC_URL}/image/bus-y2.png`}
                alt="ybus"
              />
            </div>
            <div className="gbox">
              <h5 className="gbus-guide">25인승 버스</h5>
              <h1 className="gbusnum">0</h1>
              <img
                className="bus"
                src={`${process.env.PUBLIC_URL}/image/bus-g2.png`}
                alt="ybus"
              />
            </div>
            <div className="bbox">
              <h5 className="bbus-guide">45인승 버스</h5>
              <h1 className="bbusnum">0</h1>
              <img
                className="bus"
                src={`${process.env.PUBLIC_URL}/image/bus-b2.png`}
                alt="ybus"
              />
            </div>
          </div>
        </div>
        <div className="dmemo-container">
          <div className="memo-context">
            메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모
          </div>
        </div>
        <div className="price-container">
          <div className="total-container">
            <h4 className="total-guide">총 버스 총합 금액</h4>
            <div className="tprice">
              <h4 className="total-money">0000</h4>
              <h4 className="total-won">원</h4>
            </div>
          </div>
          <div className="one-container">
            <h4 className="one-guide">1인 버스 대여 금액</h4>
            <div className="oprice">
              <h4 className="one-money">0000</h4>
              <h4 className="one-won">원</h4>
            </div>
          </div>
        </div>
        <div className="pay-container">
          <h5 className="pay-guide">부담해야할 금액</h5>
          <h2 className="pay-price">0000</h2>
          <h2 className="pay-won">원</h2>
        </div>
        <button className="dchat-button" onClick={handleChatButtonClick}>
          <img
            className="chaticon"
            src={`${process.env.PUBLIC_URL}/image/chat2.png`}
            alt="ybus"
          />
          채팅하기
        </button>
      </div>

      <div className={`chat-sidebar ${ChatSidebarOpen ? "open" : "closed"}`}>
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
                  onClick={handleChatButtonClick}
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
                      placeholder="메세지를 작성하세요."
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

export default NavBoard;
