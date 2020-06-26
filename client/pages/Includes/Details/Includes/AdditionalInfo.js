import React, { Component } from "react";

class AdditionalInformation extends Component {
  render() {
    return (
      <div className="add-info">
        <div className="title">Additional Information</div>
        <div className="add-info-details">
            <div className="feature-detail">
                <div className="feature">WEIGHT</div>
                <div className="detail">300 g</div>
            </div>
            <div className="feature-detail">
                <div className="feature">DIMENSIONS</div>
                <div className="detail">5 × 3 × 7 cm</div>
            </div>
            <div className="feature-detail">
                <div className="feature">COLOR</div>
                <div className="detail">Black, Blue, Green</div>
            </div>
            <div className="feature-detail">
                <div className="feature">SIZE</div>
                <div className="detail">10, 7, 8</div>
            </div>
        </div>
      </div>
    );
  }
}

export default AdditionalInformation;
