import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

const Stack = createStackNavigator();

import ProductListScreen from "../screens/ProductListScreen/ProductListScreen";
import DrawerNavigators from "./DrawerNavigators";
import WishListScreen from "../screens/WishList";
import SearchScreen from "../screens/SearchScreen";
import CartStackScreen from "../screens/CartStackScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import CheckOut from "../screens/CheckOut";
import QnAStack from "./StackNavigators/QnAStack";
import MyOrders from "../screens/ProfileScreen/Listings/MyOrders";
import MyReviews from "../screens/ProfileScreen/Listings/MyReviews";
import MyWishlists from "../screens/ProfileScreen/Listings/MyWishlists";
import EditProfile from "../screens/ProfileScreen/EditProfile";
import { AuthStack } from "./StackNavigators";

export default function App(props) {
  return (
    <NavigationContainer headerMode="none">
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <Stack.Screen name="Home">
          {(prop) => <DrawerNavigators {...prop} customCategories={props} />}
        </Stack.Screen>
        {/* // component={DrawerNavigators} props={props}/> */}
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Products" component={ProductListScreen} />
        <Stack.Screen name="WishList" component={WishListScreen} />
        <Stack.Screen name="CartStack" component={CartStackScreen} />
        <Stack.Screen name="Detail" component={ProductDetailScreen} />
        <Stack.Screen name="QnA" component={QnAStack} />
        <Stack.Screen name="CheckOut" component={CheckOut} />
        <Stack.Screen name="My Orders" component={MyOrders} />
        <Stack.Screen name="My Reviews" component={MyReviews} />
        <Stack.Screen name="My Wishlists" component={MyWishlists} />
        <Stack.Screen name="Edit Profile" component={EditProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
