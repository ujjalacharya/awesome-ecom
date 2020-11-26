import React, { Component } from "react";
import { Row, Col, Pagination, Drawer } from "antd";

// includes
import ProductList from "../../../src/Includes/Listing/ProductList";
import Layout from "../../../src/Components/Layout";
import initialize from "../../../utils/initialize";
import actions from "../../../redux/actions";
import Filter from "../../../src/Includes/Listing/Filter";
import Listing from "../../listing";
import { connect } from "react-redux";
import { withRouter } from "next/router";

class Search extends Component {
  state = {
    perPage: 10,
  };
  static async getInitialProps(ctx) {
    initialize(ctx);

    const {
      query: { slug },
    } = ctx;

    const searchFilter = await ctx.store.dispatch(
      actions.searchFilter(`?cat_id=${ctx.query.cate}&cat_slug=${ctx.query.slug}`)
    );

    // let body = {
    //   cat_id: ctx.query.cate,
    //   cat_slug: ctx.query.slug
    // }

    const searchData = await ctx.store.dispatch(
      actions.getProductsByCategory(`?page=1&perPage=10&cat_id=${ctx.query.cate}&cat_slug=${ctx.query.slug}`)
    );

    // return {
    //   searchData,
    //   searchFilter
    // };
  }

  render() {
    return (
      <Layout>
        <Listing getSearchFilter={this.props.listing.getSearchFilter} data={this.props.listing.getSearchData} perPage={this.state.perPage} />
      </Layout>
    );
  }
}

export default connect((state) => state)(withRouter(Search));
