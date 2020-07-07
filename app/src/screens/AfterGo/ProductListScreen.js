import React, { Component } from "react";
import { Text, View } from "react-native";
import { Appbar } from "react-native-paper";

import { connect } from "react-redux";
import SearchedSingleProduct from "../../components/SearchedSingleProduct";
import { ScrollView } from "react-native-gesture-handler";
import { productData } from "../../utils/mock";

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
        <Appbar.Header>
          <Appbar.BackAction onPress={this._goBack} />
          <Appbar.Content title="Search" />
        </Appbar.Header>
        {/* <ActivityIndicator animating={true} color={Constants.tintColor}/> */}
        <ScrollView
          style={{ height: "85%", margin: 15 }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {productData.map((bus, i) => (
            <SearchedSingleProduct bus={bus} key={i}/>
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
