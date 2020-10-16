import React, { Component } from 'react';
import BeerMap from './BeerMap';
import BreweryInfoCard from './BreweryInfoCard';
import Header from './Header';
import BrewerySearchForm from './BrewerySearchForm';
import BreweryDataService from '../services/BreweryService';
import SpinnerComponent from './SpinnerComponent';
import { spinnerService } from '../services/SpinnerService';
import queryString from 'query-string';
import SlidingPane from 'react-sliding-pane';
import "react-sliding-pane/dist/react-sliding-pane.css";
import './Main.css';
import ReactGA from 'react-ga';

const defaultMapState = {
  center: { lat: 39.8283,lng: -98.5795 },
  zoom : 7
};

// Main is a container for BeerMap content and components. It also serves
// as a child of App that will accept location props from the parent router
class Main extends Component {
  constructor(props) {
    super(props);
    const querystringParameters = queryString.parse(props.location.search)
    var mapState;

    mapState = {
      center : {
        lat : querystringParameters.lat ? Number(querystringParameters.lat) : defaultMapState.center.lat,
        lng : querystringParameters.lng ? Number(querystringParameters.lng) : defaultMapState.center.lng
      },
      zoom : querystringParameters.zoom ? Number(querystringParameters.zoom) : defaultMapState.zoom,
      fitBounds : true
    };

    this.state = {
      loading : false,
      isSearchPanelOpen : !this.searchParametersExist(),
      mapState : mapState,
      isInfoPanelOpen : false,
      selectedBrewery : {
        name : ""
      }
    };

    this.mapStateChangedHandler = this.mapStateChangedHandler.bind(this);
    this.onSearchSubmitted = this.onSearchSubmitted.bind(this);
    this.breweryMarkerClickHandler = this.breweryMarkerClickHandler.bind(this);
    this.showBreweryInfoPanel = this.showBreweryInfoPanel.bind(this);
  };

  componentDidMount() {
    const querystringParameters = queryString.parse(this.props.location.search)
    var mapState;
    // Filter criteria in the querystring overrides lat/lng in the querystring
    if (this.searchParametersExist()) {
      // Perform brewery search based on filter criteria in querystring
      var searchCriteria = {
        city : querystringParameters.city ? querystringParameters.city : "",
        state : querystringParameters.state ? querystringParameters.state : "",
        zip : querystringParameters.zip ? querystringParameters.zip : "",
        lat : "",
        lng : "",
        showError : false
      };

      this.brewerySearch(searchCriteria);
    }
  }

  searchParametersExist() {
    const querystringParameters = queryString.parse(this.props.location.search)
    return (querystringParameters.city || querystringParameters.state || querystringParameters.zip);
  }

  mapStateChangedHandler(mapState, fitBounds = false) {
    const querystringParameters = this.state.mapState.center;
    console.log("[mapStateChangedHandler] : this.state = ", this.state);
    // If new route matches current route, do not push duplicate to history
    if ( (mapState.center.lat == querystringParameters.lat) &&
        (mapState.center.lng == querystringParameters.lng)
      ) {
        return;
    };

    // Build new querystring and add it to route history
    var newRoute = "/?lat=" + mapState.center.lat + "&lng=" + mapState.center.lng + "&zoom=" + mapState.zoom;
    this.props.history.push(newRoute);
    this.setState( {
      mapState : {
        center : {
          lat : mapState.center.lat,
          lng : mapState.center.lng
        },
        zoom : mapState.zoom,
        fitBounds : fitBounds
      }
    });
  };

  toggleSearchPanel() {
    this.setState({
        isSearchPanelOpen: !this.state.isSearchPanelOpen
    });
  };

  onSearchSubmitted(searchCriteria) {
    this.brewerySearch(searchCriteria);
  }

  brewerySearch(searchCriteria) {
    var breweryService = new BreweryDataService();
    spinnerService.show("brewerySearchSpinner");
    breweryService.getBreweries(searchCriteria).then((breweries) => {
      if (breweries) {
        this.setState( {
          breweries : breweries,
          isSearchPanelOpen : false,
          mapState : {
            center : this.state.mapState.center,
            zoom : this.state.mapState.zoom,
            fitBounds : true
          },
          showNoResultsError : false,
          noResultsErrorMessage : ""
        })
      } else {
        // Search returned no results
        console.log("Search returned no results");
        console.log("setting state to 'Search returned no results please try harder'");
        this.setState( {
          showNoResultsError : true,
          noResultsErrorMessage : "Search returned no results please try harder"
        })
      }
      spinnerService.hide("brewerySearchSpinner");
    });
  }

  breweryMarkerClickHandler(breweryId) {
    ReactGA.event({category: 'View',action: 'View Brewery Details'});
    this.showBreweryInfoPanel(breweryId);
  }

  showBreweryInfoPanel(breweryId) {
      var selectedBrewery = this.state.breweries.find( (brewery) => {
        return brewery.id === breweryId;
      })
      if (!selectedBrewery) return;

      this.setState( {
        isInfoPanelOpen : true,
        selectedBrewery : selectedBrewery,
      })
  }

  render() {
    return (
      <div>

        <Header hamburgerMenuClicked={this.toggleSearchPanel.bind(this)} />

        <BeerMap
          center={this.state.mapState.center}
          zoom={this.state.mapState.zoom}
          fitBounds={this.state.mapState.fitBounds}
          mapStateChanged={this.mapStateChangedHandler}
          breweries={this.state.breweries}
          onBreweryClick={this.breweryMarkerClickHandler}
        />

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
            <BrewerySearchForm
              onSearchSubmitted={this.onSearchSubmitted}
              showError={this.state.showNoResultsError}
              errorMessage={this.state.noResultsErrorMessage} />
        </SlidingPane>

        <SlidingPane
            className='brewery-info-panel'
            title={this.state.selectedBrewery.name}
            closeIcon=<img alt="" src={this.state.selectedBrewery.images ? this.state.selectedBrewery.images.icon : ""} />
            isOpen={ this.state.isInfoPanelOpen }
            // title='BOTTOM PANE'
            from='bottom'
            width='100%'
            onRequestClose={ () => this.setState({ isInfoPanelOpen: false }) }
            >
            <BreweryInfoCard
              brewery = {this.state.selectedBrewery}
            />
        </SlidingPane>

        <div className="brewerySpinner">
          <SpinnerComponent name="brewerySearchSpinner" show=""/>
        </div>

      </div>
    )
  };
};

export default Main;
