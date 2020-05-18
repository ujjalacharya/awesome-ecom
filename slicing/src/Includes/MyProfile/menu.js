import React, { Component } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

class Menu extends Component {
  render() {
    return (
      <div className="profile-menu">
        <Header />
        <div className="container">
          <ul>
            <li>Manage My Account</li>
            <li>My Orders</li>
            <li>My Reviews</li>
            <li>My Wishlist</li>
            <li>Sell on Daraz</li>
          </ul>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Menu;
