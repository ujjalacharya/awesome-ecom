import React, { Component } from "react";

export default class PrevArrow extends Component {
  render() {
    const { className, onClick } = this.props;
    return (
      <img
        src="/images/left-arrow.png"
        alt="left arrow"
        className={className + " arr"}
        onClick={onClick}
      />
    );
  }
}