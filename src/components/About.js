import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './About.css';

class About extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>
          <Link to="/">
            Back to beerlvr
          </Link>
        </div>
        <div class="about-header">
          <h1 class="underline">
            <span>welcome!</span>
          </h1>
        </div>
        <div>
          <span>Use Beerlvr to search for breweries anywhere in the Unites States. Search by location or simply click Near Me to find breweries close by.<br/>Beerlvr is available free of charge and contains no ads.</span>
        </div>
        <Link to="/">
          Back to beerlvr
        </Link>
      </div>
    );
  }
}

export default About;
