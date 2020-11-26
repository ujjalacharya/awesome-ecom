import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ProductForm from './ProductForm'
import Layout from '../../core/Layout'
import Table from './Table'

export const index = () => {
    return (
        <Layout>
        <Table/>
        {/* <ProductForm/> */}
        </Layout>

    )
}

index.propTypes = {
    prop: PropTypes
}

const mapStateToProps = (state) => null

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(index)
