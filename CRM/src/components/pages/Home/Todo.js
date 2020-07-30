import React from 'react'
import PropTypes from 'prop-types'
import { Steps, Row, Col } from 'antd';
import { UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons';

const { Step } = Steps;

const Todo = props => {
    return (
        <div className="col-lg-12 col-xl-12">
            <div className="card flex-fill w-100">
                <div className="card-header">
                    <div className="card-actions float-right">
                        <div className="dropdown">
                            <a href="#!" data-toggle="dropdown" data-display="static" aria-expanded="false">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-horizontal align-middle"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                            </a>

                            <div className="dropdown-menu dropdown-menu-right">
                                <a className="dropdown-item" href="#!">Action</a>
                                <a className="dropdown-item" href="#!">Another action</a>
                                <a className="dropdown-item" href="#!">Something else here</a>
                            </div>
                        </div>
                    </div>
                    <h5 className="card-title mb-0">Sales VS Customers</h5>
                </div>
                <div className="card-body p-2">
                    <Row>
                        <Col span={24}>
                    <Steps>
                        <Step status="finish" title="Profile" icon={<UserOutlined />} >
                        <Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>
                        </Step>
                        <Step status="finish" title="Business Info" icon={<SolutionOutlined />} />
                        <Step status="process" title="Pay" icon={<LoadingOutlined />} />
                        <Step status="wait" title="Done" icon={<SmileOutlined />} />
                    </Steps>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}

Todo.propTypes = {

}

export default Todo
