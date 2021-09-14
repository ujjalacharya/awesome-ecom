import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { AsyncStorage } from "react-native";

import RootRoute from "./routes";
import {
  productCategories,
  categoriesLoading,
} from "../redux/actions/productActions";
import { reauthenticate } from "../redux/actions/authActions";

import COLORCONSTANT from "./constants/Constants";
import { getChildCategories } from "../utils/common";
import GlobalErrorComponent from "./components/shared/GlobalErrorComponent";

export default function Main() {
  const [customCategories, setCustomCategories] = useState([]);
  const [token, setToken] = useState(null);
  const dispatch = useDispatch();

  const { menuCategories, loading } = useSelector(({ menu }) => {
    return menu;
  }, shallowEqual);

  // set token to state by fetching it from the async storage
  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("token");
      setToken(token);
    })();
  }, []);
  
  // reauthenticate token if token exists
  useEffect(() => {
    if (token) {
      // dispatch(reauthenticate(token));
    }
  }, [token]);

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
      <RootRoute customCategories={customCategories} />
    </PaperProvider>
  );
}
