import BreweryDataService from './BreweryService';

beforeEach( () => {
  fetch.mockClear();
})

test('it should return breweries', async () => {
  var breweryService = new BreweryDataService();
  var searchCriteria = {
    city: "",
    lat: "",
    lng: "",
    showInvalidCriteriaError: false,
    state: "",
    zip: "05403"
  };
  var mockBrewerySearchResponse = {
    totalResults : 1,
    data : [
      {
        brewery : {
          name : "Budweiser",
          id : 1,
          description: "Amazing.",
          url : "example.com",
          coords : { lat : 44.45597900720362, lng : -73.18486685},
          images : [
            { url : 'example.com'}
          ]
        }
      }
    ]
  }

  fetch.mockResponseOnce(JSON.stringify(mockBrewerySearchResponse));

  await breweryService.getBreweries(searchCriteria).then((breweries) => {
    expect(breweries.length).toBe(1);
    expect(breweries[0].name = "Budweiser")
  });
});
