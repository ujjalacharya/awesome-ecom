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
        <div className="top-header">
          <div>
            Customer Care: +9779856321452
          </div>
          <div>
            <ul>
              <li>Sell On Kindeem</li>
              <li>About Us</li>
              <li>
                <Link href="/myprofile/manageAccount">
                  <a>
                    {loginToken ? "Profile" : "Login"}
                  </a>
                </Link>
              </li>
              <li>
                {!loginToken &&
                  <Link href="/register">
                    <a>
                      Register
                    </a>
                  </Link>
                }
              </li>
            </ul>
          </div>
        </div>
        <Row style={{ padding: '20px 60px' }}>
          <Col lg={20} sm={20}>
            <Row className="menu-logo">
              <Col span={4} className="logo">
                <Link href="/">
                  <a>
                    <img src="/images/logo.png" />
                  </a>
                </Link>
              </Col>
              <Col span={20} className="search">
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
            </Row>
          </Col>
          <Col lg={4} sm={4} className="menu-right">
            <div className="menu-right-items">
              <div className="list-icon">
                <img src="/images/heart.png" />
              </div>
              <div className="list-text">Wishlist</div>
            </div>
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
            <div className="child-cates-cover">
              <Row className="child-cates-row" style={{ background: '#fff' }}>
                <Col
                  lg={7}
                  sm={7}
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
                            onClick={(e) =>
                              this.searchProducts(
                                e,
                                cate.slug,
                                cate._id
                              )
                            }
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
                  sm={7}
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
                            onClick={(e) =>
                              this.searchProducts(
                                e,
                                cate.slug,
                                cate._id
                              )
                            }
                          >
                            {">"} <span>{cate.displayName}</span>
                          </div>
                        )
                      })
                    }
                  </div>
                </Col>
                <Col lg={10} sm={10} style={{ textAlign: 'right' }}>
                  <div><img src="/images/elect-imag.jpg" /></div>
                </Col>
              </Row>

            </div>
          }
        </div>
      </div>
    );
  }
}

export default connect((state) => state, actions)(withRouter(Header));
