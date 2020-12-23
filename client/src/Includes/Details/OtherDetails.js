import React, { Component } from "react";
import { Tabs } from "antd";
import { PlayCircleFilled } from "@ant-design/icons";
import QA from "./Includes/Q&A";
import AdditionalInformation from "./Includes/AdditionalInfo";
import Reviews from "./Includes/Reviews";
import ReviewsForm from "./Includes/ReviewForm";
import ProductVideo from "./Includes/ProductVideo";
import { IMAGE_BASE_URL } from "../../../utils/constants";

const { TabPane } = Tabs;

class OtherDetails extends Component {
  state = {
    openVideo: false
  }

  callback = (key) => { };

  openCloseVideoModal = () => {
    this.setState({
      openVideo: !this.state.openVideo
    })
  }

  render() {
    let {
      data: { product },
    } = this.props;

    let addInfo = {
      weight: product?.weight,
      color: product?.color,
      size: product?.size,
      warranty: product?.warranty,
    };

    return (
      <div className="other-details">
        <Tabs defaultActiveKey="1" onChange={this.callback}>
          <TabPane tab="Q & A" key="1">
            <QA />
          </TabPane>
          <TabPane tab="Description" key="2">
            <div className="desc-tab">
              <div className="title">Description</div>
              {product?.description}
            </div>
          </TabPane>
          <TabPane tab="Additional Information" key="3">
            <AdditionalInformation data={addInfo} />
          </TabPane>
          <TabPane tab="Reviews" key="4">
            <Reviews data={product} />
            {!this.props.data.hasReviewed && this.props.data.hasBought && <ReviewsForm />}
          </TabPane>
          <TabPane tab="Video" key="5">
            <div className="product-video" onClick={this.openCloseVideoModal}>
              <div className="overlay"></div>
              <img src={`${IMAGE_BASE_URL}/${product.images[0].large}`} />
              <PlayCircleFilled />
            </div>
            {/* {<button onClick={this.openCloseVideoModal}>open video</button>} */}
            <ProductVideo
              data={product}
              openVideo={this.state.openVideo}
              onCloseVideo={this.openCloseVideoModal}
            />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default OtherDetails;
