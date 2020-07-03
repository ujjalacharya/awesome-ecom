import * as React from "react";
import { View } from "react-native";
import { Searchbar } from "react-native-paper";
import ConstantColors from "../../constants/ConstantColors";
import styles from "./styles";

const SearchView = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.searchViewWrapper}>
        <Searchbar
          placeholder="Search Products"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchBar}
        />
      </View>
      <View style={{ flex: 5 }}></View>
    </View>
  );
};

export default SearchView;
