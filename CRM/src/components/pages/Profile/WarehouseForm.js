import React from 'react'
import PropTypes from 'prop-types'



const WarehouseForm = props => {
   
    return (
        <div className="col-md-12">
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title">Warehouse Address</h5>
                    <h6 className="card-subtitle text-muted">It should be dispatcher/return address.</h6>
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputEmail4">Owner Name</label>
                                <input type="text" className="form-control" id="inputEmail4" placeholder="name" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="add">Adderss</label>
                                <input type="text" className="form-control" id="add" placeholder="adderss" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="dist">City</label>
                                <input type="text" className="form-control" id="dist" placeholder="city" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputPassword4">Phone Number</label>
                                <input type="text" className="form-control" id="inputPassword4" placeholder="Phone number" />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>

    )
}

WarehouseForm.propTypes = {

}

export default WarehouseForm
