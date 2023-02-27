import React, { useState, useEffect } from 'react';

export function ParkAroundPlaces({lat, lng}) {
  let aroundMap = null;
  const [placeFD6Li, setPlaceFD6Li] = useState([]);
  const [placeCE7Li, setPlaceCE7Li] = useState([]);

  useEffect(() => {
    if(lat != undefined && lng != undefined) {
      kakaoInitMap(lat, lng);
      categorySearchDisplay(lat,lng);
    }
  },[lat, lng]);

  const kakaoInitMap = (lat, lng) => {
      const mapOption = { 
          center: new window.kakao.maps.LatLng(lat, lng), // 지도의 중심좌표
          level: 5 // 지도의 확대 레벨
      };

      const mapContainer = document.querySelector('#around_map'); // 지도를 표시할 div
      aroundMap = new window.kakao.maps.Map(mapContainer, mapOption); 
  }

  const categorySearchDisplay = (lat, lng) => {
      const ps = new window.kakao.maps.services.Places(); 
      ps.categorySearch('FD6', displayOverlayFD6, {
          radius: 3000,
          location: new window.kakao.maps.LatLng(lat, lng)
      });
      ps.categorySearch('CE7', displayOverlayCE7, {
          radius: 3000,
          location: new window.kakao.maps.LatLng(lat, lng)
      });
  };

  const displayOverlayFD6 = (datasetFD6) => {
    datasetFD6.map(place => {
      let content = 
      `<div class ="overlay_fd6">${place.place_name}</div>`;
      let overlay = new window.kakao.maps.CustomOverlay({
            position: new window.kakao.maps.LatLng(place.y, place.x),
            content: content,
        });
      overlay.setMap(aroundMap);
    });
    setPlaceFD6Li(datasetFD6);
  }

  const displayOverlayCE7 = (datasetCE7) => {
    datasetCE7.map(place => {
      let content = 
      `<div class ="overlay_ce7">${place.place_name}</div>`;
      let overlay = new window.kakao.maps.CustomOverlay({
            position: new window.kakao.maps.LatLng(place.y, place.x),
            content: content,
        });
      overlay.setMap(aroundMap);
    });
    setPlaceCE7Li(datasetCE7);
  } 

  const pop = (e, url) => {
      e.preventDefault();
      window.open(url, '_blank');
  }

  return (
    <div className="around_info">
      <h3>음식점</h3>
      <ul className="around_fd6">
        {placeFD6Li.map((place, index) => {
            return <li key={index} className ="around_item"><a onClick={(e) => pop(e, place.place_url)} href="#">{place.place_name}</a> ({place.category_name})</li>
          })
        }
      </ul>
      <h3>카페</h3>
      <ul className="around_ce7">
        {placeCE7Li.map((place, index) => {
            return <li key={index}className ="around_item"><a onClick={(e) => pop(e, place.place_url)} href="#">{place.place_name}</a> ({place.category_name})</li>
          })
        }
      </ul>
    </div>
  )
}
