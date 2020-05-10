import React, { Component } from "react";

export default class NextArrow extends Component {
    render() {
      const { className, onClick } = this.props;
      return (
        <img
          src="/images/right-arrow.png"
          alt="left arrow"
          className={className + " arr"}
          onClick={onClick}
        />
      );
    }
  }