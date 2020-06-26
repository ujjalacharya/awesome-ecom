import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import { LATEST_PRODUCTS, MENU_CATEGORIES } from '../types';
import { setCookie, removeCookie } from '../../utils/cookie';

const productCategories = () => {
  return async (dispatch) => {
    const resp = await fetch("http://localhost:3001/api/superadmin/product-categories");

    const data = await resp.json();

    console.log("data", data)
       dispatch({type: MENU_CATEGORIES, payload: data});
  }
}

const getLatestProducts = () => {
  return async (dispatch) => {
     const resp = await fetch("http://localhost:3001/api/product/latest");

     const data = await resp.json();

    //  console.log("data", data)
        dispatch({type: LATEST_PRODUCTS, payload: data});

    // axios.post(`/api/token`, { email, password })
    //   .then((response) => {
    //     setCookie('token', response.data.token);
    //     Router.push('/');
    //     dispatch({type: AUTHENTICATE, payload: response.data.token});
    //   })
    //   .catch((err) => {
    //     throw new Error(err);
    //   });
  };
};

export default {
    getLatestProducts,
    productCategories
};
