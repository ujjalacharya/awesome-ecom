import React, { Component } from "react";
import { Row, Col } from "antd";

class Header extends Component {
  render() {
    return (
      <div className="main-header">
        <Row>
          <Col span={10}>
              <Row className="menu-logo">
                <Col span={4} className="logo">
                    <img src="/images/logo.png" />
                </Col>
                <Col span={20} className="menu">
                    <div className="menu-list">MEN</div>
                    <div className="menu-list">WOMEN</div>
                    <div className="menu-list">KIDS</div>
                    <div className="menu-list">HOME & LIVING</div>
                    <div className="menu-list">ESSENTIALS</div>
                </Col>
              </Row>
          </Col>
          <Col span={7}>col-8</Col>
          <Col span={7}>col-8</Col>
        </Row>
      </div>
    );
  }
}

export default Header;
