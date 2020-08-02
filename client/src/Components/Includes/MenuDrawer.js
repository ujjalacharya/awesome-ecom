import React, { Component } from "react";
import { Drawer, Button, Radio, Space } from "antd";

class MenuDrawer extends Component {
  state = { placement: "left" };

//   showDrawer = () => {
//     this.setState({
//       visible: true,
//     });
//   };

//   onClose = () => {
//     this.setState({
//       visible: false,
//     });
//   };

  onChange = (e) => {
    this.setState({
      placement: e.target.value,
    });
  };

  render() {
    const { placement } = this.state;
    return (
      <>
        <Drawer
          title="Basic Drawer"
          placement={placement}
          closable={false}
          onClose={this.props.onCloseDrawer}
          visible={this.props.showDrawer}
          key={placement}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </>
    );
  }
}

export default MenuDrawer;
