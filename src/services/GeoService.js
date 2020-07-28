class GeoService {

  getLocationData(lat, lng, callback) {
    if (!lat || !lng) return "Invalid lat/lng parameters";

    const geoCodeBaseUrl = "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyB8XchO4u2Ig273475Zl1RImvskWNZDEOw&latlng=" + lat + "," + lng;
    // let myHeaders = new Headers();
    // myHeaders.append('Content-Type', 'image/jpeg');
    const initForGeoCodeApi = {
      method: 'GET',
      // headers: myHeaders,
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
        // console.log("geoCode data = ", data);
        callback(data);
        // if (data.totalResults && data.totalResults > 0) {
        //   breweries = data.data.map((brewery) => {
        //       return {
        //           "name" : brewery.brewery.name,
        //           "id" : brewery.breweryId,
        //           "description" : brewery.brewery.description,
        //           "url" : brewery.brewery.website,
        //           "coords" : {
        //               "lat" : brewery.latitude,
        //               "lng" : brewery.longitude
        //           },
        //           "images" : brewery.brewery.images
        //       }
        //   });
        //   callback(breweries);
        // }
        // else {
        //   console.log("search returned no results");
        //   callback();
        // }
      })
      .catch(console.log)

  }
}

export default GeoService;
