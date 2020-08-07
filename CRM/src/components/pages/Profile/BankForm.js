import React from 'react'
import PropTypes from 'prop-types'



const BankForm = props => {
   
    return (
        <div className="col-md-12">
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title">Bank Account</h5>
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputEmail4">Account Holder Name</label>
                                <input type="text" className="form-control" id="inputEmail4" placeholder="name" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="add">Bank Name</label>
                                <input type="text" className="form-control" id="add" placeholder="bank name" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="dist">Branch Name</label>
                                <input type="text" className="form-control" id="dist" placeholder="branch name" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputPassword4">Account Number</label>
                                <input type="text" className="form-control" id="inputPassword4" placeholder="account number" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputPassword">Routing Number</label>
                                <input type="text" className="form-control" id="inputPassword" placeholder="routing Number" />
                            </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="exampleFormControlFile1">Cheque Copy</label>
                            <input type="file" className="form-control-file" id="exampleFormControlFile1" />
                        </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>

    )
}

BankForm.propTypes = {

}

export default BankForm
