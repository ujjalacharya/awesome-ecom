import React, { Component } from "react";
import { Row, Col } from "antd";
import { Table } from "antd";
import _ from "lodash";
import { convertDateToCurrentTz } from "../../../../utils/common";

class ProfileDetails extends Component {
  render() {
    let { userData, activeLoc } = this.props;
    console.log(this.props);

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

    let data = []

    if(!_.isEmpty(activeLoc.address)){
      data = [
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
          age: activeLoc.address,
        },
        ,
        {
          key: "4",
          name: "Occupation",
          age: "Private Sector",
        },
      ];
    }
    return (
      <div className="profile-details">
        <div className="main-profile">
          {!_.isEmpty(userData) && (
            <Row>
              <Col span={6} className="left-prof">
                <img src="/images/profile-pic.jpg" />
              </Col>
              <Col span={18} className="right-prof">
                <h3>{userData.name}</h3>
                <div className="em-det">
                  <div>Email: {userData.email}</div>
                  {!_.isEmpty(activeLoc) && (
                    <div>Mobile: {activeLoc.phoneno}</div>
                  )}
                  <div>
                    Joined on: {convertDateToCurrentTz(userData.createdAt)}
                  </div>
                </div>
              </Col>
            </Row>
          )}
        </div>
        <div className="profile-bottom">
          <h4>Profile Details</h4>
          {!_.isEmpty(activeLoc) && (
            <Table
              columns={columns}
              dataSource={data}
              showHeader={false}
              pagination={false}
            />
          )}
        </div>
      </div>
    );
  }
}

export default ProfileDetails;
