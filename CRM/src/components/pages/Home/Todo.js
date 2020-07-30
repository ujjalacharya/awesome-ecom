import React from "react";
import PropTypes from "prop-types";
import { Steps, Row, Col, Card } from "antd";
import {
  UserOutlined,
  SolutionOutlined,
  LoadingOutlined,
  SmileOutlined,
} from "@ant-design/icons";

const { Step } = Steps;

const Todo = (props) => {
  return (
    <div className="all-cards">
      <Row>
        <Col lg={8} >
          <Card
            title="Default size card"
            extra={<a href="#">More</a>}
            className="todoCard"
          >
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Col>

        <Col lg={8}>
          <Card
            title="Default size card"
            extra={<a href="#">More</a>}
            className="todoCard"
          >
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Col>

        <Col lg={8}>
          <Card
            title="Default size card"
            extra={<a href="#">More</a>}
            className="todoCard"
          >
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Col>
      </Row>
      <div className="dashed-line"></div>
    </div>
  );
};

Todo.propTypes = {};

export default Todo;
