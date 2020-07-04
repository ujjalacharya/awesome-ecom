import React, { Component } from "react";
import initialize from "../../utils/initialize";
import Layout from "../../src/Components/Layout";

export class Post extends Component {
  static async getInitialProps(ctx) {
    initialize(ctx);
    
    const {
      query: { id },
    } = ctx;
    
    // const data = await ctx.store.dispatch(actions.getLatestProducts());

    return {
      id,
    };
  }
  render() {
    return (
      <Layout title={`Post ${this.props.id}`}>
        {/* <SinglePostComponent id={this.props.id} /> */}
      </Layout>
    );
  }
}

export default Post;
