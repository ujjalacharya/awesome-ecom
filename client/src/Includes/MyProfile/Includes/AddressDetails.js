import React, { Component } from "react";
import { Button } from "antd";
import { Table, Space } from "antd";
import _ from "lodash";

// includes
import { connect } from "react-redux";
import actions from "../../../../redux/actions";
import { getUserInfo } from "../../../../utils/common";
import AddressForm from "./AddressForm";

class AddressDetails extends Component {
  state = {
    show: "table",
    userData: [],
    allAddress: [],
    editAddressData: [],
    showAddNewForm: "addTable",
  };

  componentDidMount() {
    let loginToken = this.props.authentication.token;
    let userInfo = getUserInfo(loginToken);

    if (userInfo?._id) {
      this.props.getUserProfile(userInfo._id);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.user.userProfile !== prevProps.user.userProfile &&
      this.props.user.userProfile
    ) {
      this.setState({
        userData: this.props.user.userProfile,
        allAddress: this.props.user.userProfile.location,
        // userInfo: this.props.user.userProfile,
      });
    }
  }

  // if (!_.isEmpty(this.props.userData)) {
  //   this.setState({
  //     userData: this.props.userData,
  //     allAddress: this.props.userData.location,
  //   });
  // }

  changeShow = (show, userId) => {
    this.setState({
      show,
      showAddNewForm: "addTable",
    });
    if (userId) {
      this.props.getUserProfile(userId);
    }
  };

  render() {
    const columns = [
      {
        title: "Full Name",
        dataIndex: "fullname",
        key: "fullname",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "Label",
        dataIndex: "label",
        key: "label",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
      },
      {
        title: "Area",
        dataIndex: "area",
        key: "area",
      },
      {
        title: "City",
        dataIndex: "city",
        key: "city",
      },
      {
        title: "Region",
        dataIndex: "region",
        key: "region",
      },
      {
        title: "Phone Number",
        dataIndex: "phoneNo",
        key: "phoneNo",
      },
      {
        title: "GeoLocation",
        dataIndex: "geoLocation",
        key: "geoLocation",
      },
      {
        title: "Active",
        dataIndex: "isActive",
        key: "isActive",
      },
      {
        title: "Action",
        key: "action",
        render: (record) => (
          <Space size="middle">
            <a
              onClick={() => {
                this.setState({
                  editAddressData: record,
                });
                this.changeShow("form");
              }}
            >
              Edit
            </a>
          </Space>
        ),
      },
    ];

    let data = [];
    if (this.state.allAddress.length > 0) {
      this.state.allAddress.map((address, i) => {
        let ele = {
          key: address._id,
          fullname: this.state.userData.name,
          label: address.label,
          address: address.address,
          area: address.area,
          city: address.city,
          region: address.region,
          phoneNo: address.phoneno ? address.phoneno : "-",
          geoLocation: address.geolocation.coordinates,
          isActive: address.isActive ? "true" : "false",
        };

        data.push(ele);
      });
    }
    return (
      <div className="address-details">
        <div className="title-add">
          <h4>Profile Details</h4>
          {this.state.show === "table" &&
            this.state.showAddNewForm === "addTable" && (
              <Button
                className="secondary"
                onClick={() => this.setState({ showAddNewForm: "addForm" })}
              >
                Add new address
              </Button>
            )}
        </div>
        {this.state.show === "form" ||
        this.state.showAddNewForm === "addForm" ? (
          this.state.show === "form" ? (
            <AddressForm
              changeShow={this.changeShow}
              editAddressData={this.state.editAddressData}
              userId={this.state.userData._id}
            />
          ) : (
            <AddressForm
              changeShow={this.changeShow}
              editAddressData={{}}
              userId=""
            />
          )
        ) : (
          <Table columns={columns} dataSource={data} pagination={false} />
        )}
      </div>
    );
  }
}

export default connect((state) => state, actions)(AddressDetails);
