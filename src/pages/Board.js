// Board.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBoard from "../components/NavBoard"; // NavBoard 컴포넌트를 가져옵니다.
import '../styles/Board.css'; // Board.css를 import합니다.

const Board = () => {
    const navigate = useNavigate();

    const goToWriteBoard = () => {
        navigate("/writeboard");
    };

    useEffect(() => {
        const container = document.getElementById('map');
        const options = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
        };

        // 현재 위치 정보 가져오기
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    options.center = new window.kakao.maps.LatLng(latitude, longitude);
                    new window.kakao.maps.Map(container, options);
                },
                error => {
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
                <NavBoard onWriteButtonClick={goToWriteBoard} /> {/* goToWriteboard 함수를 prop으로 전달합니다 */}
            </div>
            <div id="map" className="mapContainer">
                {/* 이곳에 맵이 표시됩니다 */}
            </div>
        </div>
    );
};

export default Board;
