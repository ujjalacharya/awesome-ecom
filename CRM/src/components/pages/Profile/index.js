
import React from 'react'
import PropTypes from 'prop-types'
import { Tabs, Button } from 'antd';
import Layout from "../../core/Layout";
import ProfileForm from './ProfileForm';
import BusinessForm from './BusinessForm'
import BankForm from './BankForm'
import WarehouseForm from './WarehouseForm'
import { connect } from 'react-redux';
const { TabPane } = Tabs

// import PropTypes from 'prop-types'

const Profile = ({user}) => {

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
                                            <ProfileForm user={user} />
                                        </TabPane>
                                        <TabPane tab="Business" key="b">
                                            <BusinessForm/>
                    </TabPane>
                                        <TabPane tab="Bank" key="c">
                                            <BankForm user={user}/>
                     </TabPane>
                                        <TabPane tab="Ware House" key="d">
                                            <WarehouseForm/>
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

Profile.propTypes = {
    user: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
    user: state.auth.user,
})


export default connect(mapStateToProps,{})(Profile)

