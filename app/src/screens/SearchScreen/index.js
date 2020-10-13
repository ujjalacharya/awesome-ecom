import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, AsyncStorage } from "react-native";
import { Searchbar, TouchableRipple, Button } from "react-native-paper";
import Constants from "../../constants/Constants";

import { AntDesign } from "@expo/vector-icons";

const SeachScreen = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistoryFromAsyncStorage();
  }, [])

  const fetchHistoryFromAsyncStorage = async() => {
    try {
      let asyncItems =  await AsyncStorage.getItem(
         '@uzzStore:history'
       );
 
       if(asyncItems){
         setHistory([...JSON.parse(asyncItems)])
       }
     } catch (error) {
       // Error saving data
     }
  }

  const onChangeSearch = (query) => setSearchQuery(query);

  const handleGo = async() => {
    let newItemsArr= [];
    try {
     let asyncItems =  await AsyncStorage.getItem(
        '@uzzStore:history'
      );

      if(asyncItems){
        newItemsArr = [searchQuery, ...JSON.parse(asyncItems)]
      }else{
        newItemsArr.push(searchQuery);
      }
      await AsyncStorage.setItem(
        '@uzzStore:history',
        JSON.stringify(newItemsArr)
      );
    } catch (error) {
      // Error saving data
    }
    props.navigation.navigate("Products")
  }

  const handleRemoveHistory = async() => {
    await AsyncStorage.removeItem(
      '@uzzStore:history'
      , ()=>{
        setHistory([])
      }
    );
  }

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
            onPress={() => handleGo()}
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
            <Button onPress={handleRemoveHistory}>
              <AntDesign name="delete" color="red" />
            </Button>
          </View>
        </View>
        <View style={{ minHeight: 200, flex: 1, flexDirection: "row", flexWrap: 'wrap' }}>
          {history.map(item => (
            <TouchableRipple onPress={()=> console.warn("history")} style={{flexBasis: '28%', height: 40, backgroundColor: "#eff0f5", margin: 10, justifyContent: "center", alignItems: "center"}}>
              <Text>{item}</Text>
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
