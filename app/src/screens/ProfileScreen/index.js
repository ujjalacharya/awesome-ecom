import React from "react";

import { useDispatch } from "react-redux";
import { Appbar } from "react-native-paper";

import Constants from "../../constants/Constants";

import UserInfo from "./UserInfo";
import MyActions from "./MyActions";
import { ScrollView } from "react-native";
import { deauthenticate } from "../../../redux/actions/authActions";

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(deauthenticate());
  };

  return (
    <>
      <Appbar.Header statusBarHeight={0}>
        <Appbar.Content title="Profile" color={Constants.headerTintColor} />
        <Appbar.Action icon="logout" color="white" onPress={handleLogout} />
      </Appbar.Header>
      <ScrollView>
        <UserInfo />
        <MyActions />
      </ScrollView>
    </>
  );
};

export default ProfileScreen;
