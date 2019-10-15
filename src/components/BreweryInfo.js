import React from 'react';

class BreweryInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breweryId : props.breweryId,
      breweryName : props.breweryName,
      breweryDescription : props.breweryDescription,
      breweryLogo : props.breweryLogo
    }
  }
  
  render() {
    return (
      <div>
        <small>
          {this.state.breweryDescription} <br/>
        </small>
      </div>
    )
  }
}

export default BreweryInfo;