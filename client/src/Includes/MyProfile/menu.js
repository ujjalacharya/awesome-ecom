import React, { Component } from "react";

class Menu extends Component {
  render() {
    return (
      <div className="profile-menu">
        <ul>
          <li className={this.props.currentMenu === 'manage-account' ? 'active' : ''} onClick={() => this.props.changeMenuTab('manage-account')} >Manage My Account</li>
          <li className={this.props.currentMenu === 'my-orders' ? 'active' : ''} onClick={() => this.props.changeMenuTab('my-orders')}>My Orders</li>
          <li className={this.props.currentMenu === 'my-reviews' ? 'active' : ''} onClick={() => this.props.changeMenuTab('my-reviews')}>My Reviews</li>
          <li className={this.props.currentMenu === 'my-whishlist' ? 'active' : ''} onClick={() => this.props.changeMenuTab('my-whishlist')}>My Wishlist</li>
          {/* <li className={this.props.currentMenu === 'sell-on-daraz' ? 'active' : ''} onClick={() => this.props.changeMenuTab('sell-on-daraz')}>Sell on our site</li> */}
        </ul>
      </div>
    );
  }
}

export default Menu;
