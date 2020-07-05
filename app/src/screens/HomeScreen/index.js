import React, { Component } from "react";
import { View, Image, ScrollView } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import HomeHeader from "./HomeHeader";

import { jorneyAction } from "../../store/actions/journey_actions";
import SearchView from "./SearchView";
import MainCarousel from "./MainCarousel";
import FeaturedProducts from "./FeaturedProducts";

export class HomeScreen extends Component {
  render() {
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        stickyHeaderIndices={[1]}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ height: 50 }}>
          <HomeHeader headerTitle="" {...this.props} />
        </View>
        <View style={{ height: 60 }}>
          <SearchView {...this.props} />
        </View>
        <View style={{ height: 800 }}>
          <View style={{ flex: 1.5 }}>
            <MainCarousel />
          </View>
          <View style={{ flex: 2 }}>
            <FeaturedProducts title={"Featured Products"} />
          </View>
          <View style={{ flex: 1 }}>
            <Image
              source={require("../../../assets/ad.jpg")}
              style={{ height: "100%" }}
            ></Image>
          </View>
          <View style={{ flex: 2 }}>
            <FeaturedProducts title={"Latest Products"} />
          </View>
        </View>
      </ScrollView>
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
