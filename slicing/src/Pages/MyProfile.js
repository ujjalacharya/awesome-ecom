import React, { Component } from "react";
import Menu from "../Includes/MyProfile/menu";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Row, Col } from "antd";
import MenuDetails from "../Includes/MyProfile/MenuDetails";
import MyOrders from "../Includes/MyProfile/MyOrders";

class MyProfile extends Component {
  state = {
    currentMenu: 'manage-account'
  }

  changeMenuTab = (menu) => {
    this.setState({
      currentMenu: menu
    })
  }

  render() {
    return (
      <div className="my-profile">
        <Header />
        <div className="container min-height">
          <Row>
            <Col span={4} className="left-menu">
              <Menu changeMenuTab={this.changeMenuTab} />
            </Col>
            <Col span={20} style={{ paddingLeft: 40 }}>
              {
                this.state.currentMenu === "manage-account" &&
                <MenuDetails />
              }
              
              {
                this.state.currentMenu === "my-orders" &&
                <MyOrders />
              }
              
              {/* {
                this.state.currentMenu === "my-reviews" &&
                <MenuDetails />
              }
              
              {
                this.state.currentMenu === "my-whishlist" &&
                <MenuDetails />
              }
              
              {
                this.state.currentMenu === "sell-on-daraz" &&
                <MenuDetails />
              } */}
            </Col>
          </Row>
        </div>
        <Footer />
      </div>
    );
  }
}

export default MyProfile;
