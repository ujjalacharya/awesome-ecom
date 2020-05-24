import React, { Component } from "react";
import { Button, Col, Row } from "antd";

class LatestSlider extends Component {
  render() {
    return (
      <div className="popular-slider">
        <Row>
          <Col lg={10} xs={24} className="popular-left-text">
            <div className="popular-text">
              <h1>CHECK NEW ARRIVALS</h1>
              <hr className="title-bottom-hr" />
              <Button className="primary">Discover Now</Button>
            </div>
          </Col>
          <Col lg={14} xs={24} className="popular-left-right">
            <img src="/images/new-arrivals.jpg" />
          </Col>
        </Row>
      </div>
    );
  }
}

export default LatestSlider;
