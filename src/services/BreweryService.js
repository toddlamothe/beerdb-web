class BreweryDataService {
  
  getBreweries(searchCriteria, callback) {
    var baseUrl = " https://yxnbc1dm5e.execute-api.us-east-1.amazonaws.com/dev/breweries?postalCode=" + searchCriteria.zip + "&city=" + searchCriteria.city + "&state=" + searchCriteria.state;
    var apiKey = "PI9U8B6hNg3Kb80alaGgx4JqzWpd7Sjn14ObVXzb";
    var breweries;

    fetch(baseUrl, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "x-api-key" : apiKey
      },
    })
      .then(res => res.json())
      .then((data) => {
        if (data.totalResults && data.totalResults > 0) {
          breweries = data.data.map((brewery) => {
              return {
                  "name" : brewery.brewery.name,
                  "id" : brewery.breweryId,
                  "description" : brewery.brewery.description,
                  "url" : brewery.brewery.website,
                  "coords" : {
                      "lat" : brewery.latitude,
                      "lng" : brewery.longitude
                  },
                  "images" : brewery.brewery.images
              }
          });
          callback(breweries);          
        }
        else {
          console.log("search returned no results");
        }
      })
      .catch(console.log)      
  }
}

export default BreweryDataService;