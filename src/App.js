import React from 'react';
import logo from './logo.svg';
import BeerMap from './BeerMap';
import Modal from 'react-modal';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearchPanelOpen : false,
      isInfoPanelOpen : false,
    };
  };
  
  componentDidMount() {
      Modal.setAppElement(this.el);
  };  

  render() {
      return ( 
        <div className="App">
          <div className="App">
            <BeerMap
              isMarkerShown
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB8XchO4u2Ig273475Zl1RImvskWNZDEOw&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100vh` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </div>     
          
          <div ref={ref => this.el = ref}>
            <button onClick={() => this.setState({ isSearchPanelOpen: true })}>Click me to open right pane!</button>
            <div style={{ marginTop: '32px' }}>
                <button onClick={ () => this.setState({ isSearchPanelOpen: true }) }>
                    Click me to open left pane with 20% width!
                </button>
            </div>
            <div style={{ marginTop: '32px' }}>
                <button onClick={ () => this.setState({ isInfoPanelOpen: true }) }>
                    Click me to open BOTTOM pane!
                </button>
            </div>

            <SlidingPane
                className='some-custom-class'
                overlayClassName='some-custom-overlay-class'
                isOpen={ this.state.isSearchPanelOpen }
                title='Hey, it is optional pane title.  I can be React component too.'
                subtitle='Optional subtitle.'
                onRequestClose={ () => {
                    // triggered on "<" on left top click or on outside click
                    this.setState({ isSearchPanelOpen: false });
                } }>
                <div>And I am pane content. BTW, what rocks?</div>
                <br />
                <img src='img.png' />
            </SlidingPane>
            <SlidingPane
                closeIcon={<div>CLOSE BOTTOM PANE</div>}
                isOpen={ this.state.isInfoPanelOpen }
                title='BOTTOM PANE'
                from='bottom'
                width='100%'
                onRequestClose={ () => this.setState({ isInfoPanelOpen: false }) }>
                <div>And I am pane content on BOTTOM.</div>
            </SlidingPane>
          </div>
        </div>
    )
  }  
}

export default App;