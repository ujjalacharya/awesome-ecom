import React, { Component } from "react";
import { Row, Col } from "antd";
import { Table } from "antd";
import _ from "lodash";
import {
  convertDateToCurrentTz,
  openNotification,
} from "../../../../utils/common";
import { connect } from "react-redux";
import actions from "../../../../redux/actions";

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

  componentDidMount() {
    if (this.props.userData) {
      this.setState({
        userData: this.props.userData,
        activeLoc: this.props.activeLoc,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.userData !== prevProps.userData &&
      this.props.activeLoc !== prevProps.activeLoc
    ) {
      this.setState({
        userData: this.props.userData,
        activeLoc: this.props.activeLoc,
      });
    }

    if (
      this.props.user.profilePictureResp !==
        prevProps.user.profilePictureResp &&
      this.props.user.profilePictureResp
    ) {
      openNotification("Success", "Profile picture uploaded successfully");
      this.props.getUserProfile(this.state.userData._id);
    }
  }

  render() {
    let { userData, activeLoc } = this.state;

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

    if (!_.isEmpty(activeLoc.address) && !_.isEmpty(userData)) {
      data = [
        {
          key: "1",
          name: "Date of Birth",
          age: userData.dob,
        },
        {
          key: "2",
          name: "Gender",
          age: userData.gender,
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

    let checkSekelton = this.state.userData.email === "" ? true : false;

    return (
      <div className="profile-details">
        <div className="main-profile">
          {!_.isEmpty(userData) && (
            <Row className={checkSekelton && "skeleton"}>
              <Col lg={6} xs={24} className="left-prof">
                <div className="change-profile">
                  <img
                    // src="/images/default-user.png"
                    src={`${process.env.IMAGE_BASE_URL}/${userData.photo}`}
                    onError={(ev) => {
                      ev.target.src = "/images/default-user.png";
                    }}
                  />
                  {/* <div>Change Profile</div> */}
                  <input
                    type="file"
                    id={"newFile"}
                    name={"uploadCitizenship"}
                    className={
                      "inputFile " + (this.state.disableImg ? "disabFile" : "")
                    }
                    accept=".jpeg,.jpg,.png,.pdf"
                    multiple
                    onChange={(e) => {
                      let formData = new FormData();
                      formData.append("photo", e.target.files[0]);
                      this.props.updateProfilePicture(formData);
                    }}
                    disabled={this.state.disableImg ? true : false}
                  />
                  <label htmlFor={"newFile"}>
                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                  </label>
                </div>
              </Col>
              <Col lg={18} xs={24} className="right-prof">
                <h3>
                  <span>{userData.name}</span>
                </h3>
                <div className="em-det">
                  <div>
                    <span className="small-line">
                      {!checkSekelton && "Email:"} {userData.email}
                    </span>
                  </div>
                  {!_.isEmpty(activeLoc) && (
                    <div>
                      <span className="medium-line">
                        {!checkSekelton && "Mobile:"} {activeLoc.phoneno}
                      </span>
                    </div>
                  )}
                  <div className="em-det">
                    <span className="large-line">
                      {!checkSekelton && "Joined on:"}{" "}
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

export default connect((state) => state, actions)(ProfileDetails);
