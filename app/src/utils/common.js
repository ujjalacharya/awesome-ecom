import { Dimensions } from "react-native";
import Colors from "../constants/Constants";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export const headerOptions = (headerTitle = "DHAN-GAADI") => ({
  title: null,
  headerStyle: {
    // backgroundColor: Colors.tintColor,
    backgroundColor: "transparent",
    elevation: 0,
  },
  headerTintColor: Colors.headerTintColor,
  // headerTitleStyle: {
  //   flex: 1,
  //   fontWeight: "bold",
  //   alignSelf: "center"
  // },
});

export const getPhoneDetails = () => {
  return {
    height,
    width,
  };
};
