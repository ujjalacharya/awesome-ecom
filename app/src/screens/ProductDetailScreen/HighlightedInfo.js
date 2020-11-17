import React, { Component } from "react";
import { Dimensions } from "react-native";
import HTML from "react-native-render-html";
import { Card } from "react-native-paper";

const HighlightedInfo = ({ highlights }) => {
  return (
    <Card style={{ flex: 1 }}>
      <Card.Title title="Highlighted Info" />
      <HTML html={highlights} imagesMaxWidth={Dimensions.get("window").width} />
    </Card>
  );
};

export default HighlightedInfo;
