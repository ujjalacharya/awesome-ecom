import { getCookie } from "./cookie";
import jwt from "jsonwebtoken";
import { initStore } from "../redux/index";
import actions from "../redux/actions";

export const getChildCategories = (allCategories, parentCategory) => {
  // let newParentCate = [];
  // let finalData = []
  // allCategories.map((cate) => {
  //   let parentCategoryElements = { ...cate };
  //   let childCate = [];
  //   allCategories.forEach((allCate) => {
  //     if (allCate.parent === cate._id) {
  //       childCate.push(allCate);
  //     }
  //   });
  //   parentCategoryElements.childCate = childCate;
  //   newParentCate.push(parentCategoryElements);
  // });

  // newParentCate.forEach(datum => {
  //   if (datum.parent === undefined) {
  //     finalData.push(datum);
  //   }
  // });
  // return finalData;

  let newParentCate = [];
  parentCategory.forEach((parentCate) => {
    let parentCategoryElements = { ...parentCate };
    let childCate = [];
    allCategories.forEach((allCate) => {
      if (allCate.parent === parentCate._id) {
        childCate.push(allCate);
      }
    });
    parentCategoryElements.childCate = childCate;
    newParentCate.push(parentCategoryElements);
  });
  return newParentCate;
};

export const handleRefreshToken = (req, callback) => {
  const token = getCookie("token", req);
  if (token) {
    const { exp } = jwt.decode(token);

    if (exp < (new Date().getTime() + 1) / 1000) {
      const refreshToken = { refreshToken: getCookie("refreshtoken", req) };
      initStore().dispatch(actions.refreshToken(refreshToken));
    }
  }
  return false;
};

// export const getDefaultImg = ()
