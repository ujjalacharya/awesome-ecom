import React, { Component } from "react";
import { Row, Col } from "antd";
import { Table } from "antd";
import _ from "lodash";
import { convertDateToCurrentTz } from "../../../../utils/common";
import next from "next";

const userData = {
  email: "",
  phone: "",
};

const activeLoc = {
  address: "",
};
class ProfileDetails extends Component {
  state = {
    userData: userData,
    activeLoc: activeLoc,
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (
      this.props.userData !== nextProps.userData &&
      this.props.activeLoc !== nextProps.activeLoc
    ) {
      this.setState({
        userData: nextProps.userData,
        activeLoc: nextProps.activeLoc,
      });
    }
  }

  render() {
    let { userData, activeLoc } = this.state;
    console.log(this.state);
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

    let data = [];

    if (!_.isEmpty(activeLoc.address)) {
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

    let checkSekelton = this.state.userData.email === '' ? true : false
    return (
      <div className="profile-details">
        <div className="main-profile">
          {!_.isEmpty(userData) && (
            <Row className={checkSekelton && "skeleton"}>
              <Col span={6} className="left-prof">
                <img src="/images/profile-pic.jpg" />
              </Col>
              <Col span={18} className="right-prof">
                <h3>
                  <span>{userData.name}</span>
                </h3>
                <div className="em-det">
                  <div>
                    <span className="small-line loading">
                      {!checkSekelton && 'Email:'} {userData.email}
                    </span>
                  </div>
                  {!_.isEmpty(activeLoc) && (
                    <div>
                      <span className="medium-line loading">
                        {!checkSekelton && 'Mobile:'} {activeLoc.phoneno}
                      </span>
                    </div>
                  )}
                  <div className="em-det">
                    <span className="large-line">
                      {!checkSekelton && 'Joined on:'}{" "}
                      {userData.createdAt &&
                        convertDateToCurrentTz(userData.createdAt)}
                    </span>
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
