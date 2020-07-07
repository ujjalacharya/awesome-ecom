import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Searchbar } from "react-native-paper";
import Constants from "../../constants/Constants";

const SeachScreen = (props) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <View style={styles.searchViewWrapper}>
      <View style={styles.searchBarWrapper}>
        <View style={{ flex: 6 }}>
          <Searchbar
            icon="arrow-left"
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
            onIconPress={() => props.navigation.pop()}
          />
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontWeight: "bold" }}>{`Go`}</Text>
        </View>
      </View>
      <View
        style={{ flex: 15, backgroundColor: Constants.headerTintColor }}
      ></View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchViewWrapper: {
    flex: 1,
  },
  searchBarWrapper: {
    flex: 1,
    flexDirection: "row",
  },
});

export default SeachScreen;
