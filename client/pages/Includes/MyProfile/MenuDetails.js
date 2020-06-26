import React, { Component } from "react";
import { Tabs } from "antd";
import { StickyContainer, Sticky } from "react-sticky";
import ProfileDetails from "./Includes/ProfileDetails";
import AddressDetails from "./Includes/AddressDetails";
import RecentOrders from "./Includes/RecentOrders";

const { TabPane } = Tabs;

class MenuDetails extends Component {
  render() {
    const renderTabBar = (props, DefaultTabBar) => (
      <Sticky bottomOffset={80}>
        {({ style }) => (
          <DefaultTabBar
            {...props}
            className="site-custom-tab-bar"
            style={{ ...style }}
          />
        )}
      </Sticky>
    );
    return (
      <div className="menu-details">
        <h3>Manage my accounts</h3>
        <StickyContainer>
          <Tabs defaultActiveKey="1" renderTabBar={renderTabBar}>
            <TabPane tab="My Profile" key="1">
              <ProfileDetails />
            </TabPane>
            <TabPane tab="My Address" key="2">
              <AddressDetails />
            </TabPane>
            <TabPane tab="Recent Orders" key="3">
              <RecentOrders />
            </TabPane>
          </Tabs>
        </StickyContainer>
      </div>
    );
  }
}

export default MenuDetails;
