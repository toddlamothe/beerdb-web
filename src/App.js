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
  };
  
  componentDidMount() {
      Modal.setAppElement(this.el);
  };
  
  toggleSearchPanel() {
      this.setState({
          isSearchPanelOpen: !this.state.isSearchPanelOpen
      });
  }  
  
  onSearchSubmitted(searchCriteria) {
    console.log("[App.js-> onSearchSubmitted]");
    console.log("searchCriteria = ", searchCriteria);
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