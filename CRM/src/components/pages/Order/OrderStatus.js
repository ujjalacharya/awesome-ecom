import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {Switch,Popconfirm} from 'antd'
import { connect } from 'react-redux'
import { toggleOrderApproval, toggletobeReturnOrder } from '../../../redux/actions/order_actions'

const OrderStatus = ({ status, order_id, admin_id, toggleOrderApproval, toggletobeReturnOrder, isOrderDetailOpen}) => {
    const [defaultCheckApprove, setdefaultCheckApprove] = useState(false)
    const [defaultCheckComplete, setdefaultCheckComplete] = useState(false)
    const [switchClass, setSwitchClass] = useState('')
    const [loading, setLoading] = useState(false)
    const [openToBeReturnedForm, setOpenToBeReturnedForm] = useState(false)
    const [toBereturnedFormData, setToBeReturnedFormData] = useState({
        remark:'',
        returnedAmount: ''
    })
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
        setLoading(false)
        setOpenToBeReturnedForm(false)
        setToBeReturnedFormData({...toBeReturnedForm,remark:'',returnedAmount:''})


    },[status])
    useEffect(() => {
        !isOrderDetailOpen && setOpenToBeReturnedForm(false)
        !isOrderDetailOpen && setToBeReturnedFormData({ ...toBeReturnedForm, remark: '', returnedAmount: '' })
     }, [isOrderDetailOpen])

    //active/approve
    const toggleApproval = () => {
        setLoading(true)
        toggleOrderApproval(admin_id, order_id)
    }

    const switchToToBeReturned = () => {
        //validata form data
        //set loading 
        setLoading(true)
        //call action creator with remark and returned amount
        toggletobeReturnOrder(admin_id, order_id, toBereturnedFormData.remark, toBereturnedFormData.returnedAmount)
        
    }
    
    const switchToComplete = () => {
        setLoading(true)
        toggletobeReturnOrder(admin_id, order_id)

    }

    const handleReturnedFormDataChange = e => {
        setToBeReturnedFormData({
            ...toBereturnedFormData,
            [e.target.name]: e.target.value
        });
    };

    //to be returned form 
    const toBeReturnedForm = () =>{
        return (
            <div className="col-md-12">
            Remark:
            <textarea className="form-control" onChange={handleReturnedFormDataChange} name="remark" rows={2} placeholder="Customer reason" value={toBereturnedFormData.remark} required />
               Return amount: <input type="number" onChange={handleReturnedFormDataChange} value={toBereturnedFormData.returnedAmount} min="0" name="returnedAmount" className="form-control mb-2 mr-sm-2" id="inlineFormInputName2" placeholder="xxx..."/>
            </div>

        )
    }


    //rendering..
    //for status active and approve we have toggle feature so we need switch
    if (status === 'active' || status === 'approve') return <Switch className={switchClass} onClick={toggleApproval} loading={loading} checkedChildren='active' unCheckedChildren='approve' checked={defaultCheckApprove} />
    //for status complete 
    if (status === 'complete') {
        return <Popconfirm
            title={toBeReturnedForm}
            visible={openToBeReturnedForm}
            onConfirm={switchToToBeReturned}
            onCancel={()=>setOpenToBeReturnedForm(false)}
            okText="Submit"
            cancelText="Cancel"
        >
            <Switch className={switchClass} onClick={()=>setOpenToBeReturnedForm(true)} loading={loading} checkedChildren='complete' unCheckedChildren='toberetured' checked={defaultCheckComplete} />
        </Popconfirm>
    }
    //for status to be returned
    if ( status === 'tobereturned') {
        return <Switch className={switchClass} onClick={switchToComplete} loading={loading} checkedChildren='complete' unCheckedChildren='toberetured' checked={defaultCheckComplete} />
    }
    //for other status
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
