import React from "react";
import { Text, View } from "react-native";
import { Appbar, Divider, Button } from "react-native-paper";
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import Constants from "../../constants/Constants";
import ConciseQnA from "../ProductDetailScreen/ConciseQnA";

import { AntDesign } from "@expo/vector-icons";

const QnA = ({data}) => {

  const {askQuestion} = data.route.params

  const navigation = useNavigation();

  const [text, setText] = React.useState("");

  const _goBack = () => {
    navigation.pop();
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header statusBarHeight={0}>
        <Appbar.BackAction
          color={Constants.headerTintColor}
          onPress={_goBack}
        />

        <Appbar.Content title="QnA" color={Constants.headerTintColor} />
      </Appbar.Header>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View>
          {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((data, i) => (
            <>
              <ConciseQnA viewAll={true} />
              <Divider />
            </>
          ))}
        </View>
      </ScrollView>
      <View style={{ height: 60, backgroundColor: "pink" }}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 0.8 }}>
            <TextInput
              placeholder="Ask your question"
              multiline={true}
              value={text}
              onChangeText={(text) => setText(text)}
              style={{ padding: 10 }}
              autoFocus={askQuestion ? true : false}
            />
          </View>
          <View style={{ flex: 0.2 }}>
            <Button
              icon={() => (
                <AntDesign
                  name="enter"
                  size={30}
                  color={Constants.headerTintColor}
                  style={{ marginTop: 20, height: "100%" }}
                />
              )}
              mode="contained"
              onPress={() => console.warn("Pressed")}
              style={{ height: "100%" }}
            ></Button>
          </View>
        </View>
      </View>
    </View>
  );
};

export default QnA;
