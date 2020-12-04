import React from "react";
import { View, Text } from "react-native";
import { Card } from "react-native-paper";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const MyActions = ({ myReviews }) => {
  const navigation = useNavigation();

  const cards = [
    { id: 1, name: "My Orders", value: myReviews },
    { id: 2, name: "My Reviews", value: myReviews },
    { id: 3, name: "My Wishlists", value: myReviews },
  ];

  return (
    <>
      {cards.map((item, index) => (
        <Card
          style={{ margin: 10, height: 80, flex: 1 }}
          key={index}
          onPress={() => navigation.navigate(item.name)}
        >
          <View style={{ flex: 1, flexDirection: "row", padding: 10 }}>
            <View style={{ flex: 0.7, justifyContent: "center", margin: 10 }}>
              <Text style={{ fontSize: 30 }}>{item.value.totalCount}</Text>
              <Text>{item.name}</Text>
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
