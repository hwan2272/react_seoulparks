import React, { useState, useEffect } from 'react';
import { ParkAroundPlaceItem } from './ParkAroundPlaceItem';

export function ParkAroundPlaces({lat, lng}) {
  const { kakao } = window;
  const [aroundMap, setAroundMap] = useState(null);
  const [placeFD6List, setPlaceFD6List] = useState([]);
  const [placeCE7List, setPlaceCE7List] = useState([]);

  const ps = new kakao.maps.services.Places(); 
  const userAgent = window.navigator.userAgent.toLowerCase();

  useEffect(() => {
    kakao.maps.load(() => {
      if(lat != undefined && lng != undefined) {
        kakaoInitMap(lat, lng);
        const fetchPlaceFD6Data = async () => {
          if(userAgent.includes('kakao')) {
            if(navigator.userAgent.match(/iPhone|iPad/i)) {
              //alert('IOS kakao인앱브라우저에서는 제대로 동작하지 않을 수 있습니다.\r\n외부 브라우저를 사용해 주세요.');
              //setPlaceFD6List([]);
            }
          }
          else {
            setPlaceFD6List(await getPlaceFD6Data(lat,lng));
          }
        }
        const fetchPlaceCE7Data = async () => {
          if(userAgent.includes('kakao')) {
            if(navigator.userAgent.match(/iPhone|iPad/i)) {
              //alert('IOS kakao인앱브라우저에서는 제대로 동작하지 않을 수 있습니다.\r\n외부 브라우저를 사용해 주세요.');
              //setPlaceFD6List([]);
            }
          }
          setPlaceCE7List(await getPlaceCE7Data(lat,lng));
        }
        fetchPlaceFD6Data();
        fetchPlaceCE7Data();
      }
    });
  },[lat, lng]);

  useEffect(() => {
    if(aroundMap != null && placeFD6List.length > 0) {
      displayOverlayFD6(placeFD6List);
      displayOverlayCE7(placeCE7List);
    }
  },[placeFD6List, placeCE7List]);

  const kakaoInitMap = (lat, lng) => {
      const mapOption = { 
          center: new kakao.maps.LatLng(lat, lng), // 지도의 중심좌표
          level: 5 // 지도의 확대 레벨
      };

      const mapContainer = document.querySelector('#around_map'); // 지도를 표시할 div
      setAroundMap(new kakao.maps.Map(mapContainer, mapOption)); 
  }

  const getPlaceFD6Data = (lat, lng) => {
    return new Promise((resolve, reject) => {
      ps.categorySearch('FD6', function(data, status, pagination) { // IOS kakao 인앱브라우저에서 data가 ERROR, status가 null로 떨어짐
        if (status === kakao.maps.services.Status.OK) {
          resolve(data);
        } else {
          reject(status);
        }
      }, {
          radius: 3000,
          location: new kakao.maps.LatLng(lat, lng)
      });
    });
  }

  const getPlaceCE7Data = (lat, lng) => {
    return new Promise((resolve, reject) => {
      ps.categorySearch('CE7', function(data, status, pagination) { // IOS kakao 인앱브라우저에서 data가 ERROR, status가 null로 떨어짐
        if (status === kakao.maps.services.Status.OK) {
          resolve(data);
        } else {
          reject(status);
        }
      }, {
          radius: 3000,
          location: new kakao.maps.LatLng(lat, lng)
      });
    });
  }

  const displayOverlayFD6 = (data) => {
    console.log(data);
    data.map(place => {
      let content = 
      `<div class ="overlay_fd6">${place.place_name}</div>`;
      let overlay = new kakao.maps.CustomOverlay({
            position: new kakao.maps.LatLng(place.y, place.x),
            content: content,
        });
      overlay.setMap(aroundMap);
    });
  }

  const displayOverlayCE7 = (data) => {
    console.log(data);
    data.map(place => {
      let content = 
      `<div class ="overlay_ce7">${place.place_name}</div>`;
      let overlay = new kakao.maps.CustomOverlay({
            position: new kakao.maps.LatLng(place.y, place.x),
            content: content,
        });
      overlay.setMap(aroundMap);
    });
  } 

  return (
    <div className="around_info">
      <h3>음식점</h3>
      <ul className="around_fd6">
        {placeFD6List.map((place, index) => {
            return <ParkAroundPlaceItem key={index} place={place} />
          })
        }
      </ul>
      <h3>카페</h3>
      <ul className="around_ce7">
        {placeCE7List.map((place, index) => {
            return <ParkAroundPlaceItem key={index} place={place} />
          })
        }
      </ul>
    </div>
  )
}
