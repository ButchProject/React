import React, { useState, useEffect } from "react";
import {
  Map as KakaoMap, Polyline
} from "react-kakao-maps-sdk";
import NavWriteBoard from "../components/NavWriteBoard";
import { writingBoard } from '../apiServices/Auth';

function WriteBoard() {
  const [initialPosition, setInitialPosition] = useState(null);
  const [center, setCenter] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [searchRoute, setSearchRoute] = useState([]);
  const [shouldDrawPolyline, setShouldDrawPolyline] = useState(false);
  
  useEffect(() => {
    // routeData는 필요한 경우 서버로 전송할 추가 데이터입니다.
    // 만약 필요 없다면 아래 줄은 삭제하세요.
    const routeData = {}; 

    writingBoard(routeData)
      .then(data => {
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []); // 빈 의존성 배열로 설정하여 컴포넌트 마운트 시 한 번만 실행
  
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
  
  useEffect(() => {
    if (mapInstance && searchRoute.length > 1 && shouldDrawPolyline) {
      const polyline = new window.kakao.maps.Polyline({
        path: searchRoute.map((route) => new window.kakao.maps.LatLng(route.y, route.x)),
        strokeWeight: 3,
        strokeColor: "#db4a29",
        strokeOpacity: 1,
        strokeStyle: "solid",
        strokeLineCap: "round",
        strokeLineJoin: "round",
        endArrow: true,
      });
      polyline.setMap(mapInstance);
    } 
  }, [mapInstance, searchRoute, shouldDrawPolyline]);

  return (  
    <div className="layout">
      <div className="features">
        <NavWriteBoard 
          map={mapInstance} 
          setSearchRoute={setSearchRoute}
          setShouldDrawPolyline={setShouldDrawPolyline}
        />
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
