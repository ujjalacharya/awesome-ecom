import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Pagination, Drawer } from "antd";
import _ from "lodash";

// includes
import ProductList from "../src/Includes/Listing/ProductList";
import Filter from "../src/Includes/Listing/Filter";
import actions from "../redux/actions";
import { withRouter } from "next/router";
import { getFilterAppendBody } from "../utils/common";
import SortBy from "../src/Includes/Listing/SortBy";

class Listing extends Component {
  state = {
    visibleFilter: false,
    visibleSort: false,
    sortName: "",
    checkedBrands: [],
    currentPage: 1,
    checkedColors: [],
    filterBody: {},
    minPrice: "",
    maxPrice: "",
    selectedWarrenty: "",
    filterApplied: false,
    currentRating: 0
  };

  static getInitialProps(ctx) {
    initialize(ctx);
  }

  componentDidUpdate(prevprops) {
    if (this.props.router.asPath !== prevprops.router.asPath) {
      this.setState({
        filterBody: {}, filterApplied: false,
        currentRating: 0
      })
    }
  }

  showDrawerFiter = () => {
    this.setState({
      visibleFilter: true,
    });
  };

  showDrawerSort = () => {
    this.setState({
      visibleSort: true,
    });
  };

  onCloseFilter = () => {
    this.setState({
      visibleFilter: false,
    });
  };

  // onCheckBrands = (checkedValues) => {
  //   this.setState({
  //     checkedBrands: checkedValues,
  //   });
  // };

  onCloseSort = (sortTitle) => {
    this.setState({
      visibleSort: false,
    });
    if (sortTitle.target === undefined) {
      this.setState({
        sortName: sortTitle,
      });
    }
  };

  onChangePage = (page) => {
    this.setState({
      currentPage: page,
    });
    // let body = {
    //   keyword: this.props.router.query.slug,
    // };
    this.props.searchProducts(
      `?page=${page}&perPage=${this.props.perPage}`,
      this.state.filterBody
    );
  };

  onCheckBrands = (brands) => {
    this.setState({
      checkedBrands: brands,
    });

    let body = {};

    body = getFilterAppendBody(
      this.state.filterBody,
      this.props,
      brands,
      "brands"
    );

    this.setState({
      filterBody: body,
    });

    if (!this.state.visibleFilter) {
      this.props.searchProducts(
        `?page=${this.state.currentPage}&perPage=${this.props.perPage}`,
        body
      );
      this.setState({ filterApplied: true })
    }
  };

  onChangeColors = (colors) => {
    this.setState({
      checkedColors: colors,
    });

    let body = {};

    body = getFilterAppendBody(
      this.state.filterBody,
      this.props,
      colors,
      "colors"
    );

    this.setState({
      filterBody: body,
    });

    if (!this.state.visibleFilter) {
      this.props.searchProducts(
        `?page=${this.state.currentPage}&perPage=${this.props.perPage}`,
        body
      );
      this.setState({ filterApplied: true })
    }
  };

  onHandleRatings = (rating) => {
    this.setState({
      currentRating: rating,
    });

    let body = {};

    body = getFilterAppendBody(
      this.state.filterBody,
      this.props,
      rating + "",
      "ratings"
    );

    this.setState({
      filterBody: body,
    });

    if (!this.state.visibleFilter) {
      this.props.searchProducts(
        `?page=${this.state.currentPage}&perPage=${this.props.perPage}`,
        body
      );
      this.setState({ filterApplied: true })
    }
  };

  changePrice = (price, type) => {
    if (type === "min") {
      this.setState({
        minPrice: price,
      });

      // if (this.state.visibleFilter) {
      //   let body = {};
      //   body = getFilterAppendBody(
      //     this.state.filterBody,
      //     this.props,
      //     price + "",
      //     "min_price"
      //   );
      //   this.setState({
      //     filterBody: body,
      //   });
      // }
    } else {
      this.setState({
        maxPrice: price,
      });

      // if (this.state.visibleFilter) {
      //   let body = {};
      //   body = getFilterAppendBody(body, this.props, price + "", "max_price");
      //   this.setState({
      //     filterBody: body,
      //   });
      // }
    }
  };

  searchPrice = (minPrice, maxPrice) => {
    let body = {};

    body = getFilterAppendBody(
      this.state.filterBody,
      this.props,
      minPrice + "",
      "min_price"
    );

    body = getFilterAppendBody(body, this.props, maxPrice + "", "max_price");

    this.setState({
      filterBody: body,
    });

    if (!this.state.visibleFilter) {
      this.props.searchProducts(
        `?page=${this.state.currentPage}&perPage=${this.props.perPage}`,
        body
      );
      this.setState({ filterApplied: true })
    }

  };

  onChangeWarrenty = (warrenty) => {
    this.setState({
      selectedWarrenty: warrenty,
    });

    let body = {};

    let warenty = warrenty === "" ? [] : [warrenty];

    body = getFilterAppendBody(
      this.state.filterBody,
      this.props,
      warenty,
      "warranties"
    );

    this.setState({
      filterBody: body,
    });

    if (!this.state.visibleFilter) {
      this.props.searchProducts(
        `?page=${this.state.currentPage}&perPage=${this.props.perPage}`,
        body
      );
      this.setState({ filterApplied: true })
    }
  };

  onChangeSize = (size) => {
    this.setState({
      selectedSize: size,
    });

    let body = {};

    body = getFilterAppendBody(
      this.state.filterBody,
      this.props,
      size,
      "sizes"
    );

    this.setState({
      filterBody: body,
    });

    if (!this.state.visibleFilter) {
      this.props.searchProducts(
        `?page=${this.state.currentPage}&perPage=${this.props.perPage}`,
        body
      );
      this.setState({ filterApplied: true })
    }
  };

  removeBrand = (brand) => {
    let allBrands = this.state.checkedBrands;
    let newBrands = allBrands.filter((obj) => {
      return obj !== brand;
    });

    this.onCheckBrands(newBrands);
  };

  removeColor = (color) => {
    let allColors = this.state.checkedColors;
    let newColors = allColors.filter((obj) => {
      return obj !== color;
    });

    this.onChangeColors(newColors);
  };

  removeRating = (rating) => {
    this.onHandleRatings("");
  };

  removePrice = () => {
    this.setState({
      minPrice: "",
      maxPrice: "",
    });
    this.searchPrice("", "");
  };

  removeWarrenty = () => {
    this.onChangeWarrenty("");
  };

  removeSize = () => {
    this.onChangeSize("");
  };

  applyFilter = async () => {
    this.setState({
      filterApplied: true
    })

    let newFilterBody = this.state.filterBody
    if (this.state.minPrice) {
      let body = {};
      newFilterBody = getFilterAppendBody(
        newFilterBody,
        this.props,
        this.state.minPrice + "",
        "min_price"
      );
      // this.setState({
      //   filterBody: body,
      // });
    }

    if (this.state.maxPrice) {
      let body = {};
      newFilterBody = getFilterAppendBody(newFilterBody, this.props, this.state.maxPrice + "", "max_price");
    }
    this.setState({
      filterBody: newFilterBody,
    });

    this.props.searchProducts(
      `?page=${this.state.currentPage}&perPage=${this.props.perPage}`,
      newFilterBody
    );
  }

  render() {
    return (
      <div className="wrapper">
        <section className="listing">
          <div className="container">
            <Row>
              <Col lg={4} xs={24} md={6} className="remove-filter">
                <Filter
                  removeThisFilter="noDisplayMobAndTab"
                  data={this.props.getSearchFilter}
                  onCheckBrands={this.onCheckBrands}
                  checkedBrands={this.state.checkedBrands}
                  onChangeColors={this.onChangeColors}
                  checkedColors={this.state.checkedColors}
                  onHandleRatings={this.onHandleRatings}
                  searchPrice={this.searchPrice}
                  changePrice={this.changePrice}
                  minPrice={this.state.minPrice}
                  maxPrice={this.state.maxPrice}
                  onChangeWarrenty={this.onChangeWarrenty}
                  selectedWarrenty={this.state.selectedWarrenty}
                  onChangeSize={this.onChangeSize}
                  selectedSize={this.state.selectedSize}
                  currentRating={this.state.currentRating}
                />
              </Col>
              <Col lg={20} xs={24} md={18} className="right-listing">
                <div className="products-title">All Products</div>
                <ProductList
                  data={this.props.data}
                  perPage={this.props.perPage}
                  currentPage={this.state.currentPage}
                  currentFilter={this.state.filterBody}
                  searchFilter={this.props.getSearchFilter}
                  removeBrand={this.removeBrand}
                  removeColor={this.removeColor}
                  removeRating={this.removeRating}
                  removePrice={this.removePrice}
                  removeWarrenty={this.removeWarrenty}
                  removeSize={this.removeSize}
                  filterApplied={this.state.filterApplied}
                />
                <div className="pagination">
                  <div className="page-status">
                    Page {this.state.currentPage} of{" "}
                    {Math.ceil(
                      this.props.data &&
                      this.props.data.totalCount / this.props.perPage
                    )}
                  </div>
                  <Pagination
                    defaultCurrent={1}
                    total={this.props.data && this.props.data.totalCount}
                    onChange={this.onChangePage}
                  />
                </div>
              </Col>
            </Row>
          </div>
          <div className="sticky-filter">
            <Row style={{ width: "100%" }}>
              <Col span={12}>
                <div className="filter-type" onClick={this.showDrawerSort}>
                  <i className="fa fa-sort" aria-hidden="true"></i>
                  {" "}<span>Sort By</span>
                </div>
              </Col>
              <Col span={12}>
                <div
                  className="filter-type removeBorder"
                  onClick={() => { this.showDrawerFiter(); }}
                >
                  <i className="fa fa-filter" aria-hidden="true"></i>
                  {" "}<span>Filter</span>
                </div>
              </Col>
            </Row>
          </div>
          <Drawer
            title="FILTER"
            placement="bottom"
            closable={true}
            onClose={this.onCloseFilter}
            visible={this.state.visibleFilter}
            className="showFilterDrawer"
            height="100vh"
          >
            <Filter
              removeThisFilter="displayMobAndTab"
              removeThisTitle="noDisplay"
              data={this.props.getSearchFilter}
              onCheckBrands={this.onCheckBrands}
              checkedBrands={this.state.checkedBrands}
              onChangeColors={this.onChangeColors}
              checkedColors={this.state.checkedColors}
              onHandleRatings={this.onHandleRatings}
              searchPrice={this.searchPrice}
              changePrice={this.changePrice}
              minPrice={this.state.minPrice}
              maxPrice={this.state.maxPrice}
              onChangeWarrenty={this.onChangeWarrenty}
              selectedWarrenty={this.state.selectedWarrenty}
              onChangeSize={this.onChangeSize}
              selectedSize={this.state.selectedSize}
              closeThisFilter={this.onCloseFilter}
              applyFilter={this.applyFilter}
              currentRating={this.state.currentRating}
            />
          </Drawer>
          <Drawer
            title="SORT BY"
            placement="bottom"
            closable={false}
            onClose={this.onCloseSort}
            visible={this.state.visibleSort}
            className="showSortDrawer"
            height="40vh"
          >
            <SortBy
              closeThisFilter={this.onCloseSort} />
          </Drawer>
        </section>
      </div>
    );
  }
}

export default connect((state) => state, actions)(withRouter(Listing));
