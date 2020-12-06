import React from "react";
import { View } from "react-native";
import { Appbar } from "react-native-paper";
import Constants from "../constants/Constants";
import { useNavigation } from "@react-navigation/native";

const ListingScreen = ({ title, children }) => {
  const navigation = useNavigation();
  return (
    
      <View>
        <Appbar.Header statusBarHeight={0}>
          <Appbar.BackAction
            onPress={() => navigation.goBack()}
            color={Constants.headerTintColor}
          />
          <Appbar.Content title={title} color={Constants.headerTintColor} />
        </Appbar.Header>
        <>{children}</>
      </View>
  );
};

export default ListingScreen;
