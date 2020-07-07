import React, { Component } from "react";
import { Text, View } from "react-native";
import { Appbar } from "react-native-paper";

import { ScrollView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

import { connect } from "react-redux";
import SearchedSingleProduct from "../../components/SearchedSingleProduct";
import { productData } from "../../utils/mock";
import Constants from "../../constants/Constants";

export class ProductListScreen extends Component {
  state = {
    progressBar: 0,
    intervalId: "",
    progressColor: "#b2cede",
  };

  _goBack = () => {
    this.props.navigation.pop();
  };

  render() {
    return (
      <View>
        <Appbar.Header statusBarHeight={0}>
          <Appbar.BackAction
            color={Constants.headerTintColor}
            onPress={this._goBack}
          />
          <Appbar.Content title="Search" color={Constants.headerTintColor} />
          <Appbar.Action
            color={Constants.headerTintColor}
            icon={() => (
              <AntDesign
                name="search1"
                size={20}
                color={Constants.headerTintColor}
              />
            )}
            onPress={() => this.props.navigation.pop()}
          />
          <Appbar.Action
            color={Constants.headerTintColor}
            icon="heart"
            onPress={() => this.props.navigation.navigate("WishList")}
          />
          <Appbar.Action
            color={Constants.headerTintColor}
            icon={() => (
              <AntDesign
                name="shoppingcart"
                size={20}
                color={Constants.headerTintColor}
              />
            )}
            onPress={() => this.props.navigation.navigate("CartStack")}
          />
        </Appbar.Header>
        {/* <ActivityIndicator animating={true} color={Constants.tintColor}/> */}
        <ScrollView
          style={{ height: "85%", margin: 15 }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {productData.map((bus, i) => (
            <SearchedSingleProduct bus={bus} key={i} />
          ))}
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    Journey: state.Journey.journey_store,
  };
}

export default connect(mapStateToProps)(ProductListScreen);
