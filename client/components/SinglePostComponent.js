import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../redux/actions";

class SinglePostComponent extends Component {
  render() {
    return (
      <div>
        <h1>Single post number {this.props.id}</h1>
        <h3>{this.props.isAuthenticated ? "Auth" : "NoAuth"}</h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.authentication.token,
});

export default connect(mapStateToProps, actions)(SinglePostComponent);
