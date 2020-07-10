import React, { Component } from "react";
import { View, ScrollView, Text } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  TouchableRipple,
  Divider,
} from "react-native-paper";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Gallery from "react-native-image-gallery";

import ProductDetailHeader from "./ProductDetailHeader";
import Constants from "../../constants/Constants";
import { galleryImages } from "../../utils/mock";
const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

class ProductDetailScreen extends Component {
  state = {
    showGallery: false,
  };

  handleGalleryToggle = () => {
    this.setState((prevState) => {
      return {
        showGallery: !prevState.showGallery,
      };
    });
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.showGallery ? (
          <View style={{ flex: 1 }}>
            <Ionicons
              name="ios-close-circle"
              size={30}
              color={Constants.tintColor}
              onPress={this.handleGalleryToggle}
              style={{
                backgroundColor: "#696969",
                height: 80,
                padding: 20,
              }}
            />
            <Gallery
              useNativeDriver={true}
              style={{ flex: 1, backgroundColor: "#696969" }}
              initialPage={0}
              images={galleryImages}
            />
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            stickyHeaderIndices={[0]}
          >
            <TouchableRipple
              style={{ height: 250 }}
              onPress={this.handleGalleryToggle}
            >
              <ProductDetailHeader {...this.props} />
            </TouchableRipple>
            {[1, 2, 3, 4, 5, 6, 7].map(() => (
              <>
                <Card>
                  <Card.Title
                    title="Card Title"
                    subtitle="Card Subtitle"
                    left={LeftContent}
                  />
                  <Card.Content>
                    <Title>Card title</Title>
                    <Paragraph>Card content</Paragraph>
                  </Card.Content>
                </Card>
                <Divider />
              </>
            ))}
          </ScrollView>
        )}
        <View
          style={{ backgroundColor: Constants.headerTintColor, height: 50 }}
        >
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Button
              style={{
                flex: 0.45,
                backgroundColor: "orange",
                justifyContent: "center",
              }}
              labelStyle={{ color: "white" }}
            >
              Buy Now
            </Button>
            <Button
              style={{
                flex: 0.45,
                backgroundColor: Constants.activeTintColor,
                justifyContent: "center",
              }}
              labelStyle={{ color: "white" }}
            >
              Add to Cart
            </Button>
            <Button
              style={{ flex: 0.1, justifyContent: "center", marginBottom: 5 }}
              icon={({ size, color }) => (
                <FontAwesome name="share-alt" size={20} color={color} />
              )}
              size={29}
              labelStyle={{ color: Constants.primaryGreen }}
            ></Button>
          </View>
        </View>
      </View>
    );
  }
}

export default ProductDetailScreen;
