import React, { useState } from "react";
import { useSelector } from "react-redux";
import { View } from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import SearchedSingleProduct from "./SearchedSingleProduct";
import { productData } from "../../utils/mock";
import SortModal from "./Modals/SortModal";
import FilterModal from "./Modals/FilterModal";
import ProductListHeader from "./ProductListHeader";
import Filters from "./Filters";
import Skeleton from "../../components/shared/Skeleton";

const ProductListScreen = (props) => {
  const [state, setState] = useState({
    progressBar: 0,
    intervalId: "",
    progressColor: "#b2cede",
    showSortModal: false,
    showFilterModal: false,
  });

  const { getSearchData, getSearchDataLoading } = useSelector(
    ({ listing }) => listing
  );

  const handleSortModalVisibility = () => {
    setState((prevState) => ({
      ...prevState,
      showSortModal: !prevState.showSortModal,
    }));
  };

  const handleFilterModalVisibility = () => {
    setState((prevState) => ({
      ...prevState,
      showFilterModal: !prevState.showFilterModal,
    }));
  };

  return (
    <>
      <SortModal
        handleSortModalVisibility={handleSortModalVisibility}
        showSortModal={state.showSortModal}
      />
      <FilterModal
        handleFilterModalVisibility={handleFilterModalVisibility}
        showFilterModal={state.showFilterModal}
      />
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          stickyHeaderIndices={[1]}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <ProductListHeader {...props} />
          {getSearchDataLoading ? (
            <Skeleton />
          ) : (
            <>
              <Filters
                {...props}
                handleSortModalVisibility={handleSortModalVisibility}
                handleFilterModalVisibility={handleFilterModalVisibility}
              />
              <View style={{ flex: 5 }}>
                {getSearchData?.products.map((product, i) => (
                  <SearchedSingleProduct
                    product={product}
                    key={i}
                    type="searched"
                    {...props}
                  />
                ))}
              </View>
            </>
          )}
        </ScrollView>
      </View>
    </>
  );
};

export default ProductListScreen;
