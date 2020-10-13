import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Searchbar, TouchableRipple, Button } from "react-native-paper";
import Constants from "../../constants/Constants";

import { AntDesign } from "@expo/vector-icons";

const SeachScreen = (props) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <View style={styles.searchViewWrapper}>
      <View style={styles.searchBarWrapper}>
        <View style={styles.searchBarFlexWrapper}>
          <View style={{ flex: 6 }}>
            <Searchbar
              autoFocus={true}
              clearIcon={() => <AntDesign name="closecircle" />}
              icon="arrow-left"
              placeholder="Search Products"
              onChangeText={onChangeSearch}
              value={searchQuery}
              onIconPress={() => props.navigation.pop()}
            />
          </View>
          <TouchableRipple
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            onPress={() => props.navigation.navigate("Products")}
          >
            <Text style={{ fontWeight: "bold" }}>{`Go`}</Text>
          </TouchableRipple>
        </View>
      </View>
      <View style={{ flex: 15, backgroundColor: Constants.headerTintColor }}>
        <View
          style={{ height: 30, width: "100%", margin: 5, flexDirection: "row" }}
        >
          <View style={{ flex: 0.8, justifyContent: "center" }}>
            <Text>{"Search History"}</Text>
          </View>
          <View style={{ flex: 0.2 }}>
            <Button onPress={() => console.warn("delete")}>
              <AntDesign name="delete" color="red" />
            </Button>
          </View>
        </View>
        <View style={{ minHeight: 200, flex: 1, flexDirection: "row", flexWrap: 'wrap' }}>
          {[0, 0, 0, 1, 2,3].map(item => (
            <TouchableRipple onPress={()=> console.warn("history")} style={{flexBasis: '28%', height: 40, backgroundColor: "#eff0f5", margin: 10, justifyContent: "center", alignItems: "center"}}>
              <View>
              <Text>Whey Protein</Text>
              </View>
            </TouchableRipple>
           
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchViewWrapper: {
    flex: 1,
  },
  searchBarWrapper: {
    height: 50,
  },

  searchBarFlexWrapper: {
    flexDirection: "row",
  },
});

export default SeachScreen;
