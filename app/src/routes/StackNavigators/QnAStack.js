import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import QnA from "../../screens/QnA";
import { headerOptions } from "../../utils/common";

const Stack = createStackNavigator();

const QnAStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="QnA"
        component={QnA}
        options={headerOptions("QnA")}
      />
    </Stack.Navigator>
  );
};

export default QnAStack;
