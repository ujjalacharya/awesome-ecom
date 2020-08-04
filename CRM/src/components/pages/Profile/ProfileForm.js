import React from 'react'
import PropTypes from 'prop-types'



const ProfileForm = props => {
   
    return (
        <div className="col-md-12">
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title">Complete your profile</h5>
                    <h6 className="card-subtitle text-muted">Seller account information.</h6>
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputEmail4">Name</label>
                                <input type="text" className="form-control" id="inputEmail4" placeholder="Name" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputEmai4">Shop Name</label>
                                <input type="text" className="form-control" id="inputEmai4" placeholder="Shop Name" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="add">Address</label>
                                <input type="text" className="form-control" id="add" placeholder="Address" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="dist">District</label>
                                <input type="text" className="form-control" id="dist" placeholder="District" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputPassword4">Password</label>
                                <input type="password" className="form-control" id="inputPassword4" placeholder="Password" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputPassword">New Password</label>
                                <input type="password" className="form-control" id="inputPassword" placeholder="New Password" />
                            </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputAddress">Muncipality</label>
                            <input type="text" className="form-control" id="inputAddress" placeholder="muncipality" />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputZip">Ward No.</label>
                            <input type="number" className="form-control" id="inputZip" />
                        </div>
                        </div>
                        {/* <div className="form-group">
                            <label htmlFor="inputAddress2">Address 2</label>
                            <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                        </div> */}
                        <div className="form-row">
                            {/* <div className="form-group col-md-6">
                                <label htmlFor="inputCity">City</label>
                                <input type="text" className="form-control" id="inputCity" />
                            </div> */}
                            {/* <div className="form-group col-md-4">
                                <label htmlFor="inputState">State</label>
                                <select id="inputState" className="form-control">
                                    <option selected>Choose...</option>
                                    <option>...</option>
                                </select>
                            </div> */}
                        </div>
                        {/* <div className="form-group">
                            <label className="custom-control custom-checkbox m-0">
                                <input type="checkbox" className="custom-control-input" />
                                <span className="custom-control-label">Check me out</span>
                            </label>
                        </div> */}
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>

    )
}

ProfileForm.propTypes = {

}

export default ProfileForm
