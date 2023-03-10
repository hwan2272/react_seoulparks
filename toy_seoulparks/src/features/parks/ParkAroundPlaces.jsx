import React, { useState, useEffect } from 'react';
import { ParkAroundPlaceItem } from './ParkAroundPlaceItem';

export function ParkAroundPlaces({lat, lng}) {
  const { kakao } = window;
  const [aroundMap, setAroundMap] = useState(null);
  const [placeFD6List, setPlaceFD6List] = useState([]);
  const [placeCE7List, setPlaceCE7List] = useState([]);

  const ps = new kakao.maps.services.Places(); 
  const userAgent = window.navigator.userAgent.toLowerCase();

  /*
// useEffect를 사용하여 컴포넌트가 마운트될 때와 lat, lng이 변경될 때마다 실행되도록 함
useEffect(() => {
  // kakao.maps.load()를 사용하여 카카오 맵 API를 로드함
  kakao.maps.load(() => {
    // lat과 lng이 정의되어 있을 때만 지도를 초기화하도록 함
    if(lat != undefined && lng != undefined) {
      // kakaoInitMap() 함수를 사용하여 지도를 초기화함
      kakaoInitMap(lat, lng);
      // fetchPlaceFD6Data() 함수를 사용하여 FD6 데이터를 가져옴
      const fetchPlaceFD6Data = async () => {
        // userAgent에 'kakao'가 포함되어 있을 때만 실행되도록 함
        if(userAgent.includes('kakao')) {
          // userAgent에 'iPhone' 또는 'iPad'가 포함되어 있을 때만 실행되도록 함
          if(navigator.userAgent.match(/iPhone|iPad/i)) {
            // IOS kakao인앱브라우저에서는 제대로 동작하지 않을 수 있으므로 경고 메시지를 띄움
            //setPlaceFD6List([]); // 주석 처리된 코드는 불필요한 코드이므로 제거해도 됨
          }
        }
        else {
          // getPlaceFD6Data() 함수를 사용하여 FD6 데이터를 가져옴
          setPlaceFD6List(await getPlaceFD6Data(lat,lng));
        }
      }
      // fetchPlaceCE7Data() 함수를 사용하여 CE7 데이터를 가져옴
      const fetchPlaceCE7Data = async () => {
        // userAgent에 'kakao'가 포함되어 있을 때만 실행되도록 함
        if(userAgent.includes('kakao')) {
          // userAgent에 'iPhone' 또는 'iPad'가 포함되어 있을 때만 실행되도록 함
          if(navigator.userAgent.match(/iPhone|iPad/i)) {
            // IOS kakao인앱브라우저에서는 제대로 동작하지 않을 수 있으므로 경고 메시지를 띄움
            //setPlaceFD6List([]); // 주석 처리된 코드는 불필요한 코드이므로 제거해도 됨
          }
        }
        // getPlaceCE7Data() 함수를 사용하여 CE7 데이터를 가져옴
        setPlaceCE7List(await getPlaceCE7Data(lat,lng));
      }
      // fetchPlaceFD6Data()와 fetchPlaceCE7Data() 함수를 실행함
      fetchPlaceFD6Data();
      fetchPlaceCE7Data();
    }
  });
},[lat, lng]);

좋은 점:
- useEffect를 사용하여 컴포넌트가 마운트될 때와 lat, lng이 변경될 때마다 실행되도록 함
- 카카오 맵 API를 로드하는 kakao.maps.load() 함수를 사용함
- lat과 lng이 정의되어 있을 때만 지도를 초기화하도록 함
- async/await를 사용하여 비동기적으로 데이터를 가져옴

나쁜 점:
- 주석 처리된 코드는 불필요한 코드이므로 제거해야 함
- 경고 메시지를 띄우는 것보다는, 사용자가 이해할 수 있는 방법으로 문제를 해결하는 것이 좋음
*/

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
