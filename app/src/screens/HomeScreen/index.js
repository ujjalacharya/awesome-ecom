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

export class HomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <HomeHeader headerTitle="" {...this.props} />
        <View style={{ flex: 2 }}>
          <SearchView />
        </View>
        <View style={{ flex: 1 }}></View>
        <View style={{ flex: 1 }}>
          {/* <View style={styles.submitButtonContainer}>
            <Button
              mode="contained"
              onPress={() => {
                this.props.navigation.navigate("Search");
              }}
              style={styles.submitButton}
            >
              <Text style={{ fontSize: 20 }}>GO !</Text>
            </Button>
          </View> */}
        </View>
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
