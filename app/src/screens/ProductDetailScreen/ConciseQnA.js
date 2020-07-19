import React from "react";
import { Text, View } from "react-native";
import { Card } from "react-native-paper";
import Constants from "../../constants/Constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import { useNavigation } from "@react-navigation/native";

const ConciseQnA = ({ viewAll }) => {
  const navigation = useNavigation();
  return (
    <Card>
      {!viewAll && <Card.Title title="Q & A (7)" subtitle="View All" />}

      <Card.Content style={{ marginBottom: 20, paddingTop: viewAll ? 20 : 0 }}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 0.1, flexDirection: "row", marginRight: 10 }}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                marginTop: 5,
              }}
            >
              <MaterialCommunityIcons
                name="comment-question"
                size={20}
                color={Constants.tintColor}
              />
            </View>
          </View>
          <View
            style={{
              flex: 0.9,
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            <Text>{"Is it going to be woth the money I'll be spending"}</Text>
            <Text style={{ fontSize: 12, color: "gray" }}>
              {"Anoynomous, 2 days ago"}
            </Text>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 0.1, flexDirection: "row", marginRight: 10 }}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                marginTop: 5,
              }}
            >
              <MaterialCommunityIcons
                name="comment-text"
                size={20}
                color={Constants.tintColor}
              />
            </View>
          </View>
          <View
            style={{
              flex: 0.9,
              justifyContent: "center",
              // marginBottom: 10,
            }}
          >
            <Text>{"Not sure about you sir, but I personally use it"}</Text>
            <Text style={{ fontSize: 12, color: "gray" }}>
              {"Anoynomous, 1 day ago"}
            </Text>
          </View>
        </View>
      </Card.Content>
      {!viewAll && (
        <TouchableWithoutFeedback
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 10,
          }}
          onPress={() =>
            navigation.navigate('QnA', {
              askQuestion: true,
            })
          }
        >
          <Text style={{ fontWeight: "bold", textDecorationLine: "underline" }}>
            {"Ask Question"}
          </Text>
        </TouchableWithoutFeedback>
      )}
    </Card>
  );
};

export default ConciseQnA;
