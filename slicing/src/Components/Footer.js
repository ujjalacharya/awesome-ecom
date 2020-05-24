import React, { Component } from "react";
import { Row, Col, Input } from "antd";
const { Search } = Input;
class Footer extends Component {
  render() {
    return (
      <section className="footer">
        <Row>
          <Col lg={8} xs={24} className="company-info">
            <div className="logo">
              <img src="/images/logo.png" />
            </div>
            <div className="company-details">
              We are a team of designers and developers that create high quality
              Magento, Wordpress, Prestashop, Opencart
            </div>
            <div className="comp-address">
              ADDRESS: 6688Princess Road, London, Greater London
            </div>
            <div className="comp-phone">PHONE: (012) 800 456 789-987</div>
            <div className="comp-email">EMAIL: Contact@plazathemes.com</div>
          </Col>
          <Col lg={4} xs={24} className="customer-care footer-ul-design">
            <h4>Customer Care</h4>
            <ul>
              <li>Clothing</li>
              <li>Shoes</li>
              <li>Handbag</li>
              <li>Accessories</li>
              <li>Fashion</li>
            </ul>
          </Col>
          <Col lg={4} xs={24} className="information footer-ul-design">
            <h4>Information</h4>
            <ul>
              <li>About Us</li>
              <li>Contact Us</li>
              <li>My Orders</li>
              <li>Terms & Conditions</li>
              <li>Returns & Exchanges</li>
            </ul>
          </Col>
          <Col lg={8} xs={24} className="footer-newsletter">
            <h4>Join Our Newsletter Now</h4>
            <div className="news-details">
              <div className="let-det">
                Get E-mail updates about our latest shop and special offers.
              </div>
              <Search placeholder="Enter your email" enterButton="SUBSCRIBE" />
            </div>
            <ul className="footer-social-media">
                <li><img src="/images/facebook.png" /></li>
                <li><img src="/images/instagram_.png" /></li>
                <li><img src="/images/twitter.png" /></li>
                <li><img src="/images/youtube.png" /></li>
            </ul>
          </Col>
        </Row>
      </section>
    );
  }
}

export default Footer;
