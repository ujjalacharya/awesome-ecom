import React, { Component } from "react";
import { Select, Row, Col } from "antd";
import {
    AppstoreOutlined,
    BarsOutlined
  } from '@ant-design/icons';

//includes
import ProductCard from "../../Components/Includes/ProductCard";

// Select Option
const { Option } = Select;

class ProductList extends Component {
  render() {
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
          <div className="page-status">Page 1 of 10</div>
        </div>
        <div className="card-list">
          <Row gutter={30}>
            <Col lg={6} sm={12} xs={24}>
              <ProductCard />
            </Col>
            <Col lg={6} sm={12} xs={24}>
              <ProductCard />
            </Col>
            <Col lg={6} sm={12} xs={24}>
              <ProductCard />
            </Col>
            <Col lg={6} sm={12} xs={24}>
              <ProductCard />
            </Col>
            <Col lg={6} sm={12} xs={24}>
              <ProductCard />
            </Col>
            <Col lg={6} sm={12} xs={24}>
              <ProductCard />
            </Col>
            <Col lg={6} sm={12} xs={24}>
              <ProductCard />
            </Col>
            <Col lg={6} sm={12} xs={24}>
              <ProductCard />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default ProductList;
