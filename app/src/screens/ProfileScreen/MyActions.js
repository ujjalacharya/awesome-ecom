import React from "react";
import { View, Text } from "react-native";
import { Card } from "react-native-paper";
import { Feather, MaterialIcons } from "@expo/vector-icons";

const icons = ["bookmark"];

const MyActions = () => {
  return (
    <>
      {["My Orders", "My Reviews", "My WishLists"].map((item, index) => (
        <Card style={{ margin: 10, height: 80, flex: 1 }} key={index}>
          <View style={{ flex: 1, flexDirection: "row", padding: 10 }}>
            <View style={{ flex: 0.7, justifyContent: "center", margin: 10 }}>
              <Text style={{ fontSize: 30 }}>0</Text>
              <Text>{item}</Text>
            </View>
            <View
              style={{
                flex: 0.3,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {index === 0 ? (
                <Feather size={50} name="gift" />
              ) : index === 1 ? (
                <MaterialIcons size={50} name="rate-review" />
              ) : (
                <Feather size={50} name="bookmark" />
              )}
            </View>
          </View>
        </Card>
      ))}
    </>
  );
};

export default MyActions;
