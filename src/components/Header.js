import React from 'react';
import HamburgerMenu from 'react-hamburger-menu';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hamburgerMenuClicked : props.hamburgerMenuClicked
    }
  }

  render() {
    return (
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">
            <img src={ require('../images/beerlvr-logo-sm.png') } />&nbsp;
            brewlvr
          </Navbar.Brand>
          <Nav className="ml-auto">
            <HamburgerMenu
                isOpen={false}
                menuClicked={this.state.hamburgerMenuClicked}
                width={18} height={15} strokeWidth={1} rotate={0} color='black' borderRadius={0} animationDuration={0.5}
            />
          </Nav>
        </Navbar>
    )
  }
}

export default Header;
