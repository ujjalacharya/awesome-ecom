import React, { Component } from "react";
import { Select, Row, Col } from "antd";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import _ from "lodash";

//includes
import ProductCard from "../../Components/Includes/ProductCard";
import { getBrandOptions, getColorOptions } from "../../../utils/common";
import { connect } from "react-redux";
import actions from "../../../redux/actions";
import { withRouter } from "next/router";

// Select Option
const { Option } = Select;

class ProductList extends Component {
  state = {
    min_price: "",
    max_price: "",
    sortBy: 'ace'
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.currentFilter.max_price !== prevState.max_price ||
      nextProps.currentFilter.min_price !== prevState.min_price
    ) {
      let max_price = "";
      let min_price = "";

      max_price = nextProps.currentFilter.max_price;
      min_price = nextProps.currentFilter.min_price;

      return {
        max_price,
        min_price,
      };
    }

    return null;
  }


  componentDidUpdate(prevProps) {
    let { cate, slug } = this.props.router.query
    if (
      this.props.cart.addToCartResp !== prevProps.cart.addToCartResp &&
      this.props.cart.addToCartResp
    ) {
      this.props.getProductsByCategory(`?page=1&perPage=10&cat_id=${cate}&cat_slug=${slug}`);
    }

    if (
      this.props.wishlist.wishlistItemsResp !==
      prevProps.wishlist.wishlistItemsResp &&
      this.props.wishlist.wishlistItemsResp
    ) {
      this.props.getProductsByCategory(`?page=1&perPage=10&cat_id=${cate}&cat_slug=${slug}`);
    }

    if (
      this.props.wishlist.removeFromWishlistResp !==
      prevProps.wishlist.removeFromWishlistResp &&
      this.props.wishlist.removeFromWishlistResp
    ) {
      this.props.getProductsByCategory(`?page=1&perPage=10&cat_id=${cate}&cat_slug=${slug}`);
    }

    if (
      this.props.cart.removeFromCartResp !==
      prevProps.cart.removeFromCartResp &&
      this.props.cart.removeFromCartResp
    ) {
      this.props.getProductsByCategory(`?page=1&perPage=10&cat_id=${cate}&cat_slug=${slug}`);
    }
  }

  render() {
    const { data, searchFilter, currentFilter } = this.props;
    let brandOptions = getBrandOptions(searchFilter);

    return (
      <div className="product-lists">
        <div className="sorting-page">
          <div className="view-sort">
            <div className="type-icon">
              <AppstoreOutlined className="list-icon" />
              {/* <BarsOutlined className="list-icon" /> */}
            </div>
            <Select
              style={{ width: 200 }}
              placeholder="SORT BY"
              className="sortyBy-select"
              onChange={(val) => this.props.sortProducts(val)}
              defaultValue="asc"
            >
              <Option value="asc">Ascending</Option>
              <Option value="desc">Descending</Option>
            </Select>
          </div>
          <div className="page-status">
            Page {this.props.currentPage} of{" "}
            {Math.ceil(data && data.totalCount / this.props.perPage)}
          </div>
        </div>
        {!_.isEmpty(currentFilter) && _.size(currentFilter) > 1 && this.props.filterApplied && (
          <div className="filtered-by">
            <span className="title">Filtered By:</span>
            {currentFilter.brands &&
              currentFilter.brands.length > 0 &&
              currentFilter.brands.map((brand, i) => {
                return (
                  <>
                    {brandOptions.map((allBrand) => {
                      return (
                        <>
                          {brand === allBrand.value && (
                            <span
                              className="filter-tags"
                              onClick={() => this.props.removeBrand(brand)}
                              key={i}
                            >
                              Brand: {allBrand.label}
                              <i className="fa fa-times" aria-hidden="true"></i>
                            </span>
                          )}
                        </>
                      );
                    })}
                  </>
                );
              })}

            {currentFilter.colors &&
              currentFilter.colors.length > 0 &&
              currentFilter.colors.map((color, i) => {
                return (
                  <span
                    className="filter-tags"
                    onClick={() => this.props.removeColor(color)}
                    key={i}
                  >
                    Color: {color}
                    <i className="fa fa-times" aria-hidden="true"></i>
                  </span>
                );
              })}

            {currentFilter.ratings && (
              <span
                className="filter-tags"
                onClick={() => this.props.removeRating(currentFilter.ratings)}
              >
                Rating: {currentFilter.ratings} And Up
                <i className="fa fa-times" aria-hidden="true"></i>
              </span>
            )}

            {(this.state.max_price || this.state.min_price) && (
              <span
                className="filter-tags"
                onClick={() =>
                  this.props.removePrice(
                    this.state.min_price,
                    this.state.max_price
                  )
                }
              >
                Price: {this.state.min_price}{" "}
                {this.state.min_price && this.state.max_price && "-"}{" "}
                {this.state.max_price}
                <i className="fa fa-times" aria-hidden="true"></i>
              </span>
            )}


            {!_.isEmpty(currentFilter.warranties) &&
              currentFilter.warranties.map((warenty, i) => {
                return (
                  <span
                    className="filter-tags"
                    onClick={() => this.props.removeWarrenty(warenty)}
                    key={i}
                  >
                    Warrenty: {warenty}
                    <i className="fa fa-times" aria-hidden="true"></i>
                  </span>
                );
              })}

            {!_.isEmpty(currentFilter.sizes) && (
              <span
                className="filter-tags"
                onClick={() => this.props.removeSize()}
              >
                Size: {currentFilter.sizes}
                <i className="fa fa-times" aria-hidden="true"></i>
              </span>
            )}
          </div>
        )}
        <div className="card-list">
          {
            data && data.products.length > 0 ?
              (<Row gutter={30}>
                {data.products.map((data, i) => {
                  return (
                    <Col lg={6} sm={12} xs={24} key={i}>
                      <ProductCard data={data} />
                    </Col>
                  );
                })}
              </Row>)
              : "No Products Available"}

        </div>
      </div>
    );
  }
}

export default connect((state) => state, actions)(withRouter(ProductList));
