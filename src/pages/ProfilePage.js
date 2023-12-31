import React, { useEffect } from "react";
import "../styles/ProfilePage.css";

const ProfilePage = () => {

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    // 현재 위치 정보 가져오기
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

  return (
    <div className="layout">
      <div className="features">
      </div>
      <div id="map" className="mapContainer">
      </div>
    </div>
  );
};

export default ProfilePage;
