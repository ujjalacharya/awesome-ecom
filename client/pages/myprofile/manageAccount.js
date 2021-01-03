import React, { useEffect, useState } from "react";
import { StickyContainer, Sticky } from "react-sticky";
import { Tabs } from "antd";
import _ from "lodash";

//includes
import ProfileDetails from "../../src/Includes/MyProfile/Includes/ProfileDetails";
import AddressDetails from "../../src/Includes/MyProfile/Includes/AddressDetails";
import MyProfile from "../../src/Includes/MyProfile/myProfile";

// utils
import initialize from "../../utils/initialize";
import withPrivate from "../../utils/auth/withPrivate";
import { getUserInfo, previousQuery } from "../../utils/common";
import { getCookie, getCookieFromBrowser } from "../../utils/cookie";

// redux
import actions from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";


const { TabPane } = Tabs;

const ManageAccount = (props) => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state => state.user.userProfile))

  let [activeLoc, setActiveLoc] = useState({});
  let [userData, setUserData] = useState({});

  const loginToken = getCookieFromBrowser('token');
  let userInfo = getUserInfo(loginToken);
  
  useEffect(() => {
    if (!props.isServer) {
      if (userInfo?._id) {
        dispatch(
          actions.getUserProfile(userInfo._id)
        );
      }
    }
  }, [])

  let prevUserProfile = previousQuery(userProfile)

  useEffect(() => {
    if (userProfile !== prevUserProfile && userProfile) {
      let activeLoc = {}
      userProfile?.location.map(loc => {
        if (loc.isActive) {
          activeLoc = loc
        }
      })
      setUserData(userProfile)
      setActiveLoc(activeLoc)
    }
  }, [userProfile])


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
    <MyProfile userData={userData} title="My Account">
      <div className="menu-details">
        <h3>Manage My Account</h3>
        <StickyContainer>
          <Tabs defaultActiveKey="1" renderTabBar={renderTabBar}>
            <TabPane tab="My Profile" key="1">
              <ProfileDetails userData={userData} activeLoc={activeLoc} />
            </TabPane>
            <TabPane tab="My Address" key="2">
              <AddressDetails userData={userData} allAddress={userData.location} />
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

ManageAccount.getInitialProps = async (ctx) => {
  initialize(ctx);
  
  if (ctx.isServer) {
    let loginToken = getCookie("token", ctx.req);
    let userInfo = getUserInfo(loginToken);

    if (userInfo?._id) {
      await ctx.store.dispatch(
        actions.getUserProfile(userInfo._id, ctx)
      );
    }
  }
  return {
    isServer: ctx.isServer
  }
}

export default withPrivate(ManageAccount);