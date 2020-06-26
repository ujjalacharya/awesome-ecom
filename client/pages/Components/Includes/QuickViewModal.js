import React, { Component } from "react";
import { Row, Col, Modal, Button } from "antd";
import ProductSpecs from "../../Includes/Details/ProductSpecs";
import DetailSlider from "../../Includes/Details/DetailSlider";

class QuickViewModal extends Component {
  render() {
    return (
      <Modal
        title={this.props.title}
        visible={this.props.visible}
        // onOk={this.handleOk}
        onCancel={this.props.onCancel}
        footer={null}
        width = {1200}
      >
        <Row>
          <Col lg={10} xs={24} md={24}>
            <DetailSlider />
          </Col>
          <Col lg={14} xs={24} md={18}>
            <ProductSpecs />
          </Col>
        </Row>
      </Modal>
    );
  }
}

export default QuickViewModal;
