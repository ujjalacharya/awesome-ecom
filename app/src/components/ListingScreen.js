import React from "react";
import { View, ScrollView } from "react-native";
import { Appbar } from "react-native-paper";
import Constants from "../constants/Constants";
import { useNavigation } from "@react-navigation/native";

const MyOrders = ({title, children}) => {
  const navigation = useNavigation();
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      stickyHeaderIndices={[1]}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View>
        <Appbar.Header statusBarHeight={0}>
          <Appbar.BackAction
            onPress={() => navigation.goBack()}
            color={Constants.headerTintColor}
          />
          <Appbar.Content title={title} color={Constants.headerTintColor} />
        </Appbar.Header>
        <>
          {children}
        </>
      </View>
    </ScrollView>
  );
};

export default MyOrders;
