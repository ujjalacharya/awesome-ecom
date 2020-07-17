import React from "react";
import { Text, View } from "react-native";
import { Appbar } from "react-native-paper";
import Constants from "../../constants/Constants";

import { useNavigation } from "@react-navigation/native";

const QnA = () => {
  const navigation = useNavigation();

  const _goBack = () => {
    navigation.pop();
  };
  return (
    <View>
      <Appbar.Header statusBarHeight={0}>
        <Appbar.BackAction
          color={Constants.headerTintColor}
          onPress={_goBack}
        />

        <Appbar.Content title="QnA" color={Constants.headerTintColor} />
      </Appbar.Header>
      <Text> QnA Screen </Text>
      <Text> QnA Screen </Text>
      <Text> QnA Screen </Text>
      <Text> QnA Screen </Text>
      <Text> QnA Screen </Text>
      <Text> QnA Screen </Text>
    </View>
  );
};

export default QnA;
