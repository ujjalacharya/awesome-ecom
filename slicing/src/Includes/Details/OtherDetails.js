import React, { Component } from "react";
import { Tabs } from "antd";
import QA from "./Includes/Q&A";
import AdditionalInformation from "./Includes/AdditionalInfo";
import Reviews from "./Includes/Reviews";
import ReviewsForm from "./Includes/ReviewForm";

const { TabPane } = Tabs;

class OtherDetails extends Component {
  callback = (key) => {
    console.log(key);
  };

  render() {
    return (
      <div className="other-details">
        <Tabs defaultActiveKey="1" onChange={this.callback}>
          <TabPane tab="Q & A" key="1">
            <QA />
          </TabPane>
          <TabPane tab="Description" key="2">
            <div className="desc-tab">
              <div className="title">Description</div>
              <ul>
                <li>Lorem ipsum dolor sit amet</li>
                <li>consectetur adipiscing elit</li>
                <li>Lorem ipsum dolor sit amet</li>
                <li>Nam non enim mollis</li>
              </ul>
            </div>
          </TabPane>
          <TabPane tab="Additional Information" key="3">
            <AdditionalInformation />
          </TabPane>
          <TabPane tab="Reviews" key="4">
            <Reviews />
            <ReviewsForm />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default OtherDetails;
