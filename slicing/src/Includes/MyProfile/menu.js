import React, { Component } from "react";

class Menu extends Component {
  render() {
    return (
      <div className="profile-menu">
        <ul>
          <li>Manage My Account</li>
          <li>My Orders</li>
          <li>My Reviews</li>
          <li>My Wishlist</li>
          <li>Sell on Daraz</li>
        </ul>
      </div>
    );
  }
}

export default Menu;
