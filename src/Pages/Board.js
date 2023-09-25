import React, { useEffect, useState } from "react";
import NavBoard from "../components/NavBoard"; // NavBoard 컴포넌트를 가져옵니다.
import '../styles/Board.css'; // Board.css를 import합니다.

const Board = () => {
    const [locations, setLocations] = useState([]);
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);  
    const [polyline, setPolyline] = useState(null);  // 추가된 코드

   useEffect(() => {
       if (navigator.geolocation) {
           navigator.geolocation.getCurrentPosition(
               position => {
                   const currentLatitude = position.coords.latitude;
                   const currentLongitude = position.coords.longitude;

                   const container = document.getElementById('map');
                   const options = {
                       center: new window.kakao.maps.LatLng(currentLatitude, currentLongitude),
                       level: 3
                   };
                   
                   // Map instance is saved to state for later use.
                   setMap(new window.kakao.maps.Map(container, options));
               },
               error => console.error(error)
           );
       }
   }, []);

   useEffect(() => {
       if (map && locations.length > 0) { 
           // Remove all existing markers
           markers.forEach(marker => marker.setMap(null));
           setMarkers([]);

           let newMarkers = [];
           
           locations.forEach(location => {
               let marker = new window.kakao.maps.Marker({
                    position: new window.kakao.maps.LatLng(location.latitude, location.longitude),
                    map: map
                });
                newMarkers.push(marker);
            });

            setMarkers(newMarkers);

            // Remove existing polyline
            if(polyline){
                polyline.setMap(null);
            }

            // Draw polyline between markers
            let linePath = locations.map(location =>
                new window.kakao.maps.LatLng(location.latitude, location.longitude)
            );

            let polylineOptions ={
                path: linePath,
                strokeWeight: 5,
                strokeColor: '#FF0000',
                strokeOpacity: 0.7,
                strokeStyle: 'solid'
            };

            let newPolyline= new window.kakao.maps.Polyline(polylineOptions);
            
             // Save the reference of the polyline to the state.
             setPolyline(newPolyline);

             newPolyline.setMap(map);
        }
    }, [locations]);

    return (
        <div className="layout">
          <div className="features">
              <NavBoard setLocations={setLocations} />
          </div>
          <div id="map" className="mapContainer">
              {/* 이곳에 맵이 표시됩니다 */}
          </div>
      </div>
   );
};

export default Board;
