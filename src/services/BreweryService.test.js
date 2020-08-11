import BreweryDataService from './BreweryService';

global.fetch = jest.fn( () => {
  Promise.resolve({
    json : () => Promise.resolve({rates : "asdf"})
  })
});

beforeEach( () => {
  fetch.mockClear();
})

test('it should do something???', () => {
  const breweryDataService = new BreweryDataService();
  breweryDataService.getBreweries("", (data) => {
    console.log("data = ", data);
  })
});
