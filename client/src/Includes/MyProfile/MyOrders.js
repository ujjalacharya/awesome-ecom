import React, { Component } from "react";
import { Input, Row, Col, Select } from "antd";
import { Table, Tag, Space } from "antd";
import { connect } from "react-redux";
import actions from "../../../redux/actions";
import { withRouter } from "next/router";

const { Search } = Input;
const { Option } = Select;

class MyOrders extends Component {
  state = {
    myOrders: []
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.order.getOrders !== prevState.myOrders){
      return{
        myOrders: nextProps.order.getOrders
      }
    }
    return null;
  }

  onChange = (value) => {
    
  }
  onSearch = (val) => {
    
  }
  render() {
    console.log(this.props)
    console.log(this.state)

    let { myOrders } = this.state

    const columns = [
      {
        title: "Image",
        dataIndex: "image",
        key: "image",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "Item Name",
        dataIndex: "itemName",
        key: "itemName",
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        render: tags => (
          <>
            {tags.map(tag => {
              let color = 'green';
              if (tag === 'purchased') {
                color = 'green';
              }else if(tag === 'cancelled'){
                  color = 'blue'
              }else{
                  color='red'
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </>
        ),
      },
      {
        title: "Sold By",
        dataIndex: "soldBy",
        key: "soldBy",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "Qty",
        dataIndex: "qty",
        key: "qty",
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
      },
    //   {
    //     title: "Action",
    //     key: "action",
    //     render: (text, record) => (
    //       <Space size="middle">
    //         <a
    //           onClick={() =>
    //             this.setState({
    //               show: "form",
    //             })
    //           }
    //         >
    //           Edit
    //         </a>
    //       </Space>
    //     ),
    //   },
    ];

    let data = [];

    myOrders?.orders.map(order => {
      let ele = {
        key: order._id,
        image: <img src="/images/helmet.jpg" className="table-item-img" />,
        itemName: order.product.name,
        status: [order.status.currentStatus],
        soldBy: "STUDDS",
        qty: order.quantity,
        price: "4000",
      }
      data.push(ele)
    })

    return (
      <div className="my-orders">
        <h3>My Orders</h3>
        <Row>
          <Col lg={10} >
            <Search
              placeholder="input search text"
              onSearch={(value) => console.log(value)}
              style={{ width: 400 }}
            />
          </Col>
          <Col lg={8}>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select a status"
              defaultValue="All"
              optionFilterProp="children"
              onChange={this.onChange}
              onSearch={this.onSearch}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="">All</Option>
              <Option value="toPay">To Pay</Option>
              <Option value="toShip">To Ship</Option>
              <Option value="toReceive">To Receive</Option>
            </Select>
          </Col>
          <Col span={6}></Col>
        </Row>
        <Table className="orders-table" columns={columns} dataSource={data} />
      </div>
    );
  }
}

export default connect((state) => state, actions)(withRouter(MyOrders));