import React, { useEffect } from "react";
import { capitalize } from 'lodash'

// includes
import Layout from "../../../src/Components/Layout";
import Listing from "../../listing";

// redux
import actions from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

// next router
import { withRouter } from "next/router";

// utils
import initialize from "../../../utils/initialize";
import { previousQuery } from "../../../utils/common";

const Category = (props) => {
  let dispatch = useDispatch();

  const listing = useSelector((state) => state.listing);
  const perPage = 10

  let { query } = props.router
  let title = capitalize(query.slug.split('-').join(' '));
  let prevQuery = previousQuery(query.slug)

  useEffect(() => {
    if (
      !props.isServer &&
      prevQuery !== query.slug
    ) {
      dispatch(actions.searchFilter(`?cat_id=${query.cate}&cat_slug=${query.slug}`))
      dispatch(actions.getProductsByCategory(`?page=1&perPage=${perPage}&cat_id=${query.cate}&cat_slug=${query.slug}&createdAt=asc`))
    }
  }, [query.slug])

  let body = {cat_id: query.cate}
  return (
    <Layout title={title}>
      <Listing 
        getSearchFilter={listing.getSearchFilter} 
        data={listing.getSearchData} 
        perPage={perPage} 
        body={body} 
        listType="category"
      />
    </Layout>
  );
}

Category.getInitialProps = async (ctx) => {
  initialize(ctx);

  if (ctx.isServer) {
    await ctx.store.dispatch(
      actions.searchFilter(`?cat_id=${ctx.query.cate}&cat_slug=${ctx.query.slug}`)
    );

    await ctx.store.dispatch(
      actions.getProductsByCategory(`?page=1&perPage=10&cat_id=${ctx.query.cate}&cat_slug=${ctx.query.slug}&createdAt=asc`, ctx)
    );
  }

  return {
    isServer: ctx.isServer
  }
}

export default withRouter(Category);
