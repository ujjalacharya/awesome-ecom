import React from "react";
import { Text, View } from "react-native";
import { Card, Paragraph, Divider, Avatar } from "react-native-paper";
import Constants from "../../constants/Constants";
import ConcideRating from "./ConciseRating";
import HighlightedInfo from "./HighlightedInfo";
import ConciseQnA from "./ConciseQnA";
import YoutubePlayer from "./YoutubePlayer";
import Skeleton from "../../components/shared/Skeleton";

const ProductDescription = ({ loading, productDetails }) => {
  if (loading) {
    return <Skeleton />;
  }
  const { product } = productDetails;
  return (
    <>
      <Card>
        <View>
          <Card.Title
            title={
              <Text
                style={{
                  color: Constants.primaryGreen,
                  fontWeight: "bold",
                }}
              >
                {product.price.$numberDecimal}
              </Text>
            }
            subtitle={
              <>
                <Text
                  style={{
                    textDecorationLine: "line-through",
                    textDecorationStyle: "solid",
                  }}
                >
                  {"Rs 265"}
                </Text>
                <Text
                  style={{
                    color: "green",
                  }}
                >
                  {" 6% off"}
                </Text>
              </>
            }
          />
        </View>
        <Card.Content>
          <Paragraph>
            {product.description}
          </Paragraph>
          <Avatar.Text
            size={24}
            label="Rating: 4/5"
            color="white"
            backgroundColor={Constants.primaryGreen}
            width={90}
            style={{ marginTop: 10 }}
          />
        </Card.Content>
      </Card>
      <Divider />
      <Card>
        <Card.Title title="Additional Information" />

        <Card.Content>
          <Paragraph style={{ fontWeight: "bold" }}>Weight:</Paragraph>
          <Paragraph style={{ fontWeight: "bold" }}>
            Dimension: 1080x2340
          </Paragraph>
          <Paragraph style={{ fontWeight: "bold" }}>Color: white</Paragraph>
          <Paragraph style={{ fontWeight: "bold" }}>Warrenty: 1 year</Paragraph>
        </Card.Content>
      </Card>
      <Divider />
      <HighlightedInfo {...product}/>
      <Divider />
      <YoutubePlayer />
      <Divider />
      <ConcideRating />
      <Divider />
      <ConciseQnA />
      <Divider />
    </>
  );
};

export default ProductDescription;
