import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';

class BrewerySpinner extends React.Component {
  constructor (props) {
    super(props);
    const spinnerActive = props.active;
    this.state = {
      spinnerActive : spinnerActive
    };
  }

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