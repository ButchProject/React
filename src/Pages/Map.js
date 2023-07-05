import React, { useState, useEffect } from "react";
import { Map as KakaoMap, MapMarker as Marker } from "react-kakao-maps-sdk";

function Map() {
  const [initialPosition, setInitialPosition] = useState(null);
  const [currentCenter, setCurrentCenter] = useState(null);
  const [busStops, setBusStops] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const currentPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setInitialPosition(currentPosition);
        setCurrentCenter(currentPosition);
      });
    } else {
      alert("이 브라우저에서는 Geolocation이 지원되지 않습니다.");
    }
  }, []);

  const addBusStop = () => {
    setBusStops([...busStops, currentCenter]);
  };

  const removeBusStop = (indexToRemove) => {
    setBusStops(busStops.filter((_, index) => index !== indexToRemove));
  };

  const onDragEnd = (marker, index) => {
    const newPosition = {
      lat: marker.getPosition().getLat(),
      lng: marker.getPosition().getLng(),
    };
    const updatedBusStops = [...busStops];          // busStops 배열을 복사합니다.
    updatedBusStops[index] = newPosition;           // 드래그된 마커의 인덱스에 새 위치를 할당합니다.
    setBusStops(updatedBusStops);                   // setBusStops를 호출하여 상태를 업데이트합니다.
  };

  return (
    <div>
      <h1>카카오맵</h1>
      {initialPosition && (
        <KakaoMap
          apikey={process.env.REACT_APP_KAKAO_MAP_API_KEY}
          center={initialPosition}
          level={3}
          style={{ width: "500px", height: "500px" }}
          onCenterChanged={(map) => {
            setCurrentCenter({
              lat: map.getCenter().getLat(),
              lng: map.getCenter().getLng(),
            });
          }}
        >
          {busStops.map((busStop, index) => (
            <Marker
              key={index}
              position={busStop}
              draggable={true}
              onDragEnd={(marker) => onDragEnd(marker, index)}
            />
          ))}
        </KakaoMap>
      )}
      <button onClick={addBusStop}>정류장 추가</button>
      <ul>
        {busStops.map((busStop, index) => (
          <li key={index}>
            정류장 {index + 1}: {busStop.lat.toFixed(6)}, {busStop.lng.toFixed(6)}{" "}
            <button onClick={() => removeBusStop(index)}>정류장 삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Map;