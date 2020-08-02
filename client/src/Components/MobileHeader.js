import React, { Component } from "react";
import MenuDrawer from "./Includes/MenuDrawer";

class MobileHeader extends Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onCloseDrawer = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div className="mobile-header">
        <div className="menu-logo">
          <div className="burger-menu" onClick={this.showDrawer}>
            <i class="fa fa-bars" aria-hidden="true"></i>
          </div>
          <div className="logo">
            <img src="/images/logo.png" />
          </div>
        </div>
        <div className="search-mob">
          <i class="fa fa-search" aria-hidden="true"></i>
        </div>
        <MenuDrawer showDrawer={this.state.visible} onCloseDrawer={this.onCloseDrawer} />
      </div>
    );
  }
}

export default MobileHeader;
