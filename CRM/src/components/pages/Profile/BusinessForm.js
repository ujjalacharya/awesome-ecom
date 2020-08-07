import React from 'react'
import PropTypes from 'prop-types'



const BusinessForm = props => {
   
    return (
        <div className="col-md-12">
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title">Business Information</h5>
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputEmail4">Owner Name</label>
                                <input type="text" className="form-control" id="inputEmail4" placeholder="owner name" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="add">Address</label>
                                <input type="text" className="form-control" id="add" placeholder="Address" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="dist">City</label>
                                <input type="text" className="form-control" id="dist" placeholder="City" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputPassword4">Citizenship Number</label>
                                <input type="text" className="form-control" id="inputPassword4" placeholder="citizenship number" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputPassword">Business Register Number</label>
                                <input type="text" className="form-control" id="inputPassword" placeholder="business register number" />
                            </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="exampleFormControlFile1">Citizenship Front Image</label>
                            <input type="file" className="form-control-file" id="exampleFormControlFile1" />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="exampleFormControlFile1">Citizenship Back Image</label>
                            <input type="file" className="form-control-file" id="exampleFormControlFile1" />
                        </div>

                        <div className="form-group col-md-6">
                            <label htmlFor="exampleFormControlFile1">Business Licence Copy</label>
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

BusinessForm.propTypes = {

}

export default BusinessForm
