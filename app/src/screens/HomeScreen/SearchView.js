import * as React from "react";
import { View } from "react-native";
import { Searchbar } from "react-native-paper";
import ConstantColors from "../../constants/ConstantColors";

const SearchView = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: ConstantColors.tintColor,
        }}
      >
        <Searchbar
          placeholder="Search Products"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={{ width: "90%", height: "80%" }}
        />
      </View>
      <View style={{ flex: 5 }}></View>
    </View>
  );
};

export default SearchView;
