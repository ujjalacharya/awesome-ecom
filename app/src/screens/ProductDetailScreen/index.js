import React, { Component } from "react";
import { View, ScrollView, Text } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

import ProductDetailHeader from "./ProductDetailHeader";
const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

class ProductDetailScreen extends Component {
  render() {
    return (
      <View>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          stickyHeaderIndices={[0]}
        >
          <View style={{ height: 250 }}>
            <ProductDetailHeader {...this.props} />
          </View>
      
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
            <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
            <Card.Actions>
              <Button>Cancel</Button>
              <Button>Ok</Button>
            </Card.Actions>
          </Card>
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
            <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
            <Card.Actions>
              <Button>Cancel</Button>
              <Button>Ok</Button>
            </Card.Actions>
          </Card>
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
            <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
            <Card.Actions>
              <Button>Cancel</Button>
              <Button>Ok</Button>
            </Card.Actions>
          </Card>
        </ScrollView>
      </View>
    );
  }
}

export default ProductDetailScreen;
