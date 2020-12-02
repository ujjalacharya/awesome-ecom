import React from "react";
import { useSelector } from "react-redux";
import { Text, View } from "react-native";
import { Card, Paragraph, Divider, Avatar } from "react-native-paper";
import Constants from "../../constants/Constants";
import ConcideRating from "./ConciseRating";
import HighlightedInfo from "./HighlightedInfo";
import ConciseQnA from "./ConciseQnA";
import YoutubePlayer from "./YoutubePlayer";

const ProductDescription = ({ productDetails }) => {
  const { token } = useSelector((state) => state.authentication);

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
                Rs {product.price.$numberDecimal}
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
                  {`Rs ${product.price.$numberDecimal - product.discountRate}`}
                </Text>
                <Text
                  style={{
                    color: "green",
                  }}
                >
                  {` ${product.discountRate}% off`}
                </Text>
              </>
            }
          />
        </View>
        <Card.Content>
          <Paragraph>{product.description}</Paragraph>
          <Avatar.Text
            size={24}
            label={`Rating: ${product.stars.averageStar}/5`}
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
          <Paragraph style={{ fontWeight: "bold" }}>
            Weight: {product.weight.map((w) => w).join(" ")}
          </Paragraph>
          {/* <Paragraph style={{ fontWeight: "bold" }}>
            Dimension: 1080x2340
          </Paragraph> */}
          <Paragraph style={{ fontWeight: "bold" }}>
            Color: {product.color.map((c) => c).join(" ")}
          </Paragraph>
          <Paragraph style={{ fontWeight: "bold" }}>
            Warrenty: {product.warranty}
          </Paragraph>
        </Card.Content>
      </Card>
      <Divider />
      <HighlightedInfo {...product} />
      <Divider />
      <YoutubePlayer />
      <Divider />
      <ConcideRating token={token} {...product}/>
      <Divider />
      <ConciseQnA token={token}/>
      <Divider />
    </>
  );
};

export default ProductDescription;
