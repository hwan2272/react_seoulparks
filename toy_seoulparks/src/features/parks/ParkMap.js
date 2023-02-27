const { naver } = window;


export const initMap = (lat, lng) => {
    const map = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(lat, lng),
        zoom: 14
    });

    const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(lat, lng),
        map: map
    });

    const pano = new naver.maps.Panorama('pano', {
        position: new naver.maps.LatLng(lat, lng),
        pov: {
            pan: -135,
            tilt: 29,
            fov: 100
        },
        flightSpot: true,
    });
}