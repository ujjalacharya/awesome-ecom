import React from "react";
import { Row, Col, Card, Progress } from "antd";
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const Todo = ({user,completedPercent}) => {
  
  return (
    <div className="col-lg-6 col-xl-12">
      <div className="card flex-fill w-100">
        <div className="card-header">
          <h5 className="card-title mb-0">Namaste! Complete the todos to start your selling journey!
            <Progress
              className="card-title mb-0 float-right"
              format={percent => `${percent}% done`}
              style={{ width: 200 }}
              strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }}
              trailColor='#354052'
              percent={completedPercent}
              status="active"
            />
            </h5>          
        </div>
        <div className="card-body p-2">
          <div className="all-cards">
            <Row >

              <Col lg={6} >
            <Link to={!user?.shopName?'/profile':null} >
                <Card
                  title="Profile"
                    extra={<CheckCircleTwoTone twoToneColor="#52c41a" />}
                    hoverable={!user?.shopName ?true: false}
                  className="todoCard"
                >
                  <p>Complete your profile</p>
                </Card>
            </Link>
              </Col>

              <Col lg={6}>
                <Link to={user?.businessInfo ? '/profile' : null}>
                <Card
                  title="Business Info"
                  className="todoCard"
                    extra={<CloseCircleTwoTone twoToneColor="#f44455"/>}
                  hoverable={user?.businessInfo ? true : false}
                >
                  <p>Verify your business information</p>
                </Card>
                </Link>
              </Col>

              <Col lg={6}>
                <Link to={!user?.adminBank ? '/profile' : null}>
                <Card
                  title="Bank Details"
                  className="todoCard"
                  extra={<CloseCircleTwoTone twoToneColor="#f44455"/>}
                  hoverable={!user?.adminBank ? true : false}
                >
                  <p>To receive your money</p>
                </Card>
                </Link>
              </Col>

              <Col lg={6}>
                <Link to={!user?.adminWareHouse ? '/profile' : null}>
                <Card
                  title="WareHouse"
                  className="todoCard"
                  extra={<CloseCircleTwoTone twoToneColor="#f44455"/>}
                  hoverable={!user?.adminWareHouse ? true : false}
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
