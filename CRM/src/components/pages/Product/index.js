import React from 'react'
import Layout from '../../core/Layout'
import Table from './Table'

export const index = () => {
    return (
        <Layout>
        <Table/>
        </Layout>

    )
}



export default React.memo(index)
