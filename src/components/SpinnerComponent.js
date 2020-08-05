import React from 'react';
import { Spinner } from 'react-bootstrap';
import {spinnerService} from '../services/SpinnerService';

class SpinnerComponent extends React.Component {
  constructor(props) {
      super(props);

      if (!props.name) {
        throw new Error("Spinner component must have a name prop");
      }

      this.state = {
        show: this.props.hasOwnProperty('show') ? this.props.show : false
      };

      if (this.props.hasOwnProperty('spinnerService')) {
        this.spinnerService = this.props.spinnerService;
      } else {
        this.spinnerService = spinnerService;
      };

      this.spinnerService._register(this);
  };

  componentWillUnmount() {
    this.spinnerService._unregister(this);
  };


  get name() {
    return this.props.name;
  };

  get group() {
    return this.props.group;
  };

  get show() {
    return this.state.show;
  };

  set show(show) {
    this.setState({ show });
  };

  render() {
    if (this.state.show) {
      return(
        <div style={{ display: 'inline-block' }}>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      )
    }

    return (<div></div>);
  }
}

export default SpinnerComponent;
