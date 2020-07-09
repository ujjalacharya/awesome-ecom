import React, { Component } from "react";
import { Input, Row, Col, Select } from "antd";
import { Table, Tag, Space } from "antd";
import { connect } from "react-redux";
import actions from "../../../redux/actions";
import withPrivate from "../../../utils/auth/withPrivate";
import { convertDateToCurrentTz, openNotification } from "../../../utils/common";
import next from "next";

const { Search } = Input;
// const { Option } = Select;

class MyWishlist extends Component {
  state = {
    allWishlistItems: { wishlists: [], totalCount: 0 },
  };

  componentDidMount() {
    console.log(this.props);
    if (this.props.wishlist.getWishlistItems) {
      this.setState({
        allWishlistItems: this.props.wishlist.getWishlistItems,
      });
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.wishlist.getWishlistItems !== prevState.allWishlistItems &&
      nextProps.wishlist.getWishlistItems
    ) {
      return {
        allWishlistItems: nextProps.wishlist.getWishlistItems,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps){
    if(this.props.cart.addToCartResp !== prevProps.cart.addToCartResp && this.props.cart.addToCartResp){
      openNotification('Success', 'Product added to cart successfully')
      this.props.getWishListItems("page=1&perPage=10")
    }
  }

  render() {
    console.log(this.props);
    let {
      allWishlistItems: { wishlists },
    } = this.state;

    console.log(this.state);

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
        render: (text) => (
          <a className="item-title">
            <span>{text}</span>
          </a>
        ),
      },
      {
        title: "Sold By",
        dataIndex: "soldBy",
        key: "soldBy",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Added On",
        dataIndex: "addedOn",
        key: "addedOn",
      },
      {
        title: "Action",
        key: "action",
        render: (text) => (
          <Space size="middle">
            <a className="action-btn action-btn-delete">
              <i className="fa fa-trash-o" aria-hidden="true"></i> Delete
            </a>
            <a
              className="action-btn action-btn-add"
              onClick={() => this.props.addToCart(text.slug, {quantity:1})}
            >
              <i className="fa fa-plus" aria-hidden="true"></i> Add to Cart
            </a>
          </Space>
        ),
      },
    ];

    let data = [];

    wishlists?.map((item) => {
      let discountedPrice =
        item.product.price -
        (item.product.price * item.product.discountRate) / 100;
      let ele = {
        key: item._id,
        image: (
          <img
            src={`${process.env.IMAGE_BASE_URL}/${item.product.images[0].medium}`}
            className="table-item-img"
          />
        ),
        itemName: item.product.name,
        soldBy: item.product.soldBy.shopName,
        price: discountedPrice,
        addedOn: convertDateToCurrentTz(item.createdAt),
        slug: item.product.slug
      };
      data.push(ele);
    });
    // const data = [
    //   {
    //     key: "1",
    //     image: <img src="/images/helmet.jpg" className="table-item-img" />,
    //     itemName: "Studds D2 Matte Double Visor Full Helmet - Black/white/grey",
    //     soldBy: "STUDDS",
    //     qty: "1",
    //     price: "4000",
    //   },
    //   {
    //     key: "2",
    //     image: <img src="/images/prod-bag.jpg" className="table-item-img" />,
    //     itemName: "Auctor Sem Argu",
    //     soldBy: "Fashionista",
    //     qty: "2",
    //     price: "1500",
    //   },
    // ];
    return (
      <div className="my-wishlist">
        <h3>My Wishlist</h3>
        <Row>
          <Col span={8}>
            <Search
              placeholder="input search text"
              onSearch={(value) => console.log(value)}
              style={{ width: 400 }}
            />
          </Col>
          <Col span={8}>
            {/* <Select
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
            </Select> */}
          </Col>
          <Col span={6}></Col>
        </Row>
        <Table className="orders-table" columns={columns} dataSource={data} />
      </div>
    );
  }
}

export default connect((state) => state, actions)(withPrivate(MyWishlist));
