import React, { Component, useEffect, useState } from "react";
import { Tabs } from "antd";
import { PlayCircleFilled } from "@ant-design/icons";
import QA from "./Includes/Q&A";
import AdditionalInformation from "./Includes/AdditionalInfo";
import Reviews from "./Includes/Reviews";
import ReviewsForm from "./Includes/ReviewForm";
import ProductVideo from "./Includes/ProductVideo";
import { IMAGE_BASE_URL } from "../../../utils/constants";
import { productDetailSkeleton } from "../../../utils/skeletons";

const { TabPane } = Tabs;

const OtherDetails = (props) => {
  console.log(props)
  let [openVideo, setOpenVideo] = useState(false);
  let [productDetail, setProductDetail] = useState(productDetailSkeleton)

  const openCloseVideoModal = () => {
    setOpenVideo(!openVideo)
  }

  const callback = (key) => { };

  useEffect(() => {
    if (props.data) {
      setProductDetail(props.data?.product)
    }
  }, [props.data?.product])

  let addInfo = {
    weight: productDetail?.weight,
    color: productDetail?.color,
    size: productDetail?.size,
    warranty: productDetail?.warranty,
  };

  console.log(productDetail)
  return (
    <div className="other-details">
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Description" key="1">
          <div className="desc-tab">
            <div className="title">Description</div>
            {productDetail?.description}
          </div>
        </TabPane>
        <TabPane tab="Additional Information" key="2">
          <AdditionalInformation data={addInfo} />
        </TabPane>
        <TabPane tab="Video" key="3">
          {
            productDetail?.videoURL.length > 0 ?
              <>
                <div className="product-vid-cov">
                  {
                    productDetail.videoURL.map((url, index) => {
                      return (
                        <div key={index} className="vid-cov">
                          <div className="product-video" onClick={openCloseVideoModal}>
                            <div className="overlay"></div>
                            <img src={`${IMAGE_BASE_URL}/${productDetail.images[0].large}`}
                              onError={(ev) => {
                                ev.target.src = "/images/default-image.png";
                              }} />
                            <PlayCircleFilled />
                          </div>
                          <ProductVideo
                            videoURL={url}
                            openVideo={openVideo}
                            onCloseVideo={openCloseVideoModal}
                          />
                        </div>
                      )
                    })
                  }
                </div>
              </> : 'No video available'
          }
        </TabPane>
        <TabPane tab="Q & A" key="4">
          <QA />
        </TabPane>
        <TabPane tab="Reviews" key="5">
          <Reviews data={productDetail} />
          {!productDetail.hasReviewed && productDetail.hasBought && <ReviewsForm />}
        </TabPane>
      </Tabs>
    </div>
  );
}

export default OtherDetails;
