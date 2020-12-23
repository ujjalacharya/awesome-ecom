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
          <TabPane tab="Description" key="1">
            <div className="desc-tab">
              <div className="title">Description</div>
              {product?.description}
            </div>
          </TabPane>
          <TabPane tab="Additional Information" key="2">
            <AdditionalInformation data={addInfo} />
          </TabPane>
          <TabPane tab="Video" key="3">
            {
              product?.videoURL.length > 0 ?
                <>
                  {
                    product.videoURL.map((url, index) => {
                      return (
                        <div className="product-vid-cov" key={index}>
                          <div className="product-video" onClick={this.openCloseVideoModal}>
                            <div className="overlay"></div>
                            <img src={`${IMAGE_BASE_URL}/${product.images[0].large}`} />
                            <PlayCircleFilled />
                          </div>
                          <ProductVideo
                            videoURL={url}
                            openVideo={this.state.openVideo}
                            onCloseVideo={this.openCloseVideoModal}
                          />
                        </div>
                      )
                    })
                  }
                </> : 'No video available'
            }
          </TabPane>
          <TabPane tab="Q & A" key="4">
            <QA />
          </TabPane>
          <TabPane tab="Reviews" key="5">
            <Reviews data={product} />
            {!this.props.data.product.hasReviewed && this.props.data.product.hasBought && <ReviewsForm />}
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default OtherDetails;
