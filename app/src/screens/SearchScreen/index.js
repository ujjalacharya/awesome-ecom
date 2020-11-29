import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, StyleSheet, AsyncStorage } from "react-native";
import { Searchbar, TouchableRipple, Button } from "react-native-paper";
import { debounce } from "lodash";
import Constants from "../../constants/Constants";

import { AntDesign, Feather } from "@expo/vector-icons";
import {
  getSearchKeywords,
  searchProducts,
} from "../../../redux/actions/searchActions";

const searchKeywords = [
  { id: 1, name: "One Plus 8T" },
  { id: 2, name: "One on One" },
  { id: 3, name: "Car One plus" },
];

const SeachScreen = (props) => {
  const dispatch = useDispatch();
  const { searchKeywords } = useSelector((state) => state.listing);
  const [searchQuery, setSearchQuery] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistoryFromAsyncStorage();
  }, []);

  const fetchHistoryFromAsyncStorage = async () => {
    try {
      let asyncItems = await AsyncStorage.getItem("@uzzStore:history");

      if (asyncItems) {
        let parsedItems = [...JSON.parse(asyncItems)];
        setHistory(parsedItems);
      }
    } catch (error) {
      // Error saving data
    }
  };

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    keywordSearch(query);
  };

  const searchKeyWordsFromQuery = (query) => {
    dispatch(getSearchKeywords(query));
  };

  const keywordSearch = debounce((term) => {
    searchKeyWordsFromQuery(term);
  }, 300);

  const handleGo = async (itemName) => {
    let newItemsArr = [];
    let searchQueryForSearch;
    if (!itemName) {
      try {
        let asyncItems = await AsyncStorage.getItem("@uzzStore:history");
        searchQueryForSearch = searchQuery
        if (asyncItems) newItemsArr = [...JSON.parse(asyncItems)];

        searchQuery && newItemsArr.unshift(searchQuery);
        newItemsArr = newItemsArr.map((item) => item.trim());
        let uniqueItems = [...new Set(newItemsArr)];

        await AsyncStorage.setItem(
          "@uzzStore:history",
          JSON.stringify(uniqueItems)
        );
      } catch (error) {
        // Error saving data
      }
    }else{
      searchQueryForSearch = searchQuery
    }
    dispatch(
      searchProducts(`?page=1&perPage=10`, { keyword: searchQueryForSearch })
    );
    props.navigation.navigate("Products");
  };

  const handleRemoveHistory = async () => {
    await AsyncStorage.removeItem("@uzzStore:history", () => {
      setHistory([]);
    });
  };

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
              onSubmitEditing={handleGo}
            />
          </View>
          <TouchableRipple
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            onPress={searchQuery && handleGo}
          >
            <Text style={{ fontWeight: "bold" }}>{`Go`}</Text>
          </TouchableRipple>
        </View>
      </View>
      {searchQuery ? (
        <View style={{ flex: 1, backgroundColor: Constants.headerTintColor }}>
          {searchKeywords.map((item, i) => {
            return (
              <TouchableRipple
                style={{
                  borderColor: "#000",
                  borderBottomWidth: 1,
                  height: 50,
                  alignItems: "center",
                  paddingLeft: 5,
                  flexDirection: "row",
                }}
                key={i}
                onPress={() => {
                  setSearchQuery(item);
                  handleGo(item);
                }}
              >
                <>
                  <View style={{ flex: 0.9, marginLeft: 5 }}>
                    <Text style={{ fontWeight: "bold" }}>{item}</Text>
                  </View>
                  <TouchableRipple onPress={() => setSearchQuery(item)}>
                    <Feather name="arrow-up-left" size={20} color="gray" />
                  </TouchableRipple>
                </>
              </TouchableRipple>
            );
          })}
        </View>
      ) : (
        <View style={{ flex: 1, backgroundColor: Constants.headerTintColor }}>
          <View
            style={{
              height: 30,
              width: "100%",
              margin: 5,
              flexDirection: "row",
            }}
          >
            <View style={{ flex: 0.8, justifyContent: "center" }}>
              <Text>{"Search History"}</Text>
            </View>
            <View style={{ flex: 0.2 }}>
              <Button onPress={handleRemoveHistory}>
                <AntDesign name="delete" color="red" />
              </Button>
            </View>
          </View>
          <View
            style={{
              minHeight: 200,
              flex: 1,
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {history.map((item, i) => (
              <TouchableRipple
                onPress={() => onChangeSearch(item)}
                style={{
                  flexBasis: "28%",
                  height: 40,
                  backgroundColor: "#eff0f5",
                  margin: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                key={i}
              >
                <Text>{item}</Text>
              </TouchableRipple>
            ))}
          </View>
        </View>
      )}
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
