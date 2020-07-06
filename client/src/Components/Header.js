import React, { Component } from "react";
import { Row, Col, Input } from "antd";
import { connect } from "react-redux";

import { getChildCategories, getUserInfo } from "../../utils/common";
import Link from "next/link";
import actions from "../../redux/actions";
import Router, { withRouter } from "next/router";
import { AutoComplete } from "antd";

class Header extends Component {
  state = {
    search: "",
    parentCate: [],
    loginToken: "",
    userInfo: {},
    searchOptions: [],
    searchValue: ''
  };

  componentDidMount() {

    this.props.productCategories();

    let loginToken = this.props.authentication.token;
    let userInfo = getUserInfo(loginToken);

    let slug = this.props.router.asPath?.split('/')[1]

    if(slug === 'search'){
      this.setState({
        searchValue: this.props.router.query.slug
      })
    }

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

  componentDidUpdate(prevProps) {

    let { listing: {getSearchKeywords} } = this.props

    if (getSearchKeywords !== prevProps.listing.getSearchKeywords && getSearchKeywords) {
      let searchOpts = []
      getSearchKeywords.map(opt => {
        let ele = {value: opt}
        searchOpts.push(ele)
      })

      this.setState({
        searchOptions: searchOpts
      })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
    Router.push("/search/[slug]", "/search/" + this.state.searchValue);
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
              <AutoComplete
                value={this.state.searchValue}
                options={this.state.searchOptions}
                style={{
                  width: 200,
                }}
                onSelect={(select) => {Router.push("/search/[slug]", "/search/" + select); this.setState({searchValue: select})}}
                onSearch={(search) => {
                  this.props.getSearchKeywords(search);
                  this.setState({ searchValue: search });
                }}
                placeholder="Search for products, brands and more"
              />
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

export default connect((state) => state, actions)(withRouter(Header));
