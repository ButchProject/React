import React, { useState } from "react";
import { writingBoard } from "../apiServices/Auth";
import SelectBox from "./Selectbox";
import "../styles/NavWriteBoard.css";

function NavWriteBoard({ map, setSearchRoute, setShouldDrawPolyline }) {
  const [waypoints, setWaypoints] = useState([{ name: "", time: "", time2: "", detailedLocation: "" }]);
  const [searchResults, setSearchResults] = useState({ waypoints: [] });
  const [selectedRoutesBuffer, setSelectedRoutesBuffer] = useState([]);

  function handleSearch(keyword, type, index = -1) {
    if (keyword.trim() === "") {
      setSearchResults((prev) => ({ ...prev, [type]: [] }));
      return;
    }

    const placesInstance = new window.kakao.maps.services.Places();
    placesInstance.keywordSearch(keyword, (data, _, ___) => {
      if (!Array.isArray(data)) {
        setSearchResults((prev) => ({ ...prev, [type]: [] }));
      } else {
        const formattedData = data.map((result) => ({
          id: result.id,
          place_name: result.place_name,
          x: result.x, // 경도 정보 추가
          y: result.y, // 위도 정보 추가
        }));

        setSearchResults((prev) => ({ ...prev, [type]: index === -1 ? formattedData : { ...prev[type], [index]: formattedData } }));

      }
    });
  }
  const [selectedProvince, setSelectedProvince] = useState(null); // kdh
  const [selectedCity, setSelectedCity] = useState(null); // kdh
  const [selectedDistrict, setSelectedDistrict] = useState(null); // kdh
  const [markers, setMarkers] = useState({ waypoints: [] });
  const [selectedRoutes, setSelectedRoutes] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState({ waypoints: [] });
  const [title, setTitle] = useState(""); //kdh
  const [content, setContent] = useState(""); //kdh

  function handleClick(value, setValue, type, index = -1, x, y) {
    setValue(value);
    setSearchResults((prev) => ({ ...prev, [type]: index === -1 ? [] : { ...prev[type], [index]: [] } }));

    if (!map) return;

    const marker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(y, x),
    });

    if (markers[type]) {
      if (index === -1) {
        markers[type].setMap(null);
      } else {
        markers[type][index]?.setMap(null);
      }
    }

    marker.setMap(map);

    index === -1
      ? setMarkers((prev) => ({ ...prev, [type]: marker }))
      : setMarkers((prev) => ({
        ...prev,
        [type]: [...(prev[type] || []), marker],
      }));

    // 선택된 위치 상태 업데이트
    if (index === -1) {
      setSelectedLocations((prev) => ({ ...prev, [type]: { name: value, x, y } }));
    } else {
      const newWaypoints = selectedLocations.waypoints.slice();
      newWaypoints[index] = { name: value, x, y };
      setSelectedLocations((prev) => ({
        ...prev,
        waypoints: newWaypoints,
      }));
    }
    // 자동으로 처리되게끔 수정
    setSelectedRoutesBuffer((prev) => {
      const updatedRoutes = [...prev];
      updatedRoutes[index] = { name: value, x, y };
      return updatedRoutes;
    });
  }

  const handleSaveRoutes = async () => {
    try {
      // Using selectedRoutesBuffer instead of temporarySelectedRoutes
      const filteredRoutes = selectedRoutesBuffer.filter((route) => route !== null && route.name !== "");

      const extractedData = filteredRoutes.map((route, idx) => ({
        nodeNum: idx + 1,
        nodeName: route.name,
        latitude: route.y,
        longitude: route.x,
        hour: waypoints[idx]?.time || "",
        minute: waypoints[idx]?.time2 || "",
      }));

      // Define the detailedLocation variable with appropriate value
      const detailedLocation = waypoints.map(data => data.detailedLocation); // Collect detailedLocation values


      const nodeInfo = extractedData.map((data, index) => ({
        nodeNum: data.nodeNum, //정류장 번호
        nodeName: data.nodeName, //정류장 이름
        latitude: data.latitude, //위도
        longitude: data.longitude, //경도
        nodeHour: data.hour, //시간
        nodeMinute: data.minute, //분
        nodeDetail: detailedLocation[index], //세부지역
      }));

      const pppost = {
        boardTitle: title, //게시글 제목
        boardState: selectedProvince, //도
        boardCity: selectedCity, //시
        boardWhere: selectedDistrict, //구
        boardDetail: content //내용
      };

      const finalDataToSend = {
        boardDTO: pppost,
        nodeDTOList: nodeInfo
      };


      // Sending data to backend using writingBoard function
      const response = await writingBoard(finalDataToSend);

      if (response) {
        // Successful response from backend
      } else {
        // Handle failed response
      }
    } catch (error) {
      // Handle error
    }
  };

  const removeWaypoint = (index) => {
    const newWaypoints = [...waypoints]; // Create a copy of waypoints
    newWaypoints.splice(index, 1); // Remove the waypoint at the specified index
    setWaypoints(newWaypoints);

    // 선택된 위치 상태 업데이트
    const newSelectedWaypoints = selectedLocations.waypoints.filter((_, idx) => idx !== index);
    setSelectedLocations((prev) => ({
      ...prev,
      waypoints: newSelectedWaypoints,
    }));


    // 선택된 경로 상태 업데이트
    const newSelectedRoutes = newSelectedWaypoints.map((route, idx) => ({
      name: `#${idx + 1}: ${route.name}`,
      x: route.x,
      y: route.y,
    }));
    setSelectedRoutes(newSelectedRoutes);

    // 마커 상태 업데이트
    if (markers.waypoints[index]) {
      markers.waypoints[index].setMap(null);
      const newMarkers = markers.waypoints.filter((_, idx) => idx !== index);
      setMarkers((prev) => ({
        ...prev,
        waypoints: newMarkers,
      }));
    }
  };



  const addWaypoint = () => {
    setWaypoints((prev) => [...prev, { name: "", time: "", time2: "", detailedLocation: "" }]);
  };

  const updateWaypointName = (value, index) => {
    setWaypoints((prev) =>
      prev.map((waypoint, i) => (i === index ? { ...waypoint, name: value } : waypoint))
    );
  };

  const updateWaypointTime = (value, index) => {
    setWaypoints((prev) =>
      prev.map((waypoint, i) => (i === index ? { ...waypoint, time: value } : waypoint))
    );
  };

  const updateWaypointTime2 = (value, index) => {
    setWaypoints((prev) =>
      prev.map((waypoint, i) => (i === index ? { ...waypoint, time2: value } : waypoint))
    );
  };
  const updateWaypointDetailedLocation = (value, index) => {
    setWaypoints((prev) =>
      prev.map((waypoint, i) => (i === index ? { ...waypoint, detailedLocation: value } : waypoint))
    );
  };

  return (
    <div className="sidebar">
      <input
        className="title-input"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 입력해주세요"
        required
      />
      <h4 className="region-guide">운행지역</h4>
      <SelectBox
        setSelectedProvince={setSelectedProvince}
        setSelectedCity={setSelectedCity}
        setSelectedDistrict={setSelectedDistrict}
      />

      <div className="course-container">
        <h4 className="course-guide">정류장 운행 시간표</h4>
        {waypoints.map((waypoint, index) => (
          <div key={`waypoint-${index}`}>

            <select // kdh
              className="hour"
              type="text"
              value={waypoint.time}
              onChange={(event) =>
                updateWaypointTime(event.target.value, index)
              }
            >
              <option value="" disabled hidden>
                시
              </option>
              {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
            <select //kdh
              className="minute"
              type="text"
              value={waypoint.time2}
              onChange={(event) =>
                updateWaypointTime2(event.target.value, index)
              }
            >
              <option value="" disabled hidden>
                분
              </option>
              {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                <option key={minute} value={minute}>
                  {minute}
                </option>
              ))}
            </select>
            <input
              className="busstop"
              type="text"
              value={waypoint.name}
              onChange={(event) => {
                updateWaypointName(event.target.value, index);
                handleSearch(event.target.value, "waypoints", index);
              }}
              placeholder={"정류장"}
            />
            <input
              className="detail"
              type="text"
              value={waypoint.detailedLocation}
              onChange={(event) => updateWaypointDetailedLocation(event.target.value, index)}
              placeholder={"세부 지역"}
            />
            <button
              className="delete-button"
              onClick={() => removeWaypoint(index)}>-</button>
            <ul>
              {(searchResults.waypoints[index] || []).map((result) => (
                <li
                  key={result.id}
                  onClick={() =>
                    handleClick(
                      result.place_name,
                      (value) => updateWaypointName(value, index),
                      "waypoints",
                      index,
                      result.x,
                      result.y
                    )
                  }
                >
                  {result.place_name}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <button className="plus-button" type="button" onClick={addWaypoint}>
          + 정류장 추가
        </button>
        <button type="button" onClick={handleSaveRoutes}>
          확인
        </button>
        <h4 className="comment-guide">추가사항을 입력해주세요.</h4>
        <textarea
          className="comment-input"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="ex.전화번호"
          required
          style={{ resize: "none" }}
        />
        <h4 className="price-guide">기존금액</h4>
        <div className="price-container">
          <input className="price-input" placeholder="기존금액 입력" />
          <h4 className="price-won">원</h4>
        </div>
        <h4 className="discount-guide">할인금액</h4>
        <div className="discount-container">
          <input className="discount-input" placeholder="기존금액 입력" />
          <h4 className="discount-won">원</h4>
        </div>
        <h4 className="totalprice-guide">총 금액</h4>
        <div className="totalprice-container">
          <h4 className="totalprice-amount">0000</h4>
          <h4 className="totalprice-currency">원</h4>
        </div>
        <button className="register-button" type="submit">
          등록하기
        </button>
      </div>
    </div>
  );
}

export default NavWriteBoard;
