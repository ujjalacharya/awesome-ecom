import jwt from "jsonwebtoken";
import * as moment from "moment-timezone";
import { notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

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
  let data = "";
  if (token) {
    data = jwt.decode(token);
    return data;
  }
  return data;
};

export const convertDateToCurrentTz = (date) => {
  const currentTimeZone = moment.tz.guess();
  return moment.utc(date).tz(currentTimeZone).format("Do MMMM, YYYY");
};

export const getFilterAppendBody = (body, props, filter, type) => {
  let pathName = props.router.pathname.split("/")[1];
  if (_.isEmpty(body)) {
    if (pathName === "search") {
      if (_.isEmpty(filter)) {
        body = {
          keyword: props.router.query.slug,
        };
      } else {
        body = {
          keyword: props.router.query.slug,
          [type]: filter,
        };
      }
    } else if (pathName === "category") {
      if (_.isEmpty(filter)) {
        body = {
          cat_id: props.router.query.cate,
        };
      } else {
        body = {
          cat_id: props.router.query.cate,
          [type]: filter,
        };
      }
    }
  } else {
    if (pathName === "search") {
      if (_.isEmpty(filter)) {
        delete body[type];
      } else {
        body = {
          ...body,
          [type]: filter,
        };
      }
    } else if (pathName === "category") {
      if (_.isEmpty(filter)) {
        delete body[type];
      } else {
        body = {
          ...body,
          [type]: filter,
        };
      }
    }
  }

  return body;
};

export const getBrandOptions = (data) => {
  let brandOptions = [];
  data.brands &&
    data.brands.length > 0 &&
    data.brands.map((brand) => {
      let ele = { label: brand.brandName, value: brand._id };
      brandOptions.push(ele);
    });
  return brandOptions;
};

export const getColorOptions = (data) => {
  let colorOptions = [];
  data &&
    data.colors &&
    data.colors.length > 0 &&
    data.colors.map((color) => {
      let ele = { label: color, value: color };
      colorOptions.push(ele);
    });
  return colorOptions;
};

export const openNotification = (title, description) => {
  notification.open({
    message: title,
    description: description,
    icon: <SmileOutlined style={{ color: "#108ee9" }} />,
  });
};

export const getDiscountedPrice = (price, discountRate) => {
  let discountedPrice = price - ((price * discountRate) / 100)
  return discountedPrice
}
