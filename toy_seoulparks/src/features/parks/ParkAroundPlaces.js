let mapOption = {};
let aroundMap = null;

export const getAroundPlaces = (lat, lng) => {
    mapOption = { 
        center: new window.kakao.maps.LatLng(lat, lng), // 지도의 중심좌표
        level: 5 // 지도의 확대 레벨
    };

    const mapContainer = document.getElementById('around_map'); // 지도를 표시할 div
    aroundMap = new window.kakao.maps.Map(mapContainer, mapOption); 

    const ps = new window.kakao.maps.services.Places(); 
    ps.categorySearch('FD6', getAroundData, {
        radius: 3000,
        location: new window.kakao.maps.LatLng(lat, lng)
    });
    ps.categorySearch('CE7', getAroundData, {
        radius: 3000,
        location: new window.kakao.maps.LatLng(lat, lng)
    });
};

const getAroundData = (dataset) => {
  displayOverlay(dataset, aroundMap);
}

const displayOverlay = (dataset, map) => {
  dataset.map(place => {
    let content = 
    `<div class ="overlay">${place.place_name}</div>`;
    let overlay = new window.kakao.maps.CustomOverlay({
          position: new window.kakao.maps.LatLng(place.y, place.x),
          content: content,
      });
    overlay.setMap(map);
  });
}