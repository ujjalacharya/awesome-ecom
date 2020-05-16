import React, { Component } from "react";
import Layout from "../../components/Layout";
import SinglePostComponent from "../../components/SinglePostComponent";
import initialize from "../../utils/initialize";

export class Post extends Component {
  static getInitialProps(ctx) {
    initialize(ctx);

    const {
      query: { id },
    } = ctx;

    return {
      id,
    };
  }
  render() {
    return (
      <Layout>
        <SinglePostComponent id={this.props.id}/>
      </Layout>
    );
  }
}

export default Post;
