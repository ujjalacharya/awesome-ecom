import React, { Component } from "react";
import { Row, Col, Input } from "antd";

class Header extends Component {
  render() {
    return (
      <div className="main-header">
        <Row>
          <Col lg={14} md={13}>
            <Row className="menu-logo">
              <Col span={2} className="logo">
                <img src="/images/logo.png" />
              </Col>
              <Col span={22} className="menu">
                <div className="menu-list">ALL DEPARTMENTS</div>
                <div className="menu-list">MEN</div>
                <div className="menu-list">WOMEN</div>
                <div className="menu-list">KIDS</div>
                <div className="menu-list">HOME & LIVING</div>
                <div className="menu-list">ESSENTIALS</div>
              </Col>
            </Row>
          </Col>
          <Col lg={6} md={6} className="search">
            <Input placeholder="Search for products, brands and more" />
          </Col>
          <Col lg={4} md={5} className="menu-right">
            <div className="menu-right-items">
              <div className="list-icon">
                <img src="/images/user.png" />
              </div>
              <div className="list-text">Profile</div>
            </div>
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
          </Col>
        </Row>
      </div>
    );
  }
}

export default Header;
