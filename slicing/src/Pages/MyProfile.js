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
        <div className="container">
          <Row>
            <Col span={6}>
              <Menu />
            </Col>
            <Col span={18}>
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
