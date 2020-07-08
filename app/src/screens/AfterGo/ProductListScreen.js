import React, { Component } from "react";
import { View } from "react-native";

import { ScrollView } from "react-native-gesture-handler";

import { connect } from "react-redux";
import SearchedSingleProduct from "./SearchedSingleProduct";
import { productData } from "../../utils/mock";
import SortModal from "./Modals/SortModal";
import ProductListHeader from "./ProductListHeader";
import Filters from "./Filters";

export class ProductListScreen extends Component {
  state = {
    progressBar: 0,
    intervalId: "",
    progressColor: "#b2cede",
    showModal: false,
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
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            stickyHeaderIndices={[1]}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <ProductListHeader {...this.props} />
            <Filters
              {...this.props}
              handleModalVisibility={this.handleModalVisibility}
            />
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

function mapStateToProps(state) {
  return {
    Journey: state.Journey.journey_store,
  };
}

export default connect(mapStateToProps)(ProductListScreen);
