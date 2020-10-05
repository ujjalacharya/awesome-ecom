import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateBank,getAdminBank } from '../../../redux/actions/profile_actions'



const BankForm = ({bank, updateBank,getAdminBank, user}) => {
    
    const [adminBank,setAdminBank] = useState({
        accountHolder: '',
        bankName: '',
        branchName: '',
        accountNumber: '',
        routingNumber: '',
        chequeCopy: null
    })
    const [isDisable, setIsDisabled] = useState(false)
    useEffect(()=> {
        getAdminBank(user._id)

    },[user])
    useEffect(() => {
        setAdminBank({
            accountHolder: bank?.accountHolder ? bank.accountHolder : '',
            bankName: bank?.bankName ? bank.bankName : '',
            branchName: bank?.branchName ? bank.branchName : '',
            accountNumber: bank?.accountNumber ? bank.accountNumber : '',
            routingNumber: bank?.routingNumber ? bank.routingNumber : '',
            // chequeCopy: bank?.chequeCopy ? bank.chequeCopy : ''
        })
    }, [bank])
    const { accountHolder, bankName,branchName, accountNumber, routingNumber} = adminBank
    const onChange = e => setAdminBank({ ...bank, [e.target.name]: e.target.name === 'chequeCopy' ? e.target.files[0] : e.target.value })
    const onSubmit = async e => {
        e.preventDefault()
        setIsDisabled(true)
        await updateBank(bank, user._id)
        // setIsDisabled(false)
    }
   
    return (
        <div className="col-md-12">
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title">Bank Account</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={e => onSubmit(e)}>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputEmail4">Account Holder Name</label>
                                <input type="text" className="form-control" id="inputEmail4" placeholder="name" 
                                    name='accountHolder'
                                    value={accountHolder}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="add">Bank Name</label>
                                <input type="text" className="form-control" id="add" placeholder="bank name" 
                                    name='bankName'
                                    value={bankName}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="dist">Branch Name</label>
                                <input type="text" className="form-control" id="dist" placeholder="branch name" 
                                    name='branchName'
                                    value={branchName}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputPassword4">Account Number</label>
                                <input type="text" className="form-control" id="inputPassword4" placeholder="account number"
                                    name='accountNumber'
                                    value={accountNumber}
                                    onChange={onChange}
                                 />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputPassword">Routing Number</label>
                                <input type="text" className="form-control" id="inputPassword" placeholder="routing Number" 
                                    name='routingNumber'
                                    value={routingNumber}
                                    onChange={onChange}
                                />
                            </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="exampleFormControlFile1">Cheque Copy</label>
                            <input type="file" className="form-control-file" id="exampleFormControlFile1" 
                                    name='chequeCopy'
                                    // value={chequeCopy}
                                    onChange={onChange}
                            />
                        </div>
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={isDisable}>Submit</button>
                    </form>
                </div>
            </div>
        </div>

    )
}

BankForm.propTypes = {
    bank: PropTypes.object,
    updateBank: PropTypes.func.isRequired,
    getAdminBank: PropTypes.func.isRequired,
}
const mapStateToProps = (state) => ({
    bank: state.profile.bank,
})


export default connect(mapStateToProps,{updateBank,getAdminBank})(BankForm)
