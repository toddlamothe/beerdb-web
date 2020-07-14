import React from 'react';
import BeerMap from './components/BeerMap';
import BeerSearchForm from './components/BeerSearchForm';
import BreweryInfo from './components/BreweryInfo';
import Header from './components/Header';
import Modal from 'react-modal';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import HamburgerMenu from 'react-hamburger-menu';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Switch, Route, Link} from 'react-router-dom';
import queryString from 'query-string';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // isSearchPanelOpen : true,
      // infoPanelBrewery : {
      //   "name" : ""
      // },
      // isInfoPanelOpen : false,
      // mapState : {
      //   center: {
      //       lat: 39.8283,
      //       lng: -98.5795        
      //   },
      //   zoom : 7
      // }
    };
    
    this.mapStateChangedHandler = this.mapStateChangedHandler.bind(this);
    // this.breweryMarkerClickHandler = this.breweryMarkerClickHandler.bind(this);
    // this.onSearchSubmitted = this.onSearchSubmitted.bind(this);
    // this.showBreweryInfoPanel = this.showBreweryInfoPanel.bind(this);
  };
  
  componentDidMount() {
      Modal.setAppElement(this.el);
  };
  
  
  mapStateChangedHandler(newMapCenter, newMapZoom) {
    console.log("[App.mapStateChangedHandler]");
    console.log("newMapCenter = ", newMapCenter);
    console.log("newMapZoom = ", newMapZoom);
    // Map center and zoom will live in the App component and be passed 
    // down to the BeerMap. Set center and zoom here and re-render map
    this.setState( {
      mapState : {
        center: newMapCenter,
        zoom : newMapZoom
      }
    });    
  }
  
  render() {
    console.log("[APP RENDER]");
      return ( 
        <div className="App">
          
          <Route children={(props) => ( 
            <BeerMap
              isMarkerShown
              breweries={this.state.breweries}
              onBreweryClick={this.breweryMarkerClickHandler}
              onMapStateChange={this.mapStateChangedHandler}
              mapState={this.state.mapState}
              // center={this.state.defaultMapCenter}
              {...props}
            />
          )} 
          />          

        </div>
    )
  }  
}

export default App;



// ****** JavaScript ******

/*

showBreweryInfoPanel(breweryId) {
    var infoPanelBrewery = this.state.breweries.find( (brewery) => {
      return brewery.id === breweryId;
    })
    if (!infoPanelBrewery) return;

    this.setState( {
      isInfoPanelOpen : true,
      infoPanelBrewery : infoPanelBrewery,
    })
}


toggleSearchPanel() {
    this.setState({
        isSearchPanelOpen: !this.state.isSearchPanelOpen
    });
};

onSearchSubmitted(searchCriteria) {
  this.searchBreweriesByCriteria(searchCriteria);
};

searchBreweriesByCriteria(searchCriteria) {
    var city, state, zip;
    searchCriteria.city ? city = searchCriteria.city : city = "";
    searchCriteria.state ? state = searchCriteria.state : state = "";
    searchCriteria.zip ? zip = searchCriteria.zip : zip = "";
    
    this.fetchBreweries(city, state, zip, (breweries) => {
      this.setState( {
        breweries : breweries
      });
    });
};

fetchBreweries(city, state, zip, callback) {
  var baseUrl = " https://yxnbc1dm5e.execute-api.us-east-1.amazonaws.com/dev/breweries?postalCode=" + zip + "&city=" + city + "&state=" + state;
  var apiKey = "PI9U8B6hNg3Kb80alaGgx4JqzWpd7Sjn14ObVXzb";
  var breweries;
  this.toggleSearchPanel();

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
};

breweryMarkerClickHandler(breweryId) {
  this.showBreweryInfoPanel(breweryId);
}


*/



// ****** JSX ******

/*

PUT THIS IN <div classname="app">
<Header hamburgerMenuClicked={this.toggleSearchPanel.bind(this)} />



PUT THIS ABOVE render()

<div ref={ref => this.el = ref}>
  <SlidingPane
      className='search-panel'
      overlayClassName='search-panel'
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
      className='brewery-info-panel'
      title={this.state.infoPanelBrewery.name}
      closeIcon=<img src={this.state.infoPanelBrewery.images ? this.state.infoPanelBrewery.images.icon : ""} />
      isOpen={ this.state.isInfoPanelOpen }
      // title='BOTTOM PANE'
      from='bottom'
      width='100%'
      onRequestClose={ () => this.setState({ isInfoPanelOpen: false }) }                
      >
      <BreweryInfo 
        brewery = {this.state.infoPanelBrewery}
      />                
  </SlidingPane>
</div>
*/