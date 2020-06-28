import React, { Component } from "react";
import { Row, Col, Pagination, Drawer } from "antd";

// includes
import ProductList from "../../src/Includes/Listing/ProductList";
import Layout from "../../src/Components/Layout";
import initialize from "../../utils/initialize";
import actions from "../../redux/actions";
import Filter from "../../src/Includes/Listing/Filter";
import Listing from "../Listing";

class Search extends Component {
  static async getInitialProps(ctx) {
    initialize(ctx);

    const {
      query: { slug },
    } = ctx;

    let data = []
    if (ctx.query.slug === "latestProducts") {
      data = await ctx.store.dispatch(actions.getLatestProducts());
    }

    const menuData = await ctx.store.dispatch(actions.productCategories());

    const allBrands = await ctx.store.dispatch(actions.getProductBrands());

    // console.log(ctx.query)
    const searchData = await ctx.store.dispatch(actions.searchProducts('?page=1', {keyword: ctx.query.slug}))

    return {
      data,
      allBrands
    };
  }

  render() {
    
    return (
      <Layout>
        <Listing allBrands={this.props.allBrands} data={this.props.data} />
      </Layout>
    );
  }
}

export default Search;
