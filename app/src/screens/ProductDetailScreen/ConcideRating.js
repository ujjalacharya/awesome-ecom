import React from "react";
import { Text, View } from "react-native";
import { Card, Button } from "react-native-paper";
import Constants from "../../constants/Constants";
import { AntDesign } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

class ConcideRating extends React.Component {
  render() {
    return (
      <Card>
        <Card.Title title="Ratings and Reviews (4)" subtitle="View All" />

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
            {"Review the product"}
          </Text>
        </TouchableWithoutFeedback>
      </Card>
    );
  }
}

export default ConcideRating;
