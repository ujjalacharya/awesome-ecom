import React, { useEffect, useRef } from "react";
import { capitalize } from 'lodash'

// includes
import Layout from "../../src/Components/Layout";

// utils
import initialize from "../../utils/initialize";
import Listing from "../listing";

// next router
import { withRouter } from "next/router";

// redux
import actions from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

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
    if (!props.isServer && prevQuery !== query.slug) {
      dispatch(actions.searchFilter(`?keyword=${query.slug}`))
      dispatch(actions.searchProducts(`?page=1&perPage=10`, {keyword: query.slug} ))
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
      actions.searchFilter(`?keyword=${ctx.query.slug}`)
    );

    await ctx.store.dispatch(
      actions.searchProducts(`?page=1&perPage=10`, {keyword: ctx.query.slug})
    );
  }

  return {
    isServer
  }
}

export default withRouter(Search);
