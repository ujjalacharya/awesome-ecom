import React, { Component } from "react";
import { Input, Row, Col, Select } from "antd";
import { Table, Tag, Space } from "antd";
import { connect } from "react-redux";
import actions from "../../../redux/actions";
import { withRouter } from "next/router";
import Link from "next/link";
import _ from "lodash";
import { scrollToTop } from "../../../utils/common";

const { Search } = Input;
const { Option } = Select;

class MyOrders extends Component {
  state = {
    myOrders: [],
    orderStatuses: [{}],
    currentStatus: "",
    appendUrl: "page=1",
    currentPage: 1,
    searchKeyword: "",
    loading: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    let orders = prevState.myOrders;
    let orderStatuses = prevState.orderStatuses;

    if (nextProps.order.getOrders !== prevState.myOrders) {
      orders = nextProps.order.getOrders;
    }
    if (nextProps.order.getOrdersStatus !== prevState.orderStatuses) {
      orderStatuses = nextProps.order.getOrdersStatus;
    }

    return {
      myOrders: orders,
      orderStatuses,
    };
    // return null;
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.order.getOrders !== prevProps.order.getOrders &&
      this.props.getOrders
    ) {
      this.setState({
        myOrders: this.props.order.getOrders,
        loading: false,
      });
    }
  }

  getSearch = (val) => {
    this.setState({ searchKeyword: val, loading: true }, () =>
      this.initialRequest()
    );
  };

  initialRequest = () => {
    let appendUrl = "";

    appendUrl = `page=${this.state.currentPage}`;

    appendUrl =
      appendUrl +
      (this.state.currentStatus ? `&status=${this.state.currentStatus}` : "");

    appendUrl =
      appendUrl +
      (this.state.searchKeyword ? `&keyword=${this.state.searchKeyword}` : "");

    this.props.getOrders(appendUrl);
  };

  onChangePage = (page) => {
    this.setState(
      {
        currentPage: page.current,
        loading: true,
      },
      () => this.initialRequest()
    );
    scrollToTop();
  };

  onStatusChange = (status) => {
    this.setState({ currentStatus: status, loading: true }, () =>
      this.initialRequest()
    );
  };


  render() {
    let { myOrders } = this.state;

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
        render: (text, record) => (
          <Link href="/products/[slug]" as={`/products/${record.slug}`}>
            <a className="item-title">
              <span>{text}</span>
            </a>
          </Link>
        ),
      },
      {
        title: "Status",
        key: "status",
        dataIndex: "status",
        render: (tags) => (
          <>
            {tags.map((tag) => {
              let color = "";
              if (tag === "approve" || tag === "complete") {
                color = "green";
              } else if (tag === "cancelled") {
                color = "red";
              } else if (tag === "dispatch" || tag === "active") {
                color = "blue";
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
        title: "Qty",
        dataIndex: "qty",
        key: "qty",
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Sold By",
        dataIndex: "soldBy",
        key: "soldBy",
        render: (text) => <a>{text}</a>,
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

    myOrders?.orders.map((order) => {
      let ele = {
        key: order._id,
        image: (
          <img
            src={
              process.env.IMAGE_BASE_URL + "/" + order.product.images[0].medium
            }
            className="table-item-img"
          />
        ),
        itemName: order.product.name,
        status: [order.status.currentStatus],
        soldBy: order.soldBy.shopName,
        qty: order.quantity,
        price: order.product.price.$numberDecimal,
        slug: order.product.slug,
      };
      data.push(ele);
    });

    return (
      <div className="my-orders">
        <h3>My Orders</h3>
        <Row>
          <Col lg={10} xs={24}>
            <Search
              placeholder="Search By Item Name"
              onSearch={(value) => this.getSearch(value)}
              className="order-search"
            />
          </Col>
          <Col lg={8} xs={24}>
            <Select
              showSearch
              className="order-select"
              placeholder="Select a status"
              defaultValue="All"
              optionFilterProp="children"
              onChange={(status) => this.onStatusChange(status)}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value=''>All</Option>
              {this.state.orderStatuses?.map((status, i) => {
                return (
                  <Option value={status} key={i}>
                    {status === "tobereturned"
                      ? "To Be Returned"
                      : _.capitalize(status)}
                  </Option>
                );
              })}
            </Select>
          </Col>
          <Col span={6}></Col>
        </Row>
        <Table
          className="orders-table table-wrapper"
          columns={columns}
          dataSource={data}
          pagination={{ total: this.state.myOrders?.totalCount }}
          onChange={this.onChangePage}
          loading={this.state.loading}
          expandable={{
            expandedRowRender: (record) =>
              <table className="expanded-table">
                <tbody>
                  <tr>
                    <td><button type="button" class="ant-table-row-expand-icon" style={{ visibility: 'hidden' }} ></button></td>
                    <td>Status</td>
                    <td>{record.status.map((tag) => {
                      let color = "";
                      if (tag === "approve" || tag === "complete") {
                        color = "green";
                      } else if (tag === "cancelled") {
                        color = "red";
                      } else if (tag === "dispatch" || tag === "active") {
                        color = "blue";
                      }
                      return (
                        <Tag color={color} key={tag}>
                          {tag.toUpperCase()}
                        </Tag>
                      );
                    })}</td>
                  </tr>
                  <tr>
                    <td><button type="button" class="ant-table-row-expand-icon" style={{ visibility: 'hidden' }} ></button></td>
                    <td>Qty</td>
                    <td>{record.qty}</td>
                  </tr>
                  <tr>
                    <td><button type="button" class="ant-table-row-expand-icon" style={{ visibility: 'hidden' }} ></button></td>
                    <td>Price</td>
                    <td>{record.price}</td>
                  </tr>
                  <tr>
                    <td><button type="button" class="ant-table-row-expand-icon" style={{ visibility: 'hidden' }} ></button></td>
                    <td>Sold By</td>
                    <td>{record.soldBy}</td>
                  </tr>
                </tbody>
              </table>
          }}
        />
      </div>
    );
  }
}

export default connect((state) => state, actions)(withRouter(MyOrders));
