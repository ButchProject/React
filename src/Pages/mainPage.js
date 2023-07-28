import React, { useEffect } from 'react';

const MainPage = () => {
  useEffect(() => {
    const container = document.getElementById('map');

    const handleUserLocation = (position) => {
      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;
      const userLatLng = new window.kakao.maps.LatLng(userLat, userLng);
      const options = { center: userLatLng, level: 3 };
      const map = new window.kakao.maps.Map(container, options);
    };

    const handleLocationError = () => {
      alert('브라우저가 위치 정보를 지원하지 않습니다.');
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleUserLocation, handleLocationError);
    } else {
      handleLocationError();
    }
  }, []);

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '100vh' }}></div>
    </div>
  );
};

export default MainPage;
