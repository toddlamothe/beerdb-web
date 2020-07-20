import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';

// Can be a string as well. Need to ensure each key-value pair ends with ;

class BrewerySpinner extends React.Component {
  constructor (props) {
    super(props);
    const spinnerActive = props.active;
    console.log("(props.active == false) = ", (props.active == false));
    this.state = {
      spinnerActive : spinnerActive
    };
  }
  // css={override}
  
  render() {
    return (
      <div>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    )
  }
}

export default BrewerySpinner;