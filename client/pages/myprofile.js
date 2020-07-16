import React, { Component } from "react";
import Menu from "../src/Includes/MyProfile/menu";
import { Row, Col } from "antd";

//includes
import MenuDetails from "../src/Includes/MyProfile/MenuDetails";
import MyOrders from "../src/Includes/MyProfile/MyOrders";
import MyWishlist from "../src/Includes/MyProfile/MyWishlist";
import MyReviews from "../src/Includes/MyProfile/MyReviews";
import Layout from "../src/Components/Layout";
import withPrivate from "../utils/auth/withPrivate";
import { connect } from "react-redux";
import actions from "../redux/actions";
import { getUserInfo } from "../utils/common";

class MyProfile extends Component {
  state = {
    currentMenu: "manage-account",
    userInfo: {},
  };

  componentDidMount() {
    let loginToken = this.props.authentication.token;
    let userInfo = getUserInfo(loginToken);

    if (userInfo?._id) {
      this.props.getUserProfile(userInfo._id);
    }

    this.props.getWishListItems('page=1&perPage=10')

    this.props.getOrders(`page=1`)

    // this.props.getOrdersStatuses()
  }

  componentDidUpdate(prevProps){
    if(this.props.user.userProfile !== prevProps.user.userProfile && this.props.user.userProfile){
      this.setState({
        userInfo: this.props.user.userProfile
      })
    }
  }

  changeMenuTab = (menu) => {
    this.setState({
      currentMenu: menu,
    });
  };

  render() {
    
    return (
      <Layout title="My Profile">
        <div className="my-profile">
          <div className="container min-height">
            <Row>
              <Col span={4} className="left-menu">
                <Menu changeMenuTab={this.changeMenuTab} />
              </Col>
              <Col span={20} style={{ paddingLeft: 40 }}>
                {this.state.currentMenu === "manage-account" && <MenuDetails data = {this.state.userInfo} />}

                {this.state.currentMenu === "my-orders" && <MyOrders />}

                {this.state.currentMenu === "my-reviews" && <MyReviews />}

                {this.state.currentMenu === "my-whishlist" && <MyWishlist />}

                {/* {
                this.state.currentMenu === "sell-on-daraz" &&
                <MenuDetails />
              } */}
              </Col>
            </Row>
          </div>
        </div>
      </Layout>
    );
  }
}

export default connect((state) => state, actions)(withPrivate(MyProfile));
