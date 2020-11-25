import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {Popconfirm} from 'antd'
import { connect } from 'react-redux'
import { cancelOrder} from '../../../redux/actions/order_actions'

const OrderCancel = ({ order_id, admin_id, cancelOrder, isOrderDetailOpen}) => {
    const [openCancelForm, setOpenCancelForm] = useState(false)
    const [remark, setRemark] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        !isOrderDetailOpen && setOpenCancelForm(false)
        !isOrderDetailOpen && setRemark('')
        !isOrderDetailOpen && setLoading(false)
    }, [isOrderDetailOpen])

    //to be returned form 
    const cancelOrderForm = () => {
        return (
            <div className="col-md-12">
                Remark:
                <textarea className="form-control" onChange={e=>setRemark(e.target.value)} name="remark" rows={2} placeholder="reason to cancel order" value={remark} required />
            </div>

        )
    }

    const _cancelOrder = () => {
        setLoading(true)
        cancelOrder(admin_id,order_id, remark )
    }
    
    return (
        <div className="d-flex justify-content-center">
                <Popconfirm
                title={cancelOrderForm}
                visible={openCancelForm}
                onConfirm={_cancelOrder}
                okButtonProps={{ loading }}
                onCancel={() => setOpenCancelForm(false)}
                okText="Ok"
                cancelText="Cancel"
            >
                <button className="btn btn-pill btn-danger" onClick={()=>setOpenCancelForm(!openCancelForm)}>Cancel Order</button>
            </Popconfirm>
        </div>
    )
}

OrderCancel.propTypes = {
    order_id: PropTypes.string,
    admin_id: PropTypes.string,
    cancelOrder: PropTypes.func.isRequired,
}
// const mapStateToProps = (state) => ({})

export default connect(null,{cancelOrder})(React.memo(OrderCancel))
