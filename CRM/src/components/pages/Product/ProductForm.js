import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Layout from '../../core/Layout';
import Categories from './Categories'
import { getCategories } from '../../../redux/actions/product_actions'

const ProductForm = ({getCategories}) => {
    
    useEffect(() => {
        getCategories()
    }, [])
    
    return (
        <Layout>        
        <div className="col-md-12" >
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title">Form row</h5>
                    <h6 className="card-subtitle text-muted">Bootstrap column layout.</h6>
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputEmail4">Email</label>
                                <input type="email" className="form-control" id="inputEmail4" placeholder="Email" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputPassword4">Password</label>
                                <input type="password" className="form-control" id="inputPassword4" placeholder="Password" />
                            </div>
                        </div>
                        <Categories/>
                        <div className="form-group">
                            <label htmlFor="inputAddress2">Address 2</label>
                            <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputCity">City</label>
                                <input type="text" className="form-control" id="inputCity" />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="inputState">State</label>
                                <select id="inputState" className="form-control">
                                    <option >Choose...</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div className="form-group col-md-2">
                                <label htmlFor="inputZip">Zip</label>
                                <input type="text" className="form-control" id="inputZip" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="custom-control custom-checkbox m-0">
                                <input type="checkbox" className="custom-control-input" />
                                <span className="custom-control-label">Check me out</span>
                            </label>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
        </Layout>
    )
}
ProductForm.propTypes = {
    getCategories: PropTypes.func,
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    getCategories
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ProductForm))
