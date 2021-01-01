import React, { useEffect, useRef } from "react";
import { capitalize } from 'lodash'

// includes
import Layout from "../../../src/Components/Layout";
import initialize from "../../../utils/initialize";
import actions from "../../../redux/actions";
import Listing from "../../listing";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "next/router";

function previousQuery(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const Search = (props) => {
  let dispatch = useDispatch();

  const listing = useSelector((state) => state.listing)

  let { query } = props.router
  let title = capitalize(query.slug.split('-').join(' '));
  let prevQuery = previousQuery(query.slug)
  
  useEffect(() => {
    if (prevQuery !== undefined && prevQuery !== query.slug) {
      dispatch(actions.searchFilter(`?cat_id=${query.cate}&cat_slug=${query.slug}`))
      dispatch(actions.getProductsByCategory(`?page=1&perPage=10&cat_id=${query.cate}&cat_slug=${query.slug}`))
    }
  }, [query.slug])

  return (
    <Layout title={title}>
      <Listing getSearchFilter={listing.getSearchFilter} data={listing.getSearchData} perPage={10} />
    </Layout>
  );
}

Search.getInitialProps = async (ctx) => {
  initialize(ctx);

  if (ctx.isServer) {
    await ctx.store.dispatch(
      actions.searchFilter(`?cat_id=${ctx.query.cate}&cat_slug=${ctx.query.slug}`)
    );

    await ctx.store.dispatch(
      actions.getProductsByCategory(`?page=1&perPage=10&cat_id=${ctx.query.cate}&cat_slug=${ctx.query.slug}`, ctx)
    );
  }
}

export default withRouter(Search);
