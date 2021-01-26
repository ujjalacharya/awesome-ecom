import React from 'react'
import Table from './Table'
import Layout from '../../../core/Layout'

const SuperAdmin = () => {
    return (
        <Layout>
            <Table />
        </Layout>
    )
}


export default React.memo(SuperAdmin)