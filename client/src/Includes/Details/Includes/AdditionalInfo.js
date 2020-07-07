import React, { Component } from "react";
import _ from 'lodash'

class AdditionalInformation extends Component {
  render() {
    let { data } = this.props;
    return (
      <div className="add-info">
        <div className="title">Additional Information</div>
        <div className="add-info-details">
          <div className="feature-detail">
            <div className="feature">WEIGHT</div>
            <div className="detail">
              {data?.weight?.map((weight, i) => (
                <span key={i}>
                  {weight}
                  {data?.weight.length !== i + 1 && ","}
                </span>
              ))}
              {_.isEmpty(data?.weight) && '-'}
            </div>
          </div>
          <div className="feature-detail">
            <div className="feature">DIMENSIONS</div>
            <div className="detail">{data?.size}</div>
          </div>
          <div className="feature-detail">
            <div className="feature">COLOR</div>
            <div className="detail">
              {data?.color?.map((color, i) => (
                <span key={i}>
                  {color}
                  {data?.color.length !== i + 1 && ","}
                </span>
              ))}
              {_.isEmpty(data?.color) && '-'}
            </div>
          </div>
          <div className="feature-detail">
            <div className="feature">Warrenty</div>
            <div className="detail">{data?.warranty}</div>
          </div>
          {/* <div className="feature-detail">
            <div className="feature">SIZE</div>
            <div className="detail">10, 7, 8</div>
          </div> */}
        </div>
      </div>
    );
  }
}

export default AdditionalInformation;
