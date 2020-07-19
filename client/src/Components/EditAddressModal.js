import React, { Component } from "react";
import { Button, Modal, Table, Space } from "antd";
import _ from "lodash";

// includes
import AddressForm from "../Includes/MyProfile/Includes/AddressForm";
import { connect } from "react-redux";
import actions from "../../redux/actions";
import { openNotification } from "../../utils/common";

class EditAddressModal extends Component {
  state = {
    show: "table",
    userData: [],
    allAddress: [],
    editAddressData: [],
    showAddNewForm: "addTable",
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(nextProps);
    if (nextProps.data !== prevState.userData && nextProps.data) {
      return {
        userData: nextProps.data,
        allAddress: nextProps.data.location,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.user.userProfile !== prevProps.user.userProfile &&
      this.props.user.userProfile
    ) {
      this.setState({
        userData: this.props.user.userProfile,
        allAddress: this.props.user.userProfile.location,
      });
    }
    if (
      this.props.user.toggleActiveAddResp !==
        prevProps.user.toggleActiveAddResp &&
      this.props.user.toggleActiveAddResp
    ) {
      openNotification("Success", "Active address changed successfully");
      this.props.getUserProfile(this.state.userData._id);
      this.props.onCancel()
    }
  }

  changeShow = (show, userId) => {
    this.setState({
      show,
      showAddNewForm: "addTable",
    });
    if (userId) {
      this.props.getUserProfile(userId);
    }
  };

  toggleAddress = (label) => {
    this.props.toggleActiveAddress(`label=${label}`);
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
    if (this.state.allAddress?.length > 0) {
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
          geoLocation:
            address.geolocation.coordinates[0] +
            " , " +
            address.geolocation.coordinates[1],
          isActive: (
            <div className="yes-no">
              <span>No</span>
              <label className="switch">
                <input
                  type="checkbox"
                  onChange={() => {
                    !address.isActive && this.toggleAddress(address.label);
                  }}
                  checked={address.isActive ? true : false}
                />
                <span className="slider round"></span>
              </label>
              <span>Yes</span>
            </div>
          ),
          // isActive: address.isActive ? "true" : "false",
        };

        data.push(ele);
      });
    }
    return (
      <Modal
        title={this.props.title}
        visible={this.props.visible}
        onCancel={this.props.onCancel}
        footer={null}
        width={1200}
      >
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
      </Modal>
    );
  }
}

export default connect((state) => state, actions)(EditAddressModal);
