import React, { Component } from "react";
import { Tabs } from "antd";
import { StickyContainer, Sticky } from "react-sticky";
import _ from "lodash";

//includes
import ProfileDetails from "./Includes/ProfileDetails";
import AddressDetails from "./Includes/AddressDetails";
import RecentOrders from "./Includes/RecentOrders";
import next from "next";


const { TabPane } = Tabs;

class MenuDetails extends Component {
  state = {
    activeLoc: {},
    userData: {}
  }

  componentDidMount(){
    let { data } = this.props

    if(!_.isEmpty(data)){
      data.location.map(loc => {
        if(loc.isActive){
          this.setState({
            activeLoc: loc
          })
        }
      })
    }

    this.setState({
      userData: data
    })
    
  }

  componentWillReceiveProps(nextProps){
    if(this.props.data !== nextProps.data){
      
      let { data } = nextProps

      if(!_.isEmpty(data)){
        data.location.map(loc => {
          if(loc.isActive){
            this.setState({
              activeLoc: loc
            })
          }
        })
      }
  
      this.setState({
        userData: data
      })
    }
  }

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
              <ProfileDetails userData = {this.state.userData} activeLoc = {this.state.activeLoc} />
            </TabPane>
            <TabPane tab="My Address" key="2">
              <AddressDetails userData = {this.state.userData} />
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
