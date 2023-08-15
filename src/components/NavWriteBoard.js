import React, { useState } from "react";
import "../styles/NavWriteBoard.css";

function NavWriteBoard({ map, setSearchRoute }) {
  const [waypoints, setWaypoints] = useState([""]);
  const [searchResults, setSearchResults] = useState({ waypoints: [] });

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
  const [selectedLocations, setSelectedLocations] = useState({ waypoints: [] });

  function handleClick(value, setValue, type, index = -1, x, y) {
    setValue(value);
    setSearchResults((prev) => ({ ...prev, [type]: [] }));
  
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
          [type]: [...(prev[type] || []), marker], // 배열에 마커 추가
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
  

  const handleSaveRoutes = () => {
    const filteredWaypoints = selectedLocations.waypoints.filter(
      (route) => route !== null && route.name !== ""
    );
  
    const routes = filteredWaypoints.map((route, idx) => ({
      name: `#${idx + 1}: ${route.name}`,
      x: route.x,
      y: route.y,
    }));
  
    setSelectedRoutes(routes);
    setSearchRoute(routes);
  };

  const removeWaypoint = (index) => {
    const newWaypoints = waypoints.filter((_, idx) => idx !== index);
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
      const newMarkers = markers.waypoints.filter((_, idx) => idx !== index); // 여기에서 배열의 삭제항목을 제거
      setMarkers((prev) => ({
        ...prev,
        waypoints: newMarkers,
      }));
    }
  };
  
  

  const addWaypoint = () => {
    setWaypoints((prev) => [...prev, ""]);
  };

  const updateWaypoint = (value, index) => {
    setWaypoints((prev) => prev.map((wp, i) => (i === index ? value : wp)));
  };

  return (
    <div className="sidebar">
      {/* 정류장 검색바 */}
      {waypoints.map((waypoint, index) => (
        <div key={`waypoint-${index}`}>
          <input
            type="text"
            value={waypoint}
            onChange={(event) => {
              updateWaypoint(event.target.value, index);
              handleSearch(event.target.value, "waypoints", index);
            }}
            placeholder={"정류장"}
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
  
      {/* 경유지 추가 버튼 */}
      <button type="button" onClick={addWaypoint}>
        정류장 추가
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
