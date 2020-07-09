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
import Ionicons from "@expo/vector-icons/Ionicons";
import Gallery from "react-native-image-gallery";

import ProductDetailHeader from "./ProductDetailHeader";
import Constants from "../../constants/Constants";
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
              images={[
                {
                  source: {
                    uri:
                      "https://cdn.androidbeat.com/wp-content/uploads/2019/04/redmi-note-8-pro-rear.jpg",
                  },
                },
                {
                  source: {
                    uri:
                      "https://static.toiimg.com/photo/msid-72253025/72253025.jpg?resizemode=4&width=400",
                  },
                },
                {
                  source: {
                    uri:
                      "https://i.gadgets360cdn.com/large/Redmi_Note_8_Pro_Cover_1571399278278.jpg",
                  },
                },
                {
                  source: {
                    uri:
                      "https://akm-img-a-in.tosshub.com/indiatoday/images/story/201908/redmi_note_8_pro_main_image-770x433.png?L5SX8WdcWGVStj5oDsDhAR3DRrnJmiS5",
                  },
                },
              ]}
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
      </View>
    );
  }
}

export default ProductDetailScreen;
