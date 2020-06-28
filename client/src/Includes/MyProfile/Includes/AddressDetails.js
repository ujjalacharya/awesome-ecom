import React, { Component } from "react";
import { Row, Col, Button } from "antd";
import { Table, Tag, Space } from "antd";
import EditAddressForm from "./EditAddressForm";

class AddressDetails extends Component {
  state = {
    show: "table",
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
        title: "Location",
        dataIndex: "location",
        key: "location",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <Space size="middle">
            <a
              onClick={() =>
                this.setState({
                  show: "form",
                })
              }
            >
              Edit
            </a>
          </Space>
        ),
      },
    ];

    const data = [
      {
        key: "1",
        fullname: "Utsav Shrestha",
        location: "Home",
        address: "kamalpokhari",
      },
      {
        key: "2",
        fullname: "Utsav Shrestha",
        location: "Office",
        address: "Jaulakhel",
      },
    ];
    return (
      <div className="address-details">
        <div className="title-add">
          <h4>Profile Details</h4>
          <Button className="secondary">Add new address</Button>
        </div>
        {this.state.show === "form" ? (
          <EditAddressForm />
        ) : (
          <Table columns={columns} dataSource={data} pagination={false} />
        )}
      </div>
    );
  }
}

export default AddressDetails;
