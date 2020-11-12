import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {Switch} from 'antd'
import { connect } from 'react-redux'
import { toggleOrderApproval, toggletobeReturnOrder } from '../../../redux/actions/order_actions'

const OrderStatus = ({status, order_id, admin_id, toggleOrderApproval, toggletobeReturnOrder}) => {
    const [defaultCheckApprove, setdefaultCheckApprove] = useState(false)
    const [defaultCheckComplete, setdefaultCheckComplete] = useState(false)
    const [switchClass, setSwitchClass] = useState('')
    useEffect(()=>{
        if (status === 'active') {
            setSwitchClass('order-status-active')
            setdefaultCheckApprove(true)
            
        }
        if (status === 'approve') {
            setSwitchClass('order-status-approve')
            setdefaultCheckApprove(false)
        }
        if (status === 'complete') {
            setSwitchClass('order-status-complete')
            setdefaultCheckComplete(true)

        }
        if (status === 'tobereturned') {
            setSwitchClass('order-status-tobereturned')
            setdefaultCheckComplete(false)

        }

    },[status])

    //active/approve
    const toggleApproval = () => {
        toggleOrderApproval(admin_id, order_id)
        // defaultCheckApprove ? setSwitchClass('order-status-approve') : setSwitchClass('order-status-active')
        setdefaultCheckApprove(!defaultCheckApprove)
    }
    //complete/tobereturned
    const toggleComplete = () => {
        defaultCheckComplete ? setSwitchClass('order-status-tobereturned') : setSwitchClass('order-status-complete')
        setdefaultCheckComplete(!defaultCheckComplete)
    }
    //for status active and approve we have toggle feature so we need switch
    if (status === 'active' || status === 'approve') return <Switch className={switchClass} onClick={toggleApproval} checkedChildren='active' unCheckedChildren='approve' checked={defaultCheckApprove} />
    //for status complete and tobereturn
    if (status === 'complete' || status === 'tobereturned') return <Switch className={switchClass} onClick={toggleComplete} checkedChildren='complete' unCheckedChildren='toberetured' checked={defaultCheckComplete} />



    const otherStatus = status => {
        let badgeClass = status === 'dispatch' ? "badge badge-pill badge-primary" :
                    status === 'cancel' ? "badge badge-pill badge-danger" :
                        status === 'complete' ? "badge badge-pill badge-success" :
                            status === 'tobereturned' ? "badge badge-pill badge-warning" :
                                "badge badge-pill badge-dark"
        return <span className={badgeClass}>{status}</span>
    }

    return (
        <>
            {otherStatus(status)}
        </>
    )
}

OrderStatus.propTypes = {
    status: PropTypes.string,
    order_id: PropTypes.string,
    admin_id: PropTypes.string,
}
// const mapStateToProps = (state) => ({})

export default connect(null,{toggleOrderApproval, toggletobeReturnOrder})(React.memo(OrderStatus))
