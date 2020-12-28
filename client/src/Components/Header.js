import React, { Component } from "react";
import { Row, Col, Input } from "antd";
import { connect } from "react-redux";

import { getChildCategories, getUserInfo } from "../../utils/common";
import Link from "next/link";
import actions from "../../redux/actions";
import Router, { withRouter } from "next/router";
import { AutoComplete } from "antd";
import { debounce, isEmpty } from "lodash";
class Header extends Component {
  state = {
    search: "",
    parentCate: [],
    loginToken: "",
    userInfo: {},
    searchOptions: [],
    searchValue: "",
    currentMenu: {},
    allCategories: [],
    currentChildCate: [],
    currentChildChildCate: []
  };

  componentDidMount() {
    this.props.productCategories();

    let loginToken = this.props.authentication.token;
    let userInfo = getUserInfo(loginToken);

    let slug = this.props.router.asPath?.split("/")[1];

    if (slug === "search") {
      this.setState({
        searchValue: this.props.router.query.slug,
      });
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
        allCategories: categories
      });
    }
  }

  componentDidUpdate(prevProps) {
    let {
      listing: { getSearchKeywords },
    } = this.props;

    if (
      getSearchKeywords !== prevProps.listing.getSearchKeywords &&
      getSearchKeywords
    ) {
      let searchOpts = [];
      getSearchKeywords.map((opt) => {
        let ele = { value: opt };
        searchOpts.push(ele);
      });

      this.setState({
        searchOptions: searchOpts,
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.searchSelectedProduct(this.state.searchValue);
  };

  searchProducts = (e, slug, cateId) => {
    e.stopPropagation();
    Router.push("/category/[slug]/[cate]", `/category/${slug}/${cateId}`);
  };

  selectKeyword = (keyword) => {
    this.searchSelectedProduct(keyword)
  }

  searchSelectedProduct = debounce((keyword) => {
    Router.push("/search/[slug]", "/search/" + keyword);
    this.setState({ searchValue: keyword });
  }, 1000)

  getSearchKeywordsDeb = (search) => {
    this.setState({ searchValue: search });
    this.debouceSearchKeywords(search)
  }

  debouceSearchKeywords = debounce((keyword) => {
    this.props.getSearchKeywords(keyword);
  }, 500)

  getCurrentChildCates = (cate) => {
    this.setState({ currentMenu: cate, currentChildCate: cate.childCate, currentChildChildCate: [] })
  }

  getCurrentChildChildCates = (cate) => {
    this.setState({ currentChildChildCate: cate.childCate, currentActiveChildId: cate._id })
  }

  render() {
    let { parentCate, loginToken, userInfo } = this.state;

    return (
      <div className="main-header">
        <Row style={{ padding: '20px 30px' }}>
          <Col lg={14} sm={10}>
            <Row className="menu-logo">
              <Col span={2} className="logo">
                <Link href="/">
                  <a>
                    <img src="/images/logo.png" />
                  </a>
                </Link>
              </Col>
              <Col span={22} className="menu">
                {/* <div className="menu-list alldepart">
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

                </div> */}

              </Col>
            </Row>
          </Col>
          <Col lg={6} sm={9} className="search">
            <form onSubmit={this.handleSubmit}>
              <AutoComplete
                value={this.state.searchValue}
                options={this.state.searchOptions}
                // style={{
                //   width: 400,
                // }}
                className="auto-search"
                onSelect={(select) => {
                  this.selectKeyword(select)
                }}
                onSearch={(search) => {
                  this.getSearchKeywordsDeb(search)
                }}
              // placeholder="Search for products, brands and more"
              >
                <Input.Search size="large" placeholder="Search for products, brands and more"
                />
              </AutoComplete>
              {/* <img src="/images/search-icon.png" /> */}
            </form>
          </Col>
          <Col lg={4} sm={5} className="menu-right">
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
            {/* <div className="menu-right-items">
              <div className="list-icon">
                <img src="/images/wishlist.png" />
              </div>
              <div className="list-text">Wishlist</div>
            </div> */}
            <div className="menu-right-items">
              <div className="list-icon">
                <img src="/images/bag.png" />
              </div>
              {
                loginToken ? (
                  <Link href="/cart">
                    <a>
                      <div className="list-text">Cart</div>
                    </a>
                  </Link>
                ) : <Link href={`/login?origin=${this.props.router.asPath}`}>
                    <a>
                      <div className="list-text">Cart</div>
                    </a>
                  </Link>
              }
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
        <div className="all-menu">
          <div className="sub-menu-header">
            <div className="parent-cate" onMouseOver={() => this.setState({ currentChildCate: [] })}>Home</div>
            {
              parentCate.map((cate, i) => {
                return (
                  <div
                    className={"parent-cate "}
                    key={i}
                    onMouseOver={() => {
                      this.getCurrentChildCates(cate);
                      this.setState({
                        currentActiveChildId: ''
                      })
                    }}
                  >
                    {cate.displayName}
                  </div>
                )
              })
            }
          </div>
          {
            !isEmpty(this.state.currentChildCate) &&
            // <div>
            <Row className="child-cates-cover">
              <Col 
                lg={7} 
                className={`${!isEmpty(this.state.currentChildChildCate) && 'child-cates-col'}`}
              >
                <div>
                  {
                    this.state.currentChildCate?.map((cate, i) => {
                      return (
                        <div
                          className={"child-cate " + (cate._id === this.state.currentActiveChildId ? 'active' : '')}
                          key={i}
                          onMouseOver={() => this.getCurrentChildChildCates(cate)}
                        >
                          {">"} <span>{cate.displayName}</span>
                        </div>
                      )
                    })
                  }
                </div>
              </Col>
              <Col 
                lg={7} 
                className={`${!isEmpty(this.state.currentChildChildCate) && 'child-child-cates-col'}`}
              >
                <div>
                  {
                    this.state.currentChildChildCate?.map((cate, i) => {
                      return (
                        <div
                          className={"child-cate " + (cate._id === this.state.currentActiveChildChildId ? 'active' : '')}
                          onMouseOut={() => this.setState({ currentActiveChildChildId: '' })}
                          onMouseOver={() => this.setState({ currentActiveChildChildId: cate._id })}
                          key={i}
                        >
                          {">"} <span>{cate.displayName}</span>
                        </div>
                      )
                    })
                  }
                </div>
              </Col>
              <Col lg={10} style={{ textAlign: 'right' }}>
                <div><img src="/images/elect-imag.jpg" /></div>
              </Col>
            </Row>

            // </div>
          }
        </div>
      </div>
    );
  }
}

export default connect((state) => state, actions)(withRouter(Header));
