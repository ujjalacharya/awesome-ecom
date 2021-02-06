import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export const ProductStatus = ({ isSuperadmin,product}) => {
    console.log(isSuperadmin);
    return (
        <div className="mb-2">
            <p><strong>Product Status:</strong> {product && (product?.isVerified ? <span className="badge badge-pill badge-success">verified</span> : product?.isRejected ? <span className="badge badge-pill badge-warning">rejected</span> : product.isDeleted && isSuperadmin ? <span className="badge badge-pill badge-dark">deleted</span>: <span className="badge badge-pill badge-danger">unverified</span>) }</p>
        </div>
    )
}

ProductStatus.propTypes = {
    product: PropTypes.object,
    isSuperadmin:PropTypes.bool,
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductStatus)
