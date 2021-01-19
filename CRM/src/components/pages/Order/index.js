import React from 'react'
import Table from './Table'
import Layout from '../../core/Layout'

const Order = () => {
    return (
        <Layout>
            <Table/>
        </Layout>
    )
}


export default React.memo(Order)
