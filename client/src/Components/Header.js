import React, { Component } from "react";
import { Row, Col, Input } from "antd";
import { connect } from "react-redux";

import { getChildCategories, getUserInfo } from "../../utils/common";
import Link from "next/link";
import actions from "../../redux/actions";
import initialize from "../../utils/initialize";
import Router from "next/router";
import cookie from "js-cookie";
import next from "next";

class Header extends Component {
  state = {
    search: "",
    parentCate: [],
    loginToken: "",
    userInfo: {},
  };

  componentDidMount() {
    this.props.productCategories();

    let loginToken = this.props.authentication.token;
    let userInfo = getUserInfo(loginToken);

    this.setState({
      loginToken,
      userInfo,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.authentication.token !== nextProps.authentication.token) {
      let userInfo = [];
      if (nextProps.authentication.token) {
        userInfo = getUserInfo(loginToken);
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
      let { menuCategories } = nextProps.menu
      menuCategories.map((cate) => {
        if (cate.parent === undefined) {
          parentCategory.push(cate);
        }
      });

      let allCates = getChildCategories(menuCategories, parentCategory);

      allCates.map((newChild) => {
        let newallCates = getChildCategories(menuCategories, newChild.childCate);
        let parentCateEle = { ...newChild, childCate: newallCates };
        parentCate.push(parentCateEle);
      });

      this.setState({
        parentCate
      })
    }
  }

  static getInitialProps(ctx) {
    initialize(ctx);
  }

  handleSubmit = (e) => {
    e.preventDefault();

    Router.push("/search/[slug]", "/search/" + this.state.search);
  };

  searchProducts = (e, slug, cateId) => {
    e.stopPropagation();
    Router.push("/category/[slug]/[cate]", `/category/${slug}/${cateId}`);
  };

  render() {
    let { parentCate, loginToken, userInfo } = this.state;
    return (
      <div className="main-header">
        <Row>
          <Col lg={14} md={13}>
            <Row className="menu-logo">
              <Col span={2} className="logo">
                <Link href="/">
                  <img src="/images/logo.png" />
                </Link>
              </Col>
              <Col span={22} className="menu">
                <div className="menu-list alldepart">
                  <div className="title">ALL CATEGORIES</div>
                  <ul className="category">
                    {parentCate.map((cate, i) => {
                      return (
                        <li key={i}>
                          <div className="title">
                            <span>{cate.displayName}</span>
                            <span className="title-icon">
                              {cate.childCate.length > 0 && (
                                <i
                                  className="fa fa-angle-right"
                                  aria-hidden="true"
                                ></i>
                              )}
                            </span>
                          </div>
                          {cate.childCate.length > 0 && (
                            <ul className="sub-category">
                              {cate.childCate.map((subCate, i) => {
                                return (
                                  <li
                                    key={i}
                                    onClick={(e) =>
                                      this.searchProducts(
                                        e,
                                        subCate.slug,
                                        subCate._id
                                      )
                                    }
                                  >
                                    <div className="title">
                                      <span>{subCate.displayName}</span>
                                      <span className="sub-title-icon">
                                        {subCate.childCate.length > 0 && (
                                          <i
                                            className="fa fa-angle-right"
                                            aria-hidden="true"
                                          ></i>
                                        )}
                                      </span>
                                    </div>
                                    {subCate.childCate.length > 0 && (
                                      <ul className="sub-category next-sub">
                                        {subCate.childCate.map(
                                          (newSubCate, i) => {
                                            return (
                                              <li
                                                key={i}
                                                onClick={(e) =>
                                                  this.searchProducts(
                                                    e,
                                                    newSubCate.slug,
                                                    newSubCate._id
                                                  )
                                                }
                                              >
                                                <div className="title">
                                                  <span>
                                                    {newSubCate.displayName}
                                                  </span>
                                                </div>
                                              </li>
                                            );
                                          }
                                        )}
                                      </ul>
                                    )}
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                {/* <div className="menu-list">MEN</div>
                <div className="menu-list">WOMEN</div>
                <div className="menu-list">KIDS</div>
                <div className="menu-list">HOME & LIVING</div>
                <div className="menu-list">ESSENTIALS</div> */}
              </Col>
            </Row>
          </Col>
          <Col lg={6} md={6} className="search">
            <form onSubmit={this.handleSubmit}>
              {/* <Link
              href={`/search?[slug]`}
              key={this.state.search}
              as={`/search?${this.state.search}`}
            > */}
              <Input
                placeholder="Search for products, brands and more"
                onChange={(e) => this.setState({ search: e.target.value })}
              />
              {/* </Link> */}
            </form>
          </Col>
          <Col lg={4} md={5} className="menu-right">
            <Link href="/myprofile">
              <div className="menu-right-items">
                <div className="list-icon">
                  <img src="/images/user.png" />
                </div>
                <div className="list-text">
                  {loginToken ? "Profile" : "Login"}
                </div>
              </div>
            </Link>
            <div className="menu-right-items">
              <div className="list-icon">
                <img src="/images/wishlist.png" />
              </div>
              <div className="list-text">Wishlist</div>
            </div>
            <div className="menu-right-items">
              <div className="list-icon">
                <img src="/images/bag.png" />
              </div>
              <div className="list-text">Bag</div>
            </div>
            {loginToken && (
              <div
                className="menu-right-items"
                onClick={() => this.props.deauthenticate()}
              >
                <div className="list-icon">
                  <img src="/images/user.png" />
                </div>
                <div className="list-text">Logout</div>
              </div>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect((state) => state, actions)(Header);
