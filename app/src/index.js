import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import RootRoute from "./routes";
import {
  productCategories,
  categoriesLoading,
} from "../redux/actions/productActions";

import COLORCONSTANT from "./constants/Constants";
import { getChildCategories } from "../utils/common";
import GlobalErrorComponent from "./components/shared/GlobalErrorComponent";

export default function Main() {
  const [customCategories, setCustomCategories] = useState([]);
  const dispatch = useDispatch();

  const { menuCategories, loading } = useSelector(({ menu }) => {
    return menu;
  }, shallowEqual);

  useEffect(() => {
    dispatch(categoriesLoading());
    dispatch(productCategories());
  }, [dispatch]);

  useEffect(() => {
    if (menuCategories) {
      let parentCategory = [];
      let parentCate = [];
      let { categories } = menuCategories;
      categories.map((cate) => {
        if (cate.parent === undefined) {
          parentCategory.push(cate);
        }
      });

      let allCates = getChildCategories(categories, parentCategory);

      allCates.map((newChild) => {
        let newallCates = getChildCategories(categories, newChild.childCate);
        let parentCateEle = { ...newChild, childCate: newallCates };
        parentCate.push(parentCateEle);
      });

      setCustomCategories(parentCate);
    }
  }, [loading]);

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    dark: false,
    mode: "adaptive",
    colors: {
      ...DefaultTheme.colors,
      primary: COLORCONSTANT.tintColor,
      accent: "#f1c40f",
    },
  };

  return (
    <PaperProvider theme={theme}>
      <GlobalErrorComponent />
      <RootRoute customCategories={customCategories}/>
    </PaperProvider>
  );
}