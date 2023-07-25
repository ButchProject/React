import React, { useState, useEffect } from "react";
import {
  Map as KakaoMap,
  MapMarker as Marker,
} from "react-kakao-maps-sdk";
import "../Styles/Map.css";


function Map() {
  const [searchInput, setSearchInput] = useState("");
  const [initialPosition, setInitialPosition] = useState(null);
  const [center, setCenter] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showDetailsInput, setShowDetailsInput] = useState({
    visible: false,
    markerIndex: null,
  });
  const [detailsInput, setDetailsInput] = useState("");

  const openDetailsInput = (index) => {
    setShowDetailsInput({ visible: true, markerIndex: index });
  };

  const handleDetailsInputChange = (e) => {
    setDetailsInput(e.target.value);
  };

  const saveDetails = () => {
    const updatedMarker = {
      ...markers[showDetailsInput.markerIndex],
      details: detailsInput,
    };
    setMarkers(
      markers.map((marker, index) =>
        index === showDetailsInput.markerIndex ? updatedMarker : marker
      )
    );
    setDetailsInput("");
    setShowDetailsInput({ visible: false, markerIndex: null });
  };


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

  const search = () => {
    const keyword = searchInput;
    const places = new window.kakao.maps.services.Places();

    places.keywordSearch(keyword, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK && result.length > 0) {
        const newPosition = {
          lat: parseFloat(result[0].y),
          lng: parseFloat(result[0].x),
          name: result[0].place_name,
        };
        setMarkers([...markers, newPosition]);
        setCenter(newPosition);
        setSearchInput("");
        setSuggestions([]);
      } else if (
        status === window.kakao.maps.services.Status.ZERO_RESULT
      ) {
        alert("검색 결과가 없습니다.");
      } else {
        alert("검색 결과를 가져오는데 실패했습니다.");
      }
    });
  };

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
    if (e.target.value.length > 0) {
      fetchSuggestions(e.target.value);
    } else {
      setSuggestions([]);
    }
  };

  const fetchSuggestions = (query) => {
    const places = new window.kakao.maps.services.Places();
    places.keywordSearch(query, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setSuggestions(result);
      } else {
        setSuggestions([]);
      }
    });
  };

  const selectSuggestion = (suggestion) => {
    setSearchInput(suggestion.place_name);
    setSuggestions([]);
  };

  const deleteMarker = (index) => {
    setMarkers(markers.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={searchInput}
          onChange={handleInputChange}
          placeholder="장소 검색"
        />
        <button onClick={search}>검색</button>
        {suggestions && (
          <ul>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => selectSuggestion(suggestion)}
              >
                {suggestion.place_name}
              </li>
            ))}
          </ul>
        )}
      </div>
      {initialPosition && center && (
        <KakaoMap
          apikey={process.env.REACT_APP_KAKAO_MAP_API_KEY}
          center={center}
          level={3}
          style={{ width: "500px", height: "500px" }}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={{
                lat: parseFloat(marker.lat),
                lng: parseFloat(marker.lng),
              }}
              title={marker.name}
            />
          ))}
        </KakaoMap>
      )}

      <div>
        {markers.map((marker, index) => (
          <div key={index}>
            {marker.name} ({marker.lat}, {marker.lng}){" "}
            <button onClick={() => deleteMarker(index)}>삭제</button>{" "}
            <button onClick={() => openDetailsInput(index)}>세부사항</button>
            {marker.details && (
              <button onClick={() => alert(`세부 사항: ${marker.details}`)}>
                세부사항 확인
              </button>
            )}
          </div>
        ))}
      </div>

      {/* 세부사항 입력 및 저장 */}
      {showDetailsInput.visible && (
        <div>
          <input
            type="text"
            value={detailsInput}
            onChange={handleDetailsInputChange}
            placeholder="세부사항 입력"
          />
          <button onClick={saveDetails}>저장</button>
        </div>
      )}
    </div>
  );
}

export default Map;