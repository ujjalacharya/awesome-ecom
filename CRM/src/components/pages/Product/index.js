import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ProductForm from './ProductForm'
import Layout from '../../core/Layout'

export const index = () => {
    return (
        <Layout>

        <ProductForm/>
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
