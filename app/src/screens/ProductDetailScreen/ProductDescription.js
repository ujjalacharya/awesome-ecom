import React from "react";
import { Text, View } from "react-native";
import {
  Card,
  Paragraph,
  Divider,
  Avatar,
  Title,
  Button,
} from "react-native-paper";
import Constants from "../../constants/Constants";
import { AntDesign } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const ProductDescription = () => {
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
                {"Rs 199"}
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
            Redmi Note 8 Pro is a highly sought after smartphone. It has a
            big-display which measures 6.53-inches and a water drop notch that
            houses the selfie camera. The display also has support for HDR. It
            has a glass back that is made out of Corning Gorilla Glass 5. The
            Redmi Note 8 pro also has an IR Blaster at the top whihc cna be used
            to control other IR-based appliances. The Redmi Note 8 Pro is
            powered by the MediaTek Helio G90T which is a gaming processor. It
            is very capable and can play most gaming title out there on the play
            store. There are three variants of the Redmi Note 8 Pro, 6GB RAM
            with 64GB storage, 6GB RAM with 128GB storage and 8GB RAM with 128GB
            storage. It uses UFS 2.1 for storage and has a dedicated card slot
            for storage expansion.{" "}
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
      <Card>
        <Card.Title title="Ratings and Reviews (4)" />

        {[0, 0, 0].map(() => (
          <Card.Content style={{ marginBottom: 20 }}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View
                style={{
                  flex: 0.7,
                  justifyContent: "center",
                  marginBottom: 10,
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  {"Gyanendra Shahi"}
                </Text>
                <Text>{"2 days ago"}</Text>
              </View>
              <View
                style={{ flex: 0.3, flexDirection: "row", marginRight: 10 }}
              >
                {[0, 0].map((star) => (
                  <View style={{ flex: 1 }}>
                    <Button
                      icon={() => (
                        <AntDesign
                          name="star"
                          size={15}
                          color={Constants.primaryGreen}
                        />
                      )}
                    ></Button>
                  </View>
                ))}
                {[0, 0, 0].map((star) => (
                  <View style={{ flex: 1 }}>
                    <Button
                      icon={() => (
                        <AntDesign
                          name="staro"
                          size={15}
                          color={Constants.primaryGreen}
                        />
                      )}
                    ></Button>
                  </View>
                ))}
              </View>
            </View>
            <View>
              <Text>{"Thikai xa, khassai man chai parena"}</Text>
            </View>
          </Card.Content>
        ))}
        <TouchableWithoutFeedback
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            margin: 10,
          }}
          onPress={() => console.warn("View all")}
        >
          <Text style={{ fontWeight: "bold", textDecorationLine: "underline" }}>
            {"View All"}
          </Text>
        </TouchableWithoutFeedback>
      </Card>
    </>
  );
};

export default ProductDescription;
