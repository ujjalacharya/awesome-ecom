import React, { Component } from "react";
import { Button, notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import actions from "../../redux/actions";

class GlobalErrorComponent extends Component {
  componentDidMount() {
    this.props.GlobalError.hasError &&
      this.openNotification(this.props.GlobalError);
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.GlobalError !== prevProps.GlobalError &&
      this.props.GlobalError
    ) {
      this.props.GlobalError.hasError &&
        this.openNotification(this.props.GlobalError);
    }
  }

  openNotification = (GlobalError) => {
    console.log(GlobalError);
    notification.open({
      message: "Oops...",
      description: GlobalError.errorMessage,
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  };
  render() {
    return <></>;
  }
}

export default connect((state) => state, actions)(GlobalErrorComponent);
