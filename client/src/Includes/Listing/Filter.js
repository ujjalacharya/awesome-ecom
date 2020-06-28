import React, { Component } from "react";
import { Checkbox } from "antd";
import { Icon, Row, Col } from "antd";

class Filter extends Component {
  onChange = (checkedValues) => {};

  render() {
    const { data } = this.props;
    let brandOptions = [];
    data.map((brand) => {
      let ele = { label: brand.brandName, value: brand.systemName };
      brandOptions.push(ele);
    });

    const priceOptions = [
      { label: "Rs. 179 to Rs. 1977", value: "179-1977" },
      { label: "Rs. 1977 to Rs. 3775", value: "1977-3775" },
      { label: "Rs. 3775 to Rs. 5179", value: "3775-5179" },
    ];

    const colorOptions = [
      { label: "Black", value: "black" },
      { label: "Blue", value: "blue" },
      { label: "Red", value: "red" },
      { label: "Orange", value: "orange" },
    ];

    return (
      <div className={"listing-filter " + this.props.removeThisFilter}>
        <div className={"filter-title " + this.props.removeThisTitle}>
          <span>FILTERS</span>
          {/* <Icon type="close" className="close"/> */}
        </div>
        <div className="filter-types">
          <div className="type-title">BRAND</div>
          <div className="type-list">
            <Checkbox.Group options={brandOptions} onChange={this.onChange} />
          </div>
        </div>
        <div className="filter-types">
          <div className="type-title">Price</div>
          <div className="type-list">
            <Checkbox.Group options={priceOptions} onChange={this.onChange} />
          </div>
        </div>
        <div className="filter-types last-child-fi-type">
          <div className="type-title">Color</div>
          <div className="type-list">
            <Checkbox.Group options={colorOptions} onChange={this.onChange} />
          </div>
        </div>
        <div className="sticky-filter inside-filter-sticky">
          <Row style={{ width: "100%" }}>
            <Col span={12}>
              <div className="filter-type" onClick={this.props.closeThisFilter}>
                <span>CLOSE</span>
              </div>
            </Col>
            <Col span={12}>
              <div className="filter-type apply-type removeBorder">
                <span>APPLY</span>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Filter;
