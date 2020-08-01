
import React from 'react'
import { Tabs, Button } from 'antd';
import Layout from "../../core/Layout";
import ProfileForm from './ProfileForm';
const { TabPane } = Tabs

// import PropTypes from 'prop-types'

const Profile = props => {
    return (
        <Layout>
            <div className="row">
                <div className="col-12 col-lg-12">
                    <Tabs size='large'>
                        <TabPane tab="General" key="1">
                            <div className="card">
                                <div className="col-md-12">
                                    <Tabs >
                                        <TabPane tab="Profile" key="a">
                                            <ProfileForm />
                                        </TabPane>
                                        <TabPane tab="Business" key="b">
                                            Business
                    </TabPane>
                                        <TabPane tab="Bank" key="c">
                                            Bank
                     </TabPane>
                                        <TabPane tab="Ware House" key="d">
                                            ware House
                     </TabPane>
                                    </Tabs>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tab="Seller logo" key="2">
                            logo
                </TabPane>
                        <TabPane tab="Shipping" key="ship">
                            shipping
                </TabPane>
                        <TabPane tab="Comissions" key="3">
                            Comissinons
                </TabPane>
                    </Tabs>
                </div>
            </div>
        </Layout>
    )
}

// Profile.propTypes = {

// }

export default Profile

