import React from 'react';
import logo from './logo.svg';
import BeerMap from './components/BeerMap';
import BeerSearchForm from './components/BeerSearchForm';
import BreweryInfo from './components/BreweryInfo';
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
      isSearchPanelOpen : true,
      infoPanelBrewery : {
        "name" : ""
      },
      isInfoPanelOpen : false,
      defaultMapCenter : {
        lat: 39.8283,
        lng: -98.5795        
      }
    };
    
    this.breweryMarkerClickHandler = this.breweryMarkerClickHandler.bind(this);
    this.onSearchSubmitted = this.onSearchSubmitted.bind(this);
    this.showBreweryInfoPanel = this.showBreweryInfoPanel.bind(this);
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

  render() {
      return ( 
        <div className="App">
          <nav className="navbar navbar-light">
            <div>
              BeerDb
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
            breweries={this.state.breweries}
            onBreweryClick={this.breweryMarkerClickHandler}
            center={this.state.defaultMapCenter}
          />
          
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
        </div>
    )
  }  
}

export default App;