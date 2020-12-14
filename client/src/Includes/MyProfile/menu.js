import Link from "next/link";
import { withRouter } from "next/router";
import React, { Component } from "react";

class Menu extends Component {
  render() {
    let { pathname } = this.props.router
    let currentTab = pathname.split('/').pop()
    
    return (
      <div className="profile-menu">
        <ul>
          <li
            className={currentTab === 'manageAccount' ? 'active' : ''}
          >
            <Link href="/myprofile/manageAccount">
              <a>Manage My Account</a>
            </Link>
          </li>
          <li
            className={currentTab === 'myOrders' ? 'active' : ''}
          >
            <Link href="/myprofile/myOrders">
              <a>My Orders</a>
            </Link>
          </li>
          <li
            className={currentTab === 'myReviews' ? 'active' : ''}
          >
            <Link href="/myprofile/myReviews">
              <a>
                My Reviews
              </a>
            </Link>
          </li>
          <li
            className={currentTab === 'myWishlist' ? 'active' : ''}
          >
            <Link href="/myprofile/myWishlist">
              <a>
                My Wishlist
              </a>
            </Link>
          </li>
          {/* <li className={currentTab === 'sell-on-daraz' ? 'active' : ''} onClick={() => this.props.changeMenuTab('sell-on-daraz')}>Sell on our site</li> */}
        </ul>
      </div>
    );
  }
}

export default withRouter(Menu);
