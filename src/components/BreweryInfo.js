import React from 'react';

class BreweryInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breweryId : props.breweryId
    }
  }
  
  render() {
    return (
      <div>{this.state.breweryId}</div>
    )
  }
}

export default BreweryInfo;