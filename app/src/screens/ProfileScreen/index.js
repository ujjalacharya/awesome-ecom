import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Appbar } from "react-native-paper";

import Constants from "../../constants/Constants";

import UserInfo from "./UserInfo";
import MyActions from "./MyActions";
import { ScrollView } from "react-native";
import { deauthenticate } from "../../../redux/actions/authActions";
import { getMyReviews } from "../../../redux/actions/userActions";
import Skeleton from "../../components/shared/Skeleton";
import { getWishListItems } from "../../../redux/actions/wishlistActions";
import { getOrders } from "../../../redux/actions/orderActions";

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.authentication);
  const { myReviews } = useSelector((state) => state.user);
  const { wishlistItems } = useSelector((state) => ({
    wishlistItems: state.wishlist.getWishlistItems
  }));
  const { myOrders } = useSelector((state) => ({
    myOrders: state.order.getOrders
  }));

  useEffect(() => {
    dispatch(getMyReviews(`page=1`, token));
    dispatch(getWishListItems(`page=1&perPage=10`, token));
    dispatch(getOrders(`page=1`, token));
  }, []);

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
        {(!myReviews || !wishlistItems || !myOrders) ? <Skeleton /> : <MyActions myReviews={myReviews} wishlistItems={wishlistItems} myOrders={myOrders}/>}
      </ScrollView>
    </>
  );
};

export default ProfileScreen;
