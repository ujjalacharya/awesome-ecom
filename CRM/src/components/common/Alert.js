import React, { useEffect } from "react";
import {notification } from "antd";
import { SmileOutlined,  } from "@ant-design/icons";
import { connect } from "react-redux";
const Alert = ({alert}) => {
  const openNotification = (alert) => {
    notification.open({
      message: alert.hasError?"Oops...": "Cool...",
      description: alert.msg,
      icon: alert.hasError ? <SmileOutlined style={{ color: "#108ee9" }} /> : <SmileOutlined style={{ color: "#108ee9" }} />,
      // style: { position: 'relative', zIndex: '2'  }
      placement:'bottomRight'
    });
  };
  useEffect(() => {
    alert.hasError && openNotification(alert);
    alert.hasSuccess && openNotification(alert);
  },[alert])
  return <> </>
}

export default connect((state) => state)(Alert);
