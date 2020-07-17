import React, { Component } from "react";
import { Dimensions } from "react-native";
import HTML from "react-native-render-html";
import { Card } from "react-native-paper";

const htmlContent = `
    <ul>
    <li>Point 1</li>
    <li>Point 2</li>
    <li>Point 3</li>
    <li>Point 4</li>
    </ul>
`;

export default class HighlightedInfo extends Component {
  render() {
    return (
      <Card style={{ flex: 1 }}>
        <Card.Title title="Highlighted Info" />
        <HTML
          html={htmlContent}
          imagesMaxWidth={Dimensions.get("window").width}
        />
      </Card>
    );
  }
}
