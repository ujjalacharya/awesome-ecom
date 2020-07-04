import React, { Component } from "react";
import { Select, Row, Col } from "antd";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import _ from "lodash";

//includes
import ProductCard from "../../Components/Includes/ProductCard";
import { getBrandOptions, getColorOptions } from "../../../utils/common";

// Select Option
const { Option } = Select;

class ProductList extends Component {
  state = {
    min_price: "",
    max_price: "",
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    let max_price = "";
    let min_price = "";
    if (nextProps.currentFilter.max_price !== prevState.max_price) {
      max_price = nextProps.currentFilter.max_price;
    }
    if (nextProps.currentFilter.min_price !== prevState.min_price) {
      min_price = nextProps.currentFilter.min_price;
    }
    return {
      max_price,
      min_price
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
              <BarsOutlined className="list-icon" />
            </div>
            <Select
              style={{ width: 200 }}
              placeholder="SORT BY"
              className="sortyBy-select"
            >
              <Option value="ascending">Ascending</Option>
              <Option value="descending">Descending</Option>
            </Select>
          </div>
          <div className="page-status">
            Page {this.props.currentPage} of{" "}
            {Math.ceil(data && data.totalCount / this.props.perPage)}
          </div>
        </div>
        <div className="filtered-by">
          <span className="title">Filtered By:</span>
          {!_.isEmpty(currentFilter) &&
            currentFilter.brands &&
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

          {!_.isEmpty(currentFilter) &&
            currentFilter.colors &&
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

          {!_.isEmpty(currentFilter) && currentFilter.ratings && (
            <span
              className="filter-tags"
              onClick={() => this.props.removeRating(currentFilter.ratings)}
            >
              Rating: {currentFilter.ratings}
              <i className="fa fa-times" aria-hidden="true"></i>
            </span>
          )}

          {!_.isEmpty(currentFilter) &&
            (this.state.max_price || this.state.min_price) && (
              <span
                className="filter-tags"
                onClick={() =>
                  this.props.removePrice(
                    this.state.min_price,
                    this.state.max_price
                  )
                }
              >
                Price: {this.state.min_price} - {this.state.max_price}
                <i className="fa fa-times" aria-hidden="true"></i>
              </span>
            )}
        </div>
        <div className="card-list">
          <Row gutter={30}>
            {data && data.products
              ? data.products.map((data, i) => {
                  return (
                    <Col lg={6} sm={12} xs={24} key={i}>
                      <ProductCard data={data} />
                    </Col>
                  );
                })
              : "No Products Available"}
          </Row>
        </div>
      </div>
    );
  }
}

export default ProductList;
