import React, { Component } from "react";
import { Row, Col } from "antd";
import { Table, Tag, Space } from "antd";

class ProfileDetails extends Component {
  render() {
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "Age",
        dataIndex: "age",
        key: "age",
      },
    ];

    const data = [
      {
        key: "1",
        name: "Date of Birth",
        age: "1996-01-25 AD",
      },
      {
        key: "2",
        name: "Gender",
        age: "Male",
      },
      {
        key: "3",
        name: "Address",
        age: "Byas Municipality, Tanahu, Gandaki",
      },
      ,
      {
        key: "4",
        name: "Occupation",
        age: "Private Sector",
      },
    ];
    return (
      <div className="profile-details">
        <div className="main-profile">
          <Row>
            <Col span={6} className="left-prof">
              <img src="/images/profile-pic.jpg" />
            </Col>
            <Col span={18} className="right-prof">
              <h3>Utsav Shrestha</h3>
              <div className="em-det">
                <div>Email: stha24@gmail.com</div>
                <div>Mobile: 9846402107 </div>
                <div>Joined on: Mar 22, 2019</div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="profile-bottom">
          <h4>Profile Details</h4>
          <Table
            columns={columns}
            dataSource={data}
            showHeader={false}
            pagination={false}
          />
        </div>
      </div>
    );
  }
}

export default ProfileDetails;
