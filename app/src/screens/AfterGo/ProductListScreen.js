import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Appbar, Button } from "react-native-paper";

import { ScrollView } from "react-native-gesture-handler";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

import { connect } from "react-redux";
import SearchedSingleProduct from "../../components/SearchedSingleProduct";
import { productData } from "../../utils/mock";
import Constants from "../../constants/Constants";
import SortModal from "./Modals/SortModal";

export class ProductListScreen extends Component {
  state = {
    progressBar: 0,
    intervalId: "",
    progressColor: "#b2cede",
    showModal: false,
  };

  _goBack = () => {
    this.props.navigation.pop();
  };

  handleModalVisibility = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  render() {
    return (
      <>
        <SortModal
          handleModalVisibility={this.handleModalVisibility}
          showModal={this.state.showModal}
          addressState={this.state.addressState}
          handleFromTo={this.handleFromTo}
        />
        <View style={{ flex: 1 }}>
          {/* <ActivityIndicator animating={true} color={Constants.tintColor}/> */}
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            stickyHeaderIndices={[1]}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <Appbar.Header statusBarHeight={0}>
              <Appbar.BackAction
                color={Constants.headerTintColor}
                onPress={this._goBack}
              />
              <Appbar.Content
                title="Search"
                color={Constants.headerTintColor}
              />
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
            <View
              style={{
                height: 50,
                borderBottomWidth: 2,
                borderColor: Constants.initialColor,
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                }}
              >
                <View style={styles.filterWrapper}>
                  <Button
                    onPress={this.handleModalVisibility}
                    style={{ width: "100%" }}
                  >
                    <MaterialCommunityIcons
                      name="sort"
                      size={Constants.normalScreenDescriptionSize}
                      color="black"
                    />
                    <Text
                      style={{
                        color: "black",
                        fontSize: Constants.normalScreenDescriptionSize,
                      }}
                    >
                      {"SORT"}
                    </Text>
                  </Button>
                </View>
                <View
                  style={{
                    flex: 0.01,
                    backgroundColor: Constants.initialColor,
                  }}
                >
                  <Text> </Text>
                </View>
                <View style={styles.filterWrapper}>
                  <Button style={{ width: "100%" }}>
                    <MaterialCommunityIcons
                      name="filter"
                      size={Constants.normalScreenDescriptionSize}
                      color="black"
                    />
                    <Text
                      style={{
                        color: "black",
                        fontSize: Constants.normalScreenDescriptionSize,
                      }}
                    >
                      {"FILTER"}
                    </Text>
                  </Button>
                </View>
              </View>
            </View>
            <View style={{ flex: 5 }}>
              {productData.map((bus, i) => (
                <SearchedSingleProduct bus={bus} key={i} />
              ))}
            </View>
          </ScrollView>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  filterWrapper: {
    flex: 1,
    backgroundColor: Constants.headerTintColor,
    justifyContent: "center",
    alignItems: "center",
  },
});

function mapStateToProps(state) {
  return {
    Journey: state.Journey.journey_store,
  };
}

export default connect(mapStateToProps)(ProductListScreen);
