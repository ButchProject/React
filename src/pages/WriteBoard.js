import React, { useState, useEffect } from "react";
import {
  Map as KakaoMap,
} from "react-kakao-maps-sdk";

import NavWriteBoard from "../components/NavWriteBoard";

function WriteBoard() {
  const [initialPosition, setInitialPosition] = useState(null);
  const [center, setCenter] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const currentPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setInitialPosition(currentPosition);
        setCenter(currentPosition);
      });
    } else {
      alert("이 브라우저에서는 Geolocation이 지원되지 않습니다.");
    }
  }, []);

  return (
    <div className="layout">
      <div className="features">
        <NavWriteBoard map={mapInstance} />
      </div>
      {initialPosition && center && (
        <KakaoMap
          onCreate={(map) => setMapInstance(map)}
          className="mapContainer"
          apikey={process.env.REACT_APP_KAKAO_MAP_API_KEY}
          center={center}
          level={3}
          style={{ width: "100%", height: "100vh" }}
        />
      )}
    </div>
  );
  
}

export default WriteBoard;
