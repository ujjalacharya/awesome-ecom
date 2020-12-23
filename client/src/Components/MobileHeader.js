import React, { Component } from "react";
import MenuDrawer from "./Includes/MenuDrawer";
import { connect } from "react-redux";
import actions from "../../redux/actions";
import { withRouter } from "next/router";
import { getChildCategories, getUserInfo } from "../../utils/common";
import Link from "next/link";
import SearchDrawer from "./Includes/SearchDrawer";

class MobileHeader extends Component {
  state = { visible: false, searchvisible: false, loginToken: this.props.authentication.token || '' };

  componentWillReceiveProps(nextProps) {
    if (this.props.authentication.token !== nextProps.authentication.token) {
      let userInfo = [];
      if (nextProps.authentication.token) {
        userInfo = getUserInfo(this.state.loginToken);
      }
      this.setState({
        loginToken: nextProps.authentication.token,
        userInfo,
      });
    }

    if (
      this.props.menu.menuCategories !== nextProps.menu.menuCategories &&
      nextProps.menu.menuCategories
    ) {
      let parentCategory = [];

      let parentCate = [];
      let {
        menuCategories: { categories },
      } = nextProps.menu;
      categories.map((cate) => {
        if (cate.parent === undefined) {
          parentCategory.push(cate);
        }
      });

      let allCates = getChildCategories(categories, parentCategory);

      allCates.map((newChild) => {
        let newallCates = getChildCategories(categories, newChild.childCate);
        let parentCateEle = { ...newChild, childCate: newallCates };
        parentCate.push(parentCateEle);
      });

      this.setState({
        parentCate,
      });
    }
  }

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

  showSearchDrawer = () => {
    this.setState({
      searchvisible: true,
    });
  };

  onCloseSearchDrawer = () => {
    this.setState({
      searchvisible: false,
    });
  };

  render() {
    let { parentCate, loginToken } = this.state;

    return (
      <div className="mobile-header">
        <div className="menu-logo">
          <div className="burger-menu" onClick={this.showDrawer}>
            <i className="fa fa-bars" aria-hidden="true"></i>
          </div>
          <Link href="/">
            <a>
              <div className="logo">
                <img src="/images/logo.png" />
              </div>
            </a>
          </Link>
        </div>
        <div className="mob-menu-items">
          <Link href="/myprofile/manageAccount">
            <a>
              <div className="menu-right-items">
                <div className="list-icon">
                  <img src="/images/user.png" />
                </div>
                <div className="list-text">
                  {loginToken ? "Profile" : "Login"}
                </div>
              </div>
            </a>
          </Link>
          {!loginToken &&
            <Link href="/register">
              <a>
                <div className="menu-right-items">
                  <div className="list-icon">
                    <img src="/images/user.png" />
                  </div>
                  <div className="list-text">
                    Register
                    </div>
                </div>
              </a>
            </Link>
          }
          <div className="menu-right-items">
            {
              loginToken ? (
                <Link href="/cart">
                  <a>
                    <div className="list-icon">
                      <img src="/images/bag.png" />
                    </div>
                    <div className="list-text">Cart</div>
                  </a>
                </Link>
              ) : <Link href={`/login?origin=${this.props.router.asPath}`}>
                  <a>
                    <div className="list-icon">
                      <img src="/images/bag.png" />
                    </div>
                    <div className="list-text">Cart</div>
                  </a>
                </Link>
            }
          </div>
          <div className="menu-right-items search-right" onClick={this.showSearchDrawer}>
            <div className="list-icon">
              <img src="/images/search-icon.png" />
            </div>
            <a>
              <div className="list-text">Search</div>
            </a>
          </div>
          {/* <div className="search-mob">
            <i className="fa fa-search" aria-hidden="true"></i>
          </div> */}
        </div>
        <MenuDrawer
          showDrawer={this.state.visible}
          onCloseDrawer={this.onCloseDrawer}
          parentCate={parentCate}
        />
        <SearchDrawer
          showDrawer={this.state.searchvisible}
          onCloseDrawer={this.onCloseSearchDrawer}
        />
      </div>
    );
  }
}

export default connect((state) => state, actions)(withRouter(MobileHeader));
