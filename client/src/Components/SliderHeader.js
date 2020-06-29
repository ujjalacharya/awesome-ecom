import React, { Component } from "react";
import Link from "next/link";

class SliderHeader extends Component {
  render() {
    return (
      <div className={"slider-header " + this.props.removePaddingTop}>
        <h2>{this.props.headTitle}</h2>
        <div className="slider-detail">{this.props.headDetails}</div>
        <Link
          href={`/listing/[slug]`}
          key={this.props.listLink}
          as={`/listing/${this.props.listLink}`}
        >
          <a>View all</a>
        </Link>
      </div>
    );
  }
}

export default SliderHeader;
