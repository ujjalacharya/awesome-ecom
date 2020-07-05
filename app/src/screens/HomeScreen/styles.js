import { StyleSheet } from "react-native";
import Constants from "../../constants/Constants";

export default styles = StyleSheet.create({
  searchViewWrapper: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Constants.tintColor,
  },

  inputField: {
    flex: 1,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: Constants.cardColor,
    borderColor: Constants.tintColor,
    borderWidth: 1,
    borderRadius: 5,
    // elevation: 5,
    width: "90%",
  },

  inputText: {
    paddingLeft: 10,
    color: Constants.grayColor ,
    fontSize: 15,
  },

  searchIconWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  searchText: {
     flex: 4, justifyContent: "center" 
  }
});
