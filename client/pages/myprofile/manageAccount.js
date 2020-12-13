import React, { Component } from "react";
import { Tabs } from "antd";
import { StickyContainer, Sticky } from "react-sticky";
import _ from "lodash";

//includes
import ProfileDetails from "../../src/Includes/MyProfile/Includes/ProfileDetails";
import AddressDetails from "../../src/Includes/MyProfile/Includes/AddressDetails";
import MyProfile from "./index";
import { connect } from "react-redux";
import withPrivate from "../../utils/auth/withPrivate";
import actions from "../../redux/actions";
import { getUserInfo } from "../../utils/common";


const { TabPane } = Tabs;

class ManageAccount extends Component {
  state = {
    activeLoc: {},
    userData: {}
  }

  componentDidMount() {
    let loginToken = this.props.authentication.token;
    let userInfo = getUserInfo(loginToken);

    if (userInfo?._id) {
      this.props.getUserProfile(userInfo._id);
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.user.userProfile !== prevState.userData) {
      let activeLoc = {}
      nextProps.user.userProfile?.location.map(loc => {
        if (loc.isActive) {
          activeLoc = loc
        }
      })
      return {
        userData: nextProps.user.userProfile,
        activeLoc
      }
    }
  }

  renderTabBar = (props, DefaultTabBar) => (
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

  render() {

    return (
      <MyProfile>
        <div className="menu-details">
          <h3>Manage My Account</h3>
          <StickyContainer>
            <Tabs defaultActiveKey="1" renderTabBar={this.renderTabBar}>
              <TabPane tab="My Profile" key="1">
                <ProfileDetails userData={this.state.userData} activeLoc={this.state.activeLoc} />
              </TabPane>
              <TabPane tab="My Address" key="2">
                <AddressDetails userData={this.state.userData} />
              </TabPane>
              {/* <TabPane tab="Recent Orders" key="3">
              <RecentOrders />
            </TabPane> */}
            </Tabs>
          </StickyContainer>
        </div>
      </MyProfile>
    );
  }
}


export default connect((state) => state, actions)(withPrivate(ManageAccount));