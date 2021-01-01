import React, { Component } from "react";
import _ from 'lodash'

// includes
import Layout from "../../../src/Components/Layout";
import initialize from "../../../utils/initialize";
import actions from "../../../redux/actions";
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

    if(ctx.isServer){
      await ctx.store.dispatch(
        actions.searchFilter(`?cat_id=${ctx.query.cate}&cat_slug=${ctx.query.slug}`)
      );
  
      await ctx.store.dispatch(
        actions.getProductsByCategory(`?page=1&perPage=10&cat_id=${ctx.query.cate}&cat_slug=${ctx.query.slug}`, ctx)
      );
    }

  }

  render() {
    let { query } = this.props.router
    let title = _.capitalize(query.slug.split('-').join(' '))
    return (
      <Layout title={title}>
        <Listing getSearchFilter={this.props.listing.getSearchFilter} data={this.props.listing.getSearchData} perPage={this.state.perPage} />
      </Layout>
    );
  }
}

export default connect((state) => state)(withRouter(Search));
