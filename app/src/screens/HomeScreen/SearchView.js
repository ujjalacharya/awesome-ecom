import * as React from "react";
import { View, Text } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import Constants from "../../constants/Constants";
import styles from "./styles";

const SearchView = (props) => {
  return (
    <View style={styles.searchViewWrapper}>
      <TouchableRipple
        style={styles.inputField}
        onPress={() => props.navigation.navigate("Search")}
      >
        <>
          <View style={styles.searchIconWrapper}>
            <AntDesign
              name="search1"
              size={20}
              color={Constants.grayColor}
            />
          </View>
          <View style={styles.searchText}>
            <Text style={styles.inputText}>{"Search Products"}</Text>
          </View>
        </>
      </TouchableRipple>
    </View>
  );
};

export default SearchView;
