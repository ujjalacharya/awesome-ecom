import React from 'react'
import PropTypes from 'prop-types'
import {Switch} from 'antd'

const OrderStatus = ({status}) => {
    console.log(status);
    return (
        <>
        {
            (status === 'active' || status === 'approve') ?
                <Switch checkedChildren='active' unCheckedChildren='approve' defaultChecked={(status === 'active') ? true : false} /> : status

        }   
        </>
    )
}

OrderStatus.propTypes = {
    status: PropTypes.string
}

export default React.memo(OrderStatus)
