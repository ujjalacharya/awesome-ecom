import React, { useState } from "react";
import { Row, Col } from "antd";

// includes
import Menu from "../../../src/Includes/MyProfile/menu";
import Layout from "../../../src/Components/Layout";

// utils
import withPrivate from "../../../utils/auth/withPrivate";

const MyProfile = (props) => {
    let [currentMenu, setCurrentMenu] = useState("manage-account");

    const changeMenuTab = (menu) => {
        setCurrentMenu(menu)
    };

    return (
        <Layout title={props.title}>
            <div className="my-profile">
                <div className="container min-height">
                    <Row>
                        <Col lg={4} xs={24} className="left-menu">
                            <Menu changeMenuTab={changeMenuTab} currentMenu={currentMenu} />
                        </Col>
                        <Col lg={20} xs={24} className="profile-right-menu">
                            {props.children}
                        </Col>
                    </Row>
                </div>
            </div>
        </Layout>
    );
}

export default withPrivate(MyProfile);
