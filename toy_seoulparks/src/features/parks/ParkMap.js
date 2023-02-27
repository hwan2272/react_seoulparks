const { naver } = window;

export const naverInitMap = (lat, lng) => {
    const map = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(lat, lng),
        zoom: 14
    });

    const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(lat, lng),
        map: map
    });
}

export const naverInitPano = (lat, lng) => {
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