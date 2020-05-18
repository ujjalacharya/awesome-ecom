import React, { Component } from "react";
import Menu from "../Includes/MyProfile/menu";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Row, Col } from "antd";
import MenuDetails from "../Includes/MyProfile/MenuDetails";

class MyProfile extends Component {
  render() {
    return (
      <div className="my-profile">
        <Header />
        <div className="container min-height">
          <Row>
            <Col span={4} className="left-menu">
              <Menu />
            </Col>
            <Col span={20} style={{paddingLeft:40}}>
                <MenuDetails />
            </Col>
          </Row>
        </div>
        <Footer />
      </div>
    );
  }
}

export default MyProfile;
