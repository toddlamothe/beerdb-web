import React from 'react';
import HamburgerMenu from 'react-hamburger-menu';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hamburgerMenuClicked : props.hamburgerMenuClicked
    }  
  }
  
  render() {
    return (
      <nav className="navbar navbar-light">
        <div>
          BeerDb
        </div>

        <HamburgerMenu
            menuClicked={this.state.hamburgerMenuClicked}
            width={18} height={15} strokeWidth={1} rotate={0} color='black' borderRadius={0} animationDuration={0.5}
        />
      </nav>
    )
  }
}

export default Header;