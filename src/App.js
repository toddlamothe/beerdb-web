import React from 'react';
import logo from './logo.svg';
import BeerMap from './components/BeerMap';
import BeerSearchForm from './components/BeerSearchForm'
import Modal from 'react-modal';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import HamburgerMenu from 'react-hamburger-menu';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearchPanelOpen : false,
      isInfoPanelOpen : false,
      breweries : {}, 
    };
    
    this.onSearchSubmitted = this.onSearchSubmitted.bind(this);
  };
  
  componentDidMount() {
      Modal.setAppElement(this.el);
  };
  
  toggleSearchPanel() {
      this.setState({
          isSearchPanelOpen: !this.state.isSearchPanelOpen
      });
  };
  
  onSearchSubmitted(searchCriteria) {
    console.log("[App.js-> onSearchSubmitted]");
    console.log("searchCriteria = ", searchCriteria);
    this.searchBreweriesByCriteria(searchCriteria);
  };
  
  searchBreweriesByCriteria(searchCriteria) {
    console.log("[searchBreweriesByCriteria]");
      var city, state, zip;
      // Clear map
      // window.map.clearOverlays();

      // hideInfoPanel();
      // hideInputValidationError();
      // showSpinner();
      
      searchCriteria.city ? city = searchCriteria.city : city = "";
      searchCriteria.state ? state = searchCriteria.state : state = "";
      searchCriteria.zip ? zip = searchCriteria.zip : state = "";
      console.log("city = ", city);
      console.log("state = ", state);
      console.log("zip = ", zip);
      
      this.fetchBreweries(city, state, zip, (breweries) => {
        console.log("[fetchBreweries callback]");
        // Show breweries on the map
        this.showBreweries(breweries);
      });
  };
  
  fetchBreweries(city, state, zip, callback) {
    var baseUrl = " https://yxnbc1dm5e.execute-api.us-east-1.amazonaws.com/dev/breweries?postalCode=" + zip + "&city=" + city + "&state=" + state;
    var apiKey = "PI9U8B6hNg3Kb80alaGgx4JqzWpd7Sjn14ObVXzb"; //x-api-key
    var breweries;
    console.log("[fetchBreweries]");

    fetch(baseUrl, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "x-api-key" : apiKey
      },
    })
        .then(res => res.json())
        .then((data) => {
          this.toggleSearchPanel();
          if (data.totalResults && data.totalResults > 0) {
            breweries = data.data.map((brewery) => {
                console.log("brewery map function");
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
            console.log("breweries = ", breweries);            
          }
          else {
            console.log("search returned no results");
          }
        })
        .catch(console.log)

    // $.ajax({
    //     type: 'GET',
    //     url: baseUrl,
    //     crossDomain: true,
    //     headers: { "x-api-key": apiKey },
    //     contentType: 'application/json'
    // })
    // .done(function(data) {
    //   console.log("totalResults: ", data.totalResults);
    //   if (data.totalResults > 0) {
    //       // Map breweries to usable data set
    //       breweries = data.data.map((brewery) => {
    //           console.log("brewery map function");
    //           return {
    //               "name" : brewery.brewery.name,
    //               "id" : brewery.breweryId,
    //               "description" : brewery.brewery.description,
    //               "url" : brewery.brewery.website,
    //               "coords" : {
    //                   "lat" : brewery.latitude,
    //                   "lng" : brewery.longitude
    //               },
    //               "images" : brewery.brewery.images
    //           }
    //       });
    //       callback(breweries);
    //   }
    //   else {
    //       // No results
    //   }
    //   hideSpinner();
    // });
  };

  showBreweries() {
    console.log("[showBreweries]");
  }
  
  render() {
      return ( 
        <div className="App">
          <nav className="navbar navbar-light">
            <div>
                <button onClick={ () => this.setState({ isInfoPanelOpen: true }) }>
                    Open Bottom Panel
                </button>
            </div>

          <HamburgerMenu
              isOpen={this.state.isSearchPanelOpen}
              menuClicked={this.toggleSearchPanel.bind(this)}
              width={18}
              height={15}
              strokeWidth={1}
              rotate={0}
              color='black'
              borderRadius={0}
              animationDuration={0.5}
          />
          </nav>
          <BeerMap
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB8XchO4u2Ig273475Zl1RImvskWNZDEOw&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100vh` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
          
          <div ref={ref => this.el = ref}>
            <SlidingPane
                className='some-custom-class'
                overlayClassName='some-custom-overlay-class'
                isOpen={ this.state.isSearchPanelOpen }
                title='Brewery Search'
                // subtitle='Optional subtitle.'
                onRequestClose={ () => {
                    // triggered on "<" on left top click or on outside click
                    this.setState({ isSearchPanelOpen: false });
                } }>
                <BeerSearchForm
                  onSearchSubmitted={this.onSearchSubmitted} />
            </SlidingPane>
            <SlidingPane
                closeIcon={<div>BREWERY NAME HERE</div>}
                isOpen={ this.state.isInfoPanelOpen }
                // title='BOTTOM PANE'
                from='bottom'
                width='100%'
                onRequestClose={ () => this.setState({ isInfoPanelOpen: false }) }>
                <div>Info Panel Content Here</div>
            </SlidingPane>
          </div>
        </div>
    )
  }  
}

export default App;