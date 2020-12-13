import Link from "next/link";
import React, { Component } from "react";

class Menu extends Component {
  render() {
    return (
      <div className="profile-menu">
        <ul>
          <li
            className={this.props.currentMenu === 'manage-account' ? 'active' : ''}
          >
            <Link href="/myprofile/manageAccount">
              <a>Manage My Account</a>
            </Link>
          </li>
          <li
            className={this.props.currentMenu === 'my-orders' ? 'active' : ''}
          >
            <Link href="/myprofile/myOrders">
              <a>My Orders</a>
            </Link>
          </li>
          <li
            className={this.props.currentMenu === 'my-reviews' ? 'active' : ''}
          >
            <Link href="/myprofile/myReviews">
              <a>
                My Reviews
              </a>
            </Link>
          </li>
          <li
            className={this.props.currentMenu === 'my-whishlist' ? 'active' : ''}
          >
            <Link href="/myprofile/myWishlist">
              <a>
                My Wishlist
              </a>
            </Link>
          </li>
          {/* <li className={this.props.currentMenu === 'sell-on-daraz' ? 'active' : ''} onClick={() => this.props.changeMenuTab('sell-on-daraz')}>Sell on our site</li> */}
        </ul>
      </div>
    );
  }
}

export default Menu;
