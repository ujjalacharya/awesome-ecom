import React from "react";
import { Appbar } from "react-native-paper";

import { AntDesign } from "@expo/vector-icons";

import Constants from "../../constants/Constants";

const ProductListHeader = (props) => {
    
  const _goBack = () => {
    props.navigation.pop();
  };

  return (
    <Appbar.Header statusBarHeight={0}>
      <Appbar.BackAction color={Constants.headerTintColor} onPress={_goBack} />
      <Appbar.Content title="Search" color={Constants.headerTintColor} />
      <Appbar.Action
        color={Constants.headerTintColor}
        icon={() => (
          <AntDesign
            name="search1"
            size={20}
            color={Constants.headerTintColor}
          />
        )}
        onPress={() => props.navigation.pop()}
      />
      <Appbar.Action
        color={Constants.headerTintColor}
        icon="heart"
        onPress={() => props.navigation.navigate("WishList")}
      />
      <Appbar.Action
        color={Constants.headerTintColor}
        icon={() => (
          <AntDesign
            name="shoppingcart"
            size={20}
            color={Constants.headerTintColor}
          />
        )}
        onPress={() => props.navigation.navigate("CartStack")}
      />
    </Appbar.Header>
  );
};

export default ProductListHeader;
