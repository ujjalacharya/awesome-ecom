import React, { Component } from "react";
import Layout from "../../components/Layout";
import SinglePostComponent from "../../components/SinglePostComponent";
import initialize from "../../utils/initialize";
import actions from "../../redux/actions";

export class Post extends Component {
  static async getInitialProps(ctx) {
    initialize(ctx);

    const {
      query: { id },
    } = ctx;

    const data = await ctx.store.dispatch(actions.getLatestProducts());

    return {
      id,
    };
  }
  render() {
    return (
      <Layout title={`Post ${this.props.id}`}>
        <SinglePostComponent id={this.props.id} />
      </Layout>
    );
  }
}

export default Post;
