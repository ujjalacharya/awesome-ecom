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

class MyProfile extends Component {
  state = {
    currentMenu: "manage-account",
  };

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
                {this.state.currentMenu === "manage-account" && <MenuDetails />}

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

export default withPrivate(MyProfile);
