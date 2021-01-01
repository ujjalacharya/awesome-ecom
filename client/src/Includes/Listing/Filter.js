import React, { Component, useEffect, useState } from "react";
import { Checkbox, Input } from "antd";
import { Radio, Row, Col } from "antd";
import { Rate } from "antd";
import { getBrandOptions, getColorOptions } from "../../../utils/common";
import { SearchFilterSkeleton } from "../../../utils/skeletons";

const radioStyle = {
  display: "block",
  height: "30px",
  lineHeight: "30px",
};

const Filter = (props) => {
  let [searchFilters, setSearchFilter] = useState(SearchFilterSkeleton);

  useEffect(() => {
    if(props.data){
      setSearchFilter(props.data)
    }
  }, [props.data])

  let brandOptions = getBrandOptions(searchFilters);

  let colorOptions = getColorOptions(searchFilters);

  return (
    <div className={"listing-filter " + props.removeThisFilter}>
      <div className={"filter-title " + props.removeThisTitle}>
        <span>FILTERS</span>
      </div>
      <div className="filter-types">
        <div className="type-title">BRAND</div>
        <div className="type-list">
          <Checkbox.Group
            options={brandOptions}
            onChange={(e) => props.onCheckBrands(e)}
            value={props.checkedBrands}
          />
        </div>
      </div>
      <div className="filter-types">
        <div className="type-title">Price</div>
        <div className="type-list price-filter">
          <Input
            placeholder="Min"
            type="number"
            value={props.minPrice}
            onChange={(e) => props.changePrice(e.target.value, "min")}
          />
          <span> - </span>
          <Input
            placeholder="Max"
            type="number"
            value={props.maxPrice}
            onChange={(e) => props.changePrice(e.target.value, "max")}
          />
          <button
            className={props.removeThisTitle}
            onClick={() =>
              props.searchPrice(props.minPrice, props.maxPrice)
            }
          >
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
      <div className="filter-types last-child-fi-type">
        <div className="type-title">Ratings</div>
        <div className="type-list">
          <Rate value={props.currentRating} onChange={(rating) => props.onHandleRatings(rating)} />
        </div>
      </div>
      <div className="filter-types last-child-fi-type">
        <div className="type-title">Color</div>
        <div className="type-list">
          <Checkbox.Group
            options={colorOptions}
            onChange={(e) => props.onChangeColors(e)}
            value={props.checkedColors}
          />
        </div>
      </div>
      <div className="filter-types last-child-fi-type">
        <div className="type-title">Warrenty Period</div>
        <div className="type-list">
          <Radio.Group
            onChange={(e) => props.onChangeWarrenty(e.target.value)}
            value={props.selectedWarrenty}
          >
            {searchFilters.warranties &&
              searchFilters.warranties.map((warrenty, l) => {
                return (
                  <Radio style={radioStyle} value={warrenty} key={l}>
                    {warrenty}
                  </Radio>
                );
              })}
          </Radio.Group>
        </div>
      </div>
      <div className="filter-types last-child-fi-type">
        <div className="type-title">Sizes</div>
        <div className="type-list">
          <Radio.Group
            onChange={(e) => props.onChangeSize(e.target.value)}
            value={props.selectedSize}
          >
            {searchFilters.sizes &&
              searchFilters.sizes.map((size, s) => {
                return (
                  <Radio style={radioStyle} value={size} key={s}>
                    {size}
                  </Radio>
                );
              })}
          </Radio.Group>
        </div>
      </div>
      <div className="sticky-filter inside-filter-sticky">
        <Row style={{ width: "100%" }}>
          <Col span={12}>
            <div className="filter-type" onClick={props.closeThisFilter}>
              <span>CLOSE</span>
            </div>
          </Col>
          <Col span={12}>
            <div
              className="filter-type apply-type removeBorder"
              onClick={() => { props.applyFilter(); props.closeThisFilter() }}
            >
              <span>APPLY</span>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Filter;
