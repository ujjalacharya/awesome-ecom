import React, { Component } from "react";
import { Text, View, StyleSheet, Alert, Dimensions } from "react-native";
import { Colors, TouchableRipple } from "react-native-paper";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import HomeHeader from "./HomeHeader";
import { Button, Card } from "react-native-paper";
import AllProductScrollView from "../../components/AllProductScrollView";

import { jorneyAction } from "../../store/actions/journey_actions";
import SearchView from "./SearchView";
import MainCarousel from "./MainCarousel";

export class HomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <HomeHeader headerTitle="" {...this.props} />
        <View style={{ flex: 2 }}>
          <View style={{ flex: 1 }}>
            <SearchView {...this.props} />
            {/* <View style={{ flex: 0.25 }}></View> */}

            <View style={{ flex: 4 }}>
              <MainCarousel />
            </View>
            <View style={{ flex: 1 }}></View>
          </View>
        </View>
        <View style={{ flex: 1 }}></View>
        <View style={{ flex: 1 }}></View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    Journey: state.Journey.journey_store,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ jorneyAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
