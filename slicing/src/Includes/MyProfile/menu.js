import React, { Component } from "react";

class Menu extends Component {
  render() {
    return (
      <div className="profile-menu">
        <ul>
          <li onClick={() => this.props.changeMenuTab('manage-account')}>Manage My Account</li>
          <li onClick={() => this.props.changeMenuTab('my-orders')}>My Orders</li>
          <li onClick={() => this.props.changeMenuTab('my-reviews')}>My Reviews</li>
          <li onClick={() => this.props.changeMenuTab('my-whishlist')}>My Wishlist</li>
          <li onClick={() => this.props.changeMenuTab('sell-on-daraz')}>Sell on Daraz</li>
        </ul>
      </div>
    );
  }
}

export default Menu;
