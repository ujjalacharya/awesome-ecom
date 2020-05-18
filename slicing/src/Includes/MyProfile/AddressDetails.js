import React, { Component } from "react";
import { Row, Col, Button } from "antd";
import { Table, Tag, Space } from "antd";

class AddressDetails extends Component {
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
            <a>Edit</a>
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
        <Table columns={columns} dataSource={data} pagination={false} />
      </div>
    );
  }
}

export default AddressDetails;
