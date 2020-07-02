import jwt from "jsonwebtoken";
import * as moment from "moment-timezone";

export const getChildCategories = (allCategories, parentCategory) => {

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

export const isTokenExpired = (token) => {
  if (token) {
    const { exp } = jwt.decode(token);

    if (exp < (new Date().getTime() + 1) / 1000) {
      return true;
    }
    return false;
  }
  return false;
};

export const getUserInfo = (token) => {
  let data = ''
  if(token){
    data = jwt.decode(token);
    return data
  }
  return data
}

export const convertDateToCurrentTz = (date) =>{
  const currentTimeZone = moment.tz.guess();
  return moment
    .utc(date)
    .tz(currentTimeZone)
    .format("Do MMMM, YYYY")

}
