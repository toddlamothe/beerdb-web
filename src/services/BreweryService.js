class BreweryDataService {

  async getBreweries(searchCriteria) {
    var baseUrl = " https://yxnbc1dm5e.execute-api.us-east-1.amazonaws.com/dev/breweries?postalCode=" + searchCriteria.zip + "&city=" + searchCriteria.city + "&state=" + searchCriteria.state;
    var apiKey = "PI9U8B6hNg3Kb80alaGgx4JqzWpd7Sjn14ObVXzb";
    var breweries;

    let response = await fetch(baseUrl, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "x-api-key" : apiKey
      },
    });
    let data = await response.json();
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
      return breweries;
    }
    else {
      console.log("search returned no results");
      return;
    }
  }
}

export default BreweryDataService;
