import React, { Component } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import { Colors, TouchableRipple } from "react-native-paper";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import HomeHeader from "../../components/HomeHeader";
import { Button, Card } from "react-native-paper";
import ConstantColors from "../../constants/ConstantColors";
import AllBusScrollView from "../../components/AllBusScrollView";

import { jorneyAction } from "../../store/actions/journey_actions";

export class HomeScreen extends Component {
  state = {};

  render() {
    return (
      <>
        <HomeHeader headerTitle="" {...this.props}/>
        <View style={styles.container}>
          <Card style={{ height: "55%", width: "90%", marginTop: 10 }}>
            <View style={styles.submitButtonContainer}>
              <Button
                mode="contained"
                onPress={() => {
                  this.props.navigation.navigate("Search");
                }}
                style={styles.submitButton}
              >
                <Text style={{ fontSize: 20 }}>GO !</Text>
              </Button>
            </View>
          </Card>
          <AllBusScrollView />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    // marginTop: 30,
    alignItems: "center",
  },

  searchbarContainer: {
    height: "15%",
    justifyContent: "center",
    alignItems: "center",
    // marginTop: -30,
  },

  inputField: {
    marginTop: 20,
    height: 40,
    backgroundColor: ConstantColors.initialColor,
    justifyContent: "center",
    borderColor: Colors.tintColor,
    borderWidth: 1,
    borderRadius: 5,
    elevation: 5,
  },

  inputText: {
    padding: 15,
    color: "black",
    fontSize: 15,
  },

  pickerContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  datePickerCircleContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  circleButton: {
    padding: 5,
    height: 80,
    width: 80, //The Width must be the same as the height
    borderRadius: 200, //Then Make the Border Radius twice the size of width or Height
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    elevation: 10,
    borderColor: ConstantColors.tintColor,
    borderWidth: 1,
  },

  submitButtonContainer: {
    marginTop: 25,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  submitButton: {
    width: "100%",
    borderRadius: 50,
    flex: 1,
    justifyContent: "center",
    borderColor: ConstantColors.tintColor,
    borderWidth: 1,
  },
});

function mapStateToProps(state) {
  return {
    Journey: state.Journey.journey_store,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ jorneyAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
