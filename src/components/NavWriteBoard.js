import React, { useState } from "react";
import "../styles/NavWriteBoard.css";

function NavWriteBoard({ map }) {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [waypoints, setWaypoints] = useState([]);
  const [searchResults, setSearchResults] = useState({ departure: [], arrival: [], waypoints: [] });

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

  const [markers, setMarkers] = useState({});


  const [selectedRoutes, setSelectedRoutes] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState({ departure: null, arrival: null, waypoints: [] });




  function handleClick(value, setValue, type, index = -1, x, y) {
    setValue(value);
    setSearchResults((prev) => ({ ...prev, [type]: [] }));

    if (!map) return; // 맵 객체가 없으면 마커를 추가하지 않습니다.

    // 마커 생성
    const marker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(y, x),
    });

    // 기존의 마커 제거
    if (markers[type]) {
      if (index === -1) {
        markers[type].setMap(null);
      } else {
        markers[type][index]?.setMap(null);
      }
    }

    // 새로운 마커를 맵에 추가
    marker.setMap(map);

    // 마커 상태 업데이트
    index === -1
      ? setMarkers((prev) => ({ ...prev, [type]: marker }))
      : setMarkers((prev) => ({
        ...prev,
        [type]: { ...prev[type], [index]: marker },
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
  }
  // 경로 저장 및 출력 함수
  const handleSaveRoutes = () => {
    const routes = [
      selectedLocations.departure,
      ...selectedLocations.waypoints,
      selectedLocations.arrival,
    ]
      .filter((route) => route !== null && route.name !== "")
      .map((route, idx) => ({ name: `#${idx + 1}: ${route.name}`, x: route.x, y: route.y }));

    setSelectedRoutes(routes);
  };

  const removeWaypoint = (index) => {
    const newWaypoints = waypoints.filter((_, idx) => idx !== index);
    setWaypoints(newWaypoints);
  };


  const addWaypoint = () => {
    setWaypoints((prev) => [...prev, ""]);
  };

  const updateWaypoint = (value, index) => {
    setWaypoints((prev) => prev.map((wp, i) => (i === index ? value : wp)));
  };
  return (
    <div className="sidebar">
      {/* 출발지 */}
      <div>
        <input
          type="text"
          value={departure}
          onChange={(event) => {
            setDeparture(event.target.value);
            handleSearch(event.target.value, "departure");
          }}
          placeholder={"출발지"}
        />
        <ul>
          {searchResults.departure.map((result) => (
            <li key={result.id} onClick={() =>
              handleClick(
                result.place_name,
                setDeparture,
                "departure",
                -1,
                result.x,
                result.y
              )
            }>
              {result.place_name}
            </li>
          ))}
        </ul>
      </div>
      {/* 경유지 */}
      {waypoints.map((waypoint, index) => (
        <div key={`waypoint-${index}`}>
          <input
            type="text"
            value={waypoint}
            onChange={(event) => {
              updateWaypoint(event.target.value, index);
              handleSearch(event.target.value, "waypoints", index);
            }}
            placeholder={"경유지"}
          />
          <button onClick={() => removeWaypoint(index)}>삭제</button>
          <ul>
            {(searchResults.waypoints[index] || []).map((result) => (
              <li
                key={result.id}
                onClick={() =>
                  handleClick(
                    result.place_name,
                    (value) => updateWaypoint(value, index),
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

      {/* 도착지 */}
      <div>
        <input
          type="text"
          value={arrival}
          onChange={(event) => {
            setArrival(event.target.value);
            handleSearch(event.target.value, "arrival");
          }}
          placeholder={"도착지"}
        />
        <ul>
          {searchResults.arrival.map((result) => (
            <li key={result.id} onClick={() =>
              handleClick(
                result.place_name,
                setArrival,
                "arrival",
                -1,
                result.x,
                result.y
              )
            }>
              {result.place_name}
            </li>
          ))}
        </ul>
      </div>

      {/* 경유지 추가 버튼 */}
      <button type="button" onClick={addWaypoint}>
        경유지추가
      </button>
      <button type="button" onClick={handleSaveRoutes}>
        확인
      </button>
      {/* 선택된 경로 출력 */}
      <div>
        <h3>선택된 경로:</h3>
        <ul>
          {selectedRoutes.map((route, idx) => (
            <li key={idx}>
              {route.name} (위도: {route.y}, 경도: {route.x})
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

export default NavWriteBoard;
