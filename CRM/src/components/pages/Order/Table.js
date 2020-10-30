import React, { useState, useEffect, useMemo, useRef } from 'react'
import { Table as AntdTable, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getOrders } from '../../../redux/actions/order_actions'

const Table = ({ getOrders, multiLoading, orders, totalCount, user }) => {
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0
    })
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    const searchInput = useRef(null);
    useEffect(() => {
        user && getOrders(user._id, pagination.current, pagination.pageSize)
    }, [user])

    useEffect(() => {
        setPagination({ ...pagination, total: totalCount })
    }, [totalCount])

    const handleTableChange = (pagination, filters) => {
        console.log(filters);
        user && getOrders(user._id, pagination.current, pagination.pageSize, filters.status?.[0],filters.product?.[0])
    }

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
    };

    const handleReset = clearFilters => {
        clearFilters();
        setSearchText('')
    };

    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        // onFilter: (value, record) =>
        //     record[dataIndex]
        //         ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        //         : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.current.select(), 100);
            }
        },
        render: text =>{
            return searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.name.toString() : ''}
                />
            ) : (
                    text.name
                )}
        
    })

    const columns = useMemo(() => [
        {
            title: 'Product',
            dataIndex: 'product',
            width: '15%',
            ...getColumnSearchProps('product')
        },
        {
            title: 'User',
            dataIndex: 'user',
            render: user => `${user.name}`,
            width: '15%',
        },
        {
            title: 'Address',
            dataIndex: 'shipto',
            render: add => `${add.city}, ${add.area}`,
            width: '15%',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            width: '5%',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            filterMultiple: false,
            filters: [
                { text: 'All', value: 'undefined' },
                { text: 'Active', value: 'active' },
                { text: 'Approve', value: 'approve' },
                { text: 'Dispatch', value: 'dispatch' },
                { text: 'Cancel', value: 'cancel' },
                { text: 'Complete', value: 'complete' },
                { text: 'Tobereturned', value: 'tobereturned' },
                { text: 'Return', value: 'return' },
            ],
            render: status => `${status.currentStatus}`,
            width: '5%',
        },
    ], []);


    return <AntdTable
        columns={columns}
        rowKey={record => record._id}
        dataSource={orders}
        pagination={pagination}
        loading={multiLoading}
        onChange={handleTableChange}
    />
}

Table.propTypes = {
    user: PropTypes.object,
    orders: PropTypes.array,
    multiLoading: PropTypes.bool,
    pageCount: PropTypes.number,
}
const mapStateToProps = (state) => ({
    user: state.auth.user,
    orders: state.order.orders,
    multiLoading: state.order.multiLoading,
    totalCount: state.order.totalCount,
})

export default connect(mapStateToProps, { getOrders })(Table)