import React, { Component } from "react";
import { Button, message, notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import actions from "../../redux/actions";

class GlobalErrorComponent extends Component {
  componentDidMount() {
    this.props.globalError.hasError &&
      this.openNotification(this.props.globalError);
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.globalError !== prevProps.globalError &&
      this.props.globalError
    ) {
      this.props.globalError.hasError &&
        this.openNotification(this.props.globalError);
    }
  }

  openNotification = (globalError) => {
    // notification.open({
    //   message: "Notification Title",
    //   description: globalError.errorMessage,
    //   icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    // });
    message.error(globalError.errorMessage)
  };
  render() {
    return <></>;
  }
}

export default connect((state) => state, actions)(GlobalErrorComponent);
