import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './About.css';

class PageNotFound extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div class="about-text">
          <Link to="/">
            beerlvr home
          </Link>
        </div>
        <div class="about-header">
          <h1>
            <span>Page Not Found</span>
          </h1>
        </div>
        <div>
          <img class="about-image" src={ require('../images/brewery.jpg') } />&nbsp;
        </div>
        <div class="about-text">
          <Link to="/">
            beerlvr home
          </Link>
        </div>
      </div>
    );
  }
}

export default PageNotFound;
