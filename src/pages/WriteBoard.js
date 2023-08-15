import React, { useState, useEffect } from "react";
import {
  Map as KakaoMap, Polyline
} from "react-kakao-maps-sdk";

import NavWriteBoard from "../components/NavWriteBoard";

function WriteBoard() {
  const [initialPosition, setInitialPosition] = useState(null);
  const [center, setCenter] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [searchRoute, setSearchRoute] = useState([]);

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
        <NavWriteBoard map={mapInstance} setSearchRoute={setSearchRoute} />
      </div>
      {initialPosition && center && (
        <KakaoMap
          onCreate={(map) => setMapInstance(map)}
          className="mapContainer"
          apikey={process.env.REACT_APP_KAKAO_MAP_API_KEY}
          center={center}
          level={3}
          style={{ width: "100%", height: "100vh" }}
        >
          {searchRoute.length > 1 && (
            <Polyline
              path={searchRoute.map((route) => new window.kakao.maps.LatLng(route.y, route.x))}
              options={{
                strokeWeight: 3,
                strokeColor: "#db4a29",
                strokeOpacity: 1,
                strokeStyle: "solid",
                strokeLineCap: "round",
                strokeLineJoin: "round",
                endArrow: true,
              }}
            />
          )}
        </KakaoMap>
      )}
    </div>
  );
  
}

export default WriteBoard;
