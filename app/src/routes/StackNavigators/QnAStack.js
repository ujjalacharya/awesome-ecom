import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import QnA from "../../screens/QnA";
import { headerOptions } from "../../utils/common";

const Stack = createStackNavigator();

const QnAStack = (data) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="QnA">{(props) => <QnA {...props} data={data}/>}</Stack.Screen>
      {/* component={QnA} */}
      {/* options={headerOptions("QnA")} */}
      {/* props={props} */}
      {/* /> */}
    </Stack.Navigator>
  );
};

export default QnAStack;
