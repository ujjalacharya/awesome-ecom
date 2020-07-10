import React from "react";
import { Card, Title, Paragraph, Divider, Avatar } from "react-native-paper";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const ProductDescription = () => {
  return (
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
  );
};

export default ProductDescription;
