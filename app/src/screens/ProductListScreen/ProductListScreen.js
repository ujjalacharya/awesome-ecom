import React, { Component } from "react";
import { View } from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import SearchedSingleProduct from "./SearchedSingleProduct";
import { productData } from "../../utils/mock";
import SortModal from "./Modals/SortModal";
import FilterModal from "./Modals/FilterModal";
import ProductListHeader from "./ProductListHeader";
import Filters from "./Filters";

export class ProductListScreen extends Component {
  state = {
    progressBar: 0,
    intervalId: "",
    progressColor: "#b2cede",
    showSortModal: false,
    showFilterModal: false,
  };

  handleSortModalVisibility = () => {
    this.setState({
      showSortModal: !this.state.showSortModal,
    });
  };

  handleFilterModalVisibility = () => {
    this.setState({
      showFilterModal: !this.state.showFilterModal,
    });
  };

  render() {
    return (
      <>
        <SortModal
          handleSortModalVisibility={this.handleSortModalVisibility}
          showSortModal={this.state.showSortModal}
        />
        <FilterModal
          handleFilterModalVisibility={this.handleFilterModalVisibility}
          showFilterModal={this.state.showFilterModal}
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
              handleSortModalVisibility={this.handleSortModalVisibility}
              handleFilterModalVisibility={this.handleFilterModalVisibility}
            />
            <View style={{ flex: 5 }}>
              {productData.map((product, i) => (
                <SearchedSingleProduct
                  product={product}
                  key={i}
                  type="searched"
                  {...this.props}
                />
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
