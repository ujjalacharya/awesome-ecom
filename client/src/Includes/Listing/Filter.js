import React, { Component } from "react";
import { Checkbox, Input } from "antd";
import { Icon, Row, Col } from "antd";

class Filter extends Component {
  state = {
    checkedBrands: []
  }

  render() {
    const { data } = this.props;
    
    let brandOptions = [];
    data.brands.length > 0 && data.brands.map((brand) => {
      let ele = { label: brand.brandName, value: brand._id };
      brandOptions.push(ele);
    });

    const priceOptions = [
      { label: "Rs. 179 to Rs. 1977", value: "179-1977" },
      { label: "Rs. 1977 to Rs. 3775", value: "1977-3775" },
      { label: "Rs. 3775 to Rs. 5179", value: "3775-5179" },
    ];

    let colorOptions = [];
    data.colors.length > 0 && data.colors.map((color) => {
      let ele = { label: color, value: color };
      colorOptions.push(ele);
    });

    return (
      <div className={"listing-filter " + this.props.removeThisFilter}>
        <div className={"filter-title " + this.props.removeThisTitle}>
          <span>FILTERS</span>
          {/* <Icon type="close" className="close"/> */}
        </div>
        <div className="filter-types">
          <div className="type-title">BRAND</div>
          <div className="type-list">
            <Checkbox.Group options={brandOptions} onChange={(e) => this.props.onCheckBrands(e)} values={this.props.checkedBrands} />
          </div>
        </div>
        <div className="filter-types">
          <div className="type-title">Price</div>
          <div className="type-list price-filter">
            <Input placeholder="Min" type="number"/>
            <span> - </span>
            <Input placeholder="Max"  type="number"/>
          </div>
        </div>
        <div className="filter-types last-child-fi-type">
          <div className="type-title">Ratings</div>
          <div className="type-list">
            {
              data.ratings.length > 0 && data.ratings.map((rate,i) => {
                return(
                  <div key={i} className="rate-stars">
                    {
                      Array(rate)
                      .fill(0)
                      .map((num,j) => {
                        return(
                          <i className="fa fa-star" aria-hidden="true" key={j}></i>
                        )
                      })
                    }
                  </div>
                )
              })
            }
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
