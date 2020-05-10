import React, { Component } from "react";
import { Button, Col, Row } from "antd";

class LatestSlider extends Component {
  render() {
    return (
      <div className="popular-slider">
        <Row>
          <Col span={10} className="popular-left-text">
            <div className="popular-text">
              <h1>CHECK NEW ARRIVALS</h1>
              <hr className="title-bottom-hr" />
              <Button className="primary">Discover Now</Button>
            </div>
          </Col>
          <Col span={14} style={{textAlign: 'right'}}>
            <img style={{ height: 230 }} src="/images/new-arrivals.jpg" />
          </Col>
        </Row>
      </div>
    );
  }
}

export default LatestSlider;
