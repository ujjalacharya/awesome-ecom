import React, {Component} from "react";
import { Button, Input } from "antd";
import {
  PhoneOutlined,
  EnvironmentOutlined,
  MailOutlined,
} from "@ant-design/icons";

class OrderSummary extends Component {
  render() {
    return (
      <div className="order-shipping">
        <div className={"shipping-details " + this.props.showShippingAddress}>
          <div className="os-title">Shipping & Billing</div>
          <div className="ti-pr">
            <div className="ti">
              <div className="name-add">
                <EnvironmentOutlined />
                <div className="name">
                  <div>Utsav Shrestha</div>
                  <div className="address">
                    New baneshwor test, <br />
                    Banepa City Area, Banepa, Bagmati
                  </div>
                </div>
              </div>
            </div>
            <div className="pr edit">EDIT</div>
          </div>
          <div className="ti-pr">
            <div className="ti">
              <div className="name-add">
                <PhoneOutlined />
                <div className="name">9854214523</div>
              </div>
            </div>
            <div className="pr edit">EDIT</div>
          </div>
          <div className="ti-pr">
            <div className="ti">
              <div className="name-add">
                <MailOutlined />
                <div className="name">utsavstha@gmail.com</div>
              </div>
            </div>
            <div className="pr edit">EDIT</div>
          </div>
        </div>
        <div className="order-summary">
          <div className="os-title">Order Summary</div>
          <div className="price-details">
            <div className="price-title">PRICE DETAILS</div>
            <div className="price-cover">
              <div className="ti-pr">
                <div className="ti">Cart Total</div>
                <div className="pr">$40</div>
              </div>
              <div className="ti-pr">
                <div className="ti">Cart Discount</div>
                <div className="pr">- $20</div>
              </div>
              <div className="ti-pr">
                <div className="ti">Tax</div>
                <div className="pr">$4</div>
              </div>
              <div className="ti-pr">
                <div className="ti">Delivery Charges</div>
                <div className="pr">$5</div>
              </div>
            </div>
            <div className="cupon-voucher">
              <Input placeholder="Enter Voucher Code" />
              <Button className="btn">APPLY</Button>
            </div>
            <div className="total-price">
              <div className="ti-pr">
                <div className="ti">Total</div>
                <div className="pr">$29</div>
              </div>
            </div>
            <div className="order-procced">
              <Button
                className={"btn " + this.props.diableOrderBtn}
                disabled={this.props.diableOrderBtn === "disableBtn" ? true : false}
              >
                {this.props.orderTxt}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderSummary;
