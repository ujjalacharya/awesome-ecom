import { Dimensions } from "react-native";
import Colors from "../constants/Constants";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export const headerOptions = () => ({
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

export const emailValidator = (email) => {
  if (!email) return "Email is required";
  return false;
}

export const passwordValidator = (password) => {
  if (!password) return "Password is required";
  return false;
}