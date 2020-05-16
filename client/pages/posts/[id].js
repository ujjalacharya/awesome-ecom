import React, { Component } from "react";
import Layout from "../../components/Layout";

export class Post extends Component {
  static getInitialProps({ query: { id } }) {
    return {
      id,
    };
  }
  render() {
    return (
      <Layout>
        <h1>Single post number {this.props.id}</h1>
       </Layout>
    );
  }
}

export default Post;
