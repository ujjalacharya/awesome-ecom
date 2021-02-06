import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProducts } from '../../../../redux/actions/superadmin_action'
import { getProduct, deleteProduct} from '../../../../redux/actions/product_actions'
import ProductTable from '../../../common/product/ProductTable';
const Products = ({ getProduct, getProducts, deleteProduct, multiLoading, products, totalCount, superadmin }) => {
    return <ProductTable
            getProduct={getProduct}
            getProducts={getProducts}
            deleteProduct={deleteProduct}
            multiLoading={multiLoading}
            products={products}
            totalCount={totalCount}
            user={superadmin}
    />
}

Products.propTypes = {
    superadmin: PropTypes.object,
    products: PropTypes.array,
    multiLoading: PropTypes.bool,
    pageCount: PropTypes.number,
    getProduct: PropTypes.func.isRequired,
    getProducts: PropTypes.func.isRequired,
    deleteProduct: PropTypes.func,
}
const mapStateToProps = (state) => ({
    superadmin: state.auth.authUser,
    products: state.product.products,
    multiLoading: state.product.multiLoading,
    totalCount: state.product.totalCount,
})

export default connect(mapStateToProps, { getProducts, getProduct, deleteProduct })(Products)