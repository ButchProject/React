import React, { useEffect } from 'react';
import '../Styles/mainPage.css'; // 스타일을 정의한 CSS 파일을 생성 및 불러오세요.

const MainPage = () => {
  useEffect(() => {
    const container = document.getElementById('map');

    const handleUserLocation = (position) => {
      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;
      const userLatLng = new window.kakao.maps.LatLng(userLat, userLng);
      const options = { center: userLatLng, level: 3 };
      const map = new window.kakao.maps.Map(container, options);

      // 지도 렌더링 후 로딩 텍스트 감추기
      document.getElementById('loading-text').style.display = 'none';
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
      <div id="loading-text" className="loading-text">지도를 불러오는 중...</div>
    </div>
  );
};

export default MainPage;
