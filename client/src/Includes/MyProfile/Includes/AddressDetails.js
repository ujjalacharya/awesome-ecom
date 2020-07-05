import React, { Component } from "react";
import { Button } from "antd";
import { Table, Space } from "antd";
import _ from "lodash";

// includes
import EditAddressForm from "./EditAddressForm";

class AddressDetails extends Component {
  state = {
    show: "table",
    userData: [],
    allAddress: [],
    editAddressData: [],
  };

  componentDidMount() {
    if (!_.isEmpty(this.props.userData)) {
      this.setState({
        userData: this.props.userData,
        allAddress: this.props.userData.location,
      });
    }
  }

  changeShow = (show) => {
    this.setState({
      show,
    });
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
          {this.state.show === "table" && (
            <Button className="secondary">Add new address</Button>
          )}
        </div>
        {this.state.show === "form" ? (
          <EditAddressForm
            changeShow={this.changeShow}
            editAddressData={this.state.editAddressData}
          />
        ) : (
          <Table columns={columns} dataSource={data} pagination={false} />
        )}
      </div>
    );
  }
}

export default AddressDetails;
