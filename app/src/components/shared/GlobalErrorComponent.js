import React, { useEffect } from "react";
import { View, ToastAndroid } from "react-native";

import { connect } from "react-redux";

const GlobalErrorComponent = ({ globalError }) => {
  const openNotification = (alert) => {
    ToastAndroid.showWithGravity(
      alert.errorMessage || "Error",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };
  useEffect(() => {
    globalError.hasError && openNotification(globalError);
    globalError.hasSuccess && openNotification(globalError);
  }, [globalError]);
  return <View></View>;
};

export default connect((state) => state)(GlobalErrorComponent);
