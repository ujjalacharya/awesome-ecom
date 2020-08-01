import React from "react";
import PropTypes from "prop-types";
import { Steps, Row, Col, Card, Progress } from "antd";
import {
  UserOutlined,
  SolutionOutlined,
  LoadingOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Step } = Steps;

const Todo = (props) => {
  return (
    <div className="col-lg-6 col-xl-12">
      <div className="card flex-fill w-100">
        <div className="card-header">
          <h5 className="card-title mb-0">Namaste! Complete the todos to start your selling journey!
            <Progress
            className="float-right"
              style={{ width: 200 }}
              strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }}
              trailColor='#354052'
              percent={20}
              status="active"
            />
            </h5>          
        </div>
        <div className="card-body p-2">
          <div className="all-cards">
            <Row >

              <Col lg={6} >
            <Link to='/profile'>
                <Card
                  title="Profile"
                  // extra={<a href="#">More</a>}
                  hoverable={true}
                  className="todoCard"
                >
                  <p>Complete your profile</p>
                </Card>
            </Link>
              </Col>

              <Col lg={6}>
                <Link to='/profile'>
                <Card
                  title="Business Info"
                  className="todoCard"
                  hoverable={true}
                >
                  <p>Verify your business information</p>
                </Card>
                </Link>
              </Col>

              <Col lg={6}>
                <Link to='/profile'>
                <Card
                  title="Bank Details"
                  className="todoCard"
                  hoverable={true}
                >
                  <p>To receive your money</p>
                </Card>
                </Link>
              </Col>

              <Col lg={6}>
                <Link to='/profile'>
                <Card
                  title="WareHouse"
                  className="todoCard"
                  hoverable={true}
                >
                  <p>To dispatch/return your product</p>
                </Card>
                </Link>
              </Col>
            </Row>
            <div className="dashed-line"></div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

Todo.propTypes = {};

export default Todo;
