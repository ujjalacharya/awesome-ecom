import React, { Component } from "react";
import { View, Image } from "react-native";
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
      <View style={{ flex: 1 }}>
        <HomeHeader headerTitle="" {...this.props} />
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <SearchView {...this.props} />
          </View>

          <View style={{ flex: 3 }}>
            <MainCarousel />
          </View>
        </View>
        <View style={{ flex: 0.75 }}>
          <FeaturedProducts title={"Featured Products"} />
        </View>
        <View style={{ flex: 0.5 }}>
          <Image
            source={{
              uri:
                "https://lh3.googleusercontent.com/proxy/KM_PfdEEjZV3cFAiZBM7y4zeFXq7zLMYO3CWHoN34LEzMLvXQf2_nUNjstkEcMtqGgCcVtoqS14GnUF2DORHojy3jk4CnPG333-gyX0zzVIBs6O88sNL78L48uCm8bDIjPTIL-pZt0TUkInhJ8igKh8x_3-kVg",
            }}
            style={{height: "100%"}}
          ></Image>
        </View>
        <View style={{ flex: 0.75 }}>
          <FeaturedProducts title={"Latest Products"} />
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
