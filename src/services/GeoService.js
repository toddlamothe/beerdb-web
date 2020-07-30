class GeoService {

  getLocationData(lat, lng, callback) {
    if (!lat || !lng) return "Invalid lat/lng parameters";

    const geoCodeBaseUrl = "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyB8XchO4u2Ig273475Zl1RImvskWNZDEOw&latlng=" + lat + "," + lng;
    const initForGeoCodeApi = {
      method: 'GET',
      mode: 'cors',
      cache: 'default'
    };

    fetch(geoCodeBaseUrl, initForGeoCodeApi, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(res => res.json())
      .then((data) => {
        callback(data);
      })
      .catch(console.log)

  }
}

export default GeoService;
