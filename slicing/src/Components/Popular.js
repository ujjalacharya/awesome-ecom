import React, { Component } from "react";
import { Button, Col, Row } from "antd";

//includes
import PopularSlider from './Includes/PopularSlider'

class Popular extends Component {
  render() {
    return (
      <div className="popular-slider">
        <Row>
          <Col span={10} className="popular-left-text">
              <div className="popular-text">
                <h1>THIS SEASONS MUST-HAVES</h1>
                <hr className="title-bottom-hr" />
                <Button className="primary">Shop Now</Button>
              </div>
          </Col>
          <Col span={14}>
            <PopularSlider />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Popular;
