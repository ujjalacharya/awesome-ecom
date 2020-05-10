import React, { Component } from "react";

class SliderHeader extends Component {
  render() {
    return (
      <div className={"slider-header "+this.props.removePaddingTop} >
        <h2>{this.props.headTitle}</h2>
        <div className="slider-detail">
          {this.props.headDetails}
        </div>
      </div>
    );
  }
}

export default SliderHeader;
