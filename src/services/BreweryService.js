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
      return;
    }
  }

  async getBreweryBeers(breweryId) {
    var baseUrl = "https://yxnbc1dm5e.execute-api.us-east-1.amazonaws.com/dev/breweries/" + breweryId + "/beers";
    var apiKey = "PI9U8B6hNg3Kb80alaGgx4JqzWpd7Sjn14ObVXzb";
    var breweryBeers;

    let response = await fetch(baseUrl, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "x-api-key" : apiKey
      },
    });
    let data = await response.json();
    if (data.data && data.data.length > 0) {
      breweryBeers = data.data.map((beer) => {
          return {
              "name" : beer.name,
              "id" : beer.id,
              "abv" : beer.abv,
              "ibu" : beer.ibu,
              "labels" : beer.labels
          }
      });
      return breweryBeers;
    }
    else {
      return;
    }


  }
}

export default BreweryDataService;
