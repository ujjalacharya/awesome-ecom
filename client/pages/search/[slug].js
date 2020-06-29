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
  state = {
    perPage : 10
  }
  static async getInitialProps(ctx) {
    initialize(ctx);

    const {
      query: { slug },
    } = ctx;

    const menuData = await ctx.store.dispatch(actions.productCategories());

    const getSearchData = await ctx.store.dispatch(actions.searchFilter(`?keyword=${ctx.query.slug}`));

    // console.log(ctx.query)
    const searchData = await ctx.store.dispatch(actions.searchProducts(`?page=1&perPage=10`, {keyword: ctx.query.slug}))

    return {
      searchData,
      getSearchData
    };
  }

  render() {
    console.log(this.props)
    return (
      <Layout>
        <Listing getSearchData={this.props.getSearchData} data={this.props.searchData} perPage={this.state.perPage} />
      </Layout>
    );
  }
}

export default Search;
