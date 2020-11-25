import React, { Component } from "react";
import { Form, Input, Button, Checkbox, Row, Col } from "antd";
import _, { add } from "lodash";
import { connect } from "react-redux";
import actions from "../../../../redux/actions";
import { openNotification } from "../../../../utils/common";

const layout = {
  labelCol: { lg: 6, xs: 24},
  wrapperCol: { lg: 18, xs: 24 },
};
const tailLayout = {
  wrapperCol: { span: 16 },
};

// const form = Form.useForm();

class AddressForm extends Component {
  formRef = React.createRef();
  state = {
    addressId: "",
    fullname: "",
    label: "",
    address: "",
    area: "",
    city: "",
    region: "",
    phoneno: "",
    long: "",
    lat: "",
    isActive: "false",
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.user.editAddressResp !== prevProps.user.editAddressResp &&
      this.props.user.editAddressResp
    ) {
      openNotification("Success", "Address Updated Successfully");
      this.props.changeShow("table", this.props.user.editAddressResp.user);
    }
    if (
      this.props.user.addAddressResp !== prevProps.user.addAddressResp &&
      this.props.user.addAddressResp
    ) {
      openNotification("Success", "Address added Successfully");
      this.props.changeShow("table", this.props.user.editAddressResp.user);
    }
  }

  componentDidMount() {
    let { editAddressData } = this.props;

    if (!_.isEmpty(editAddressData)) {
      this.setState({
        addressId: editAddressData.key,
        fullname: editAddressData.fullname,
        label: editAddressData.label,
        address: editAddressData.address,
        area: editAddressData.area,
        city: editAddressData.city,
        region: editAddressData.region,
        phoneno: editAddressData.phoneNo,
        long: editAddressData.geoLocation[0],
        lat: editAddressData.geoLocation[1],
        isActive: editAddressData.isActive ? "true" : "false",
      });

      this.formRef.current.setFieldsValue({
        addressId: editAddressData.key,
        fullname: editAddressData.fullname,
        label: editAddressData.label,
        address: editAddressData.address,
        area: editAddressData.area,
        city: editAddressData.city,
        region: editAddressData.region,
        phoneno: editAddressData.phoneNo,
        long: editAddressData.geoLocation[0],
        lat: editAddressData.geoLocation[1],
        isActive: editAddressData.isActive ? "true" : "false",
      });
    }
  }

  onFinish = (values) => {
    let body = values
    if
     (this.state.long && this.state.lat) {
      body = {
        ...body,
        long: this.state.long,
        lat: this.state.lat,
      };
    }
    if (!_.isEmpty(this.props.editAddressData)) {
      this.props.editAddress(this.state.addressId, body);
    } else {
      this.props.addAddress(body);
    }
  };

  onFinishFailed = (errorInfo) => {};

  getMyLocation = () => {
    if (navigator.geolocation) {
      let pos = navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  showPosition = (position) => {
    this.setState({
      long: position.coords.longitude,
      lat: position.coords.latitude,
    });
  };

  changeGeoLocation = (e, geoLoc) => {
    if (geoLoc === "long") {
      this.setState({
        long: e.target.value,
      });
    } else {
      this.setState({
        lat: e.target.value,
      });
    }
  };

  render() {
    return (
      <div className="edit-address">
        {/* {!_.isEmpty(this.state.address) && ( */}
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
          ref={this.formRef}
        >
          <Row gutter={15}>
            {/* <Col span={12}>
                <Form.Item
                  label="Full Name"
                  name="fullname"
                  rules={[
                    { required: true, message: "Please input your full name!" },
                  ]}
                  initialValue={this.state.fullname}
                >
                  <Input />
                </Form.Item>
              </Col> */}
            <Col lg={12} xs={24}>
              <Form.Item
                label="Address"
                name="address"
                rules={[
                  { required: true, message: "Please input your address!" },
                ]}
                initialValue={this.state.address}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col lg={12} xs={24}>
              <Form.Item
                label="Area"
                name="area"
                rules={[{ required: true, message: "Please input your area!" }]}
                initialValue={this.state.area}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col lg={12} xs={24}>
              <Form.Item
                label="City"
                name="city"
                rules={[{ required: true, message: "Please input your city!" }]}
                initialValue={this.state.city}
              >
                <Input />
              </Form.Item>
            </Col>
            {_.isEmpty(this.props.editAddressData) && (
              <Col lg={12} xs={24}>
                <Form.Item
                  label="Label"
                  name="label"
                  rules={[
                    { required: true, message: "Please input your label!" },
                  ]}
                  initialValue={this.state.label}
                >
                  <Input />
                </Form.Item>
              </Col>
            )}
            <Col lg={12} xs={24}>
              <Form.Item
                label="Region"
                name="region"
                rules={[
                  { required: true, message: "Please input your region!" },
                ]}
                initialValue={this.state.region}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col lg={12} xs={24}>
              <Form.Item
                label="Phone Number"
                name="phoneno"
                rules={[
                  {
                    required: true,
                    message: "Please input your Phone Number!",
                  },
                ]}
                initialValue={this.state.phoneno}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col lg={12} xs={24}>
              <Form.Item label="Geo Location">
                <div style={{ display: "flex" }}>
                  <label style={{ marginRight: 10, width: 65 }}>
                    Longitude
                  </label>
                  <Input
                    value={this.state.long}
                    onChange={(e) => this.changeGeoLocation(e, "long")}
                  />
                </div>
                <div style={{ display: "flex", marginTop: 10 }}>
                  <label style={{ marginRight: 10, width: 65 }}>Latitude</label>
                  <Input
                    value={this.state.lat}
                    onChange={(e) => this.changeGeoLocation(e, "lat")}
                  />
                </div>
                <Button style={{ marginTop: 10, marginBottom: 10 }} onClick={this.getMyLocation}>
                  Get My Location
                </Button>
              </Form.Item>
            </Col>
            <Col lg={24} xs={24}>
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button
                  type="secondary"
                  onClick={() => {
                    this.props.changeShow("table");
                  }}
                  style={{marginLeft: 10}}
                >
                  Cancel
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        {/* )} */}
      </div>
    );
  }
}

export default connect((state) => state, actions)(AddressForm);
