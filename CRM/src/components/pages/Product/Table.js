import React, { useState, useEffect, useMemo, useRef, Fragment } from 'react'
import { Table as AntdTable, Input, Button, Space, Modal, Avatar, Drawer } from 'antd';
import Highlighter from 'react-highlight-words';
import moment from 'moment'
import { SearchOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProducts, getProduct } from '../../../redux/actions/product_actions'
// import OrderDetail from './OrderDetail';

const Table = ({ getProduct, getProducts, multiLoading, products, totalCount, user }) => {
    // const [pagination, setPagination] = useState({
    //     current: 1,
    //     pageSize: 10,
    //     total: 0
    // })
    // const [searchText, setSearchText] = useState('')
    // const [searchedColumn, setSearchedColumn] = useState('')
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const searchInput = useRef(null);
    useEffect(() => {
        user && getProducts(user._id, pagination.current, pagination.pageSize)
    }, [user])

    const pagination = useMemo(() => {
        return {
            // current: 1,
            pageSize: 5,
            total: totalCount
        }
    }, [totalCount])

    // useEffect(() => {
    //     setPagination({ ...pagination, total: totalCount })
    // }, [totalCount])

    const handleTableChange = (pagination, filters) => {
        user && getProducts(user._id, pagination.current, pagination.pageSize, filters.status?.[0], filters.product?.[0])
    }

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        // setSearchText(selectedKeys[0])
        // setSearchedColumn(dataIndex)
    };

    const handleReset = clearFilters => {
        clearFilters();
        // setSearchText('')
    };

    const getProductsearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8, backgroundColor: '#495057' }}>
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
                        Cancel
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : '#495057' }} />,
        // onFilter: (value, record) =>
        //     record[dataIndex]
        //         ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        //         : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.current.select(), 100);
            }
        },
        render: product => {
            return (<>
                {product.name}{' '}<Avatar shape="square" size='small' src={`${process.env.REACT_APP_SERVER_URL}/uploads/${product.images[0].thumbnail}`} />
            </>)

            // return searchedColumn === dataIndex ? (
            //     <Highlighter
            //         highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            //         searchWords={[searchText]}
            //         autoEscape
            //         textToHighlight={text ? text.name.toString() : ''}
            //     />
            // ) : (
            //         text.name
            //     )
        }

    })

    const openOrder = (order) => {
        setIsDrawerOpen(true)
        getProduct(order.soldBy, order._id)
    }

    const columns = useMemo(() => [
        {
            title: 'Product',
            dataIndex: 'product',
            width: '20%',
            ...getProductsearchProps('product')
        },
        {
            title: 'Category',
            dataIndex: 'category',
            render: cat => {
                let str = cat.map(a => {
                    return a.displayName
                })
                return str.toString()
            },
            width: '10%',
        },
        {
            title: 'Price',
            // dataIndex: 'products',
            render: product => `Price: ${product.price.$numberDecimal} Discount: ${product.discountRate}`,
            width: '15%',
        },
        {
            title: 'Status',
            // dataIndex: 'status',
            filterMultiple: false,
            filters: [
                { text: 'All', value: 'undefined' },
                { text: 'Verified', value: 'verified' },
                { text: 'Unverified', value: 'unverified' },
                { text: 'Deleted', value: 'deleted' },
                { text: 'Not deleted', value: 'notdeleted' },
                { text: 'Out of stock', value: 'outofstock' },
            ],
            render: product => {
                if (product.isVerified) return (<span className="badge badge-pill badge-info">verified</span>)
                if (product.isVerified) return (<span className="badge badge-pill badge-info">verified</span>)
                if (!product.isVerified) return (<span className="badge badge-pill badge-secondary">unverified</span>)

                let badgeClass = status.currentStatus === 'verified' ? "badge badge-pill badge-info" :
                    status.currentStatus === 'unverified' ? "badge badge-pill badge-secondary" :
                            status.currentStatus === 'deleted' ? "badge badge-pill badge-danger" :
                                status.currentStatus === 'notdeleted' ? "badge badge-pill badge-success" :
                                        "badge badge-pill badge-dark"
                return (<span className={badgeClass}>{status.currentStatus}</span>)
            },
            width: '5%',
        },
        {
            title: 'Qty',
            dataIndex: 'quantity',
            width: '5%',
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            width: '10%',
            render: date => `${moment(date).format("MMM Do YYYY")}`
        },
        {
            title: 'Action',
            dataIndex: '',
            width: '5%',
            render: action => <button className="btn btn-info"><i className="fas fa-eye"></i></button>,
            onCell: order => {
                return {
                    onClick: e => openOrder(order)
                }
            }
        },
    ], []);


    return (
        <>
            <AntdTable
                columns={columns}
                rowKey={record => record._id}
                dataSource={products}
                pagination={pagination}
                loading={multiLoading}
                onChange={handleTableChange}
                size='small'
            // onRow={ order => {
            //     return {
            //         onClick:e => openOrder(order)
            //     }
            // }}
            />
            <Drawer
                title="Order Details"
                placement="right"
                width={800}
                closable={false}
                onClose={() => setIsDrawerOpen(false)}
                visible={isDrawerOpen}
                closable
                closeIcon={<i className="fas fa-times btn btn-danger"></i>}
            >
            'sdcsdv'
                {/* <OrderDetail isOrderDetailOpen={isDrawerOpen} /> */}
            </Drawer>
            {/* <Modal
        title="Order Detail"
        centered
        visible={isDrawerOpen}
        onOk={() => setIsDrawerOpen(false)}
        onCancel={() => setIsDrawerOpen(false)}
        width={1000}
    >
        <OrderDetail order={order}/>
    </Modal> */}
        </>)
}

Table.propTypes = {
    user: PropTypes.object,
    products: PropTypes.array,
    multiLoading: PropTypes.bool,
    pageCount: PropTypes.number,
    getProduct: PropTypes.func.isRequired,
    getProducts: PropTypes.func.isRequired,
}
const mapStateToProps = (state) => ({
    user: state.auth.user,
    products: state.order.products,
    multiLoading: state.order.multiLoading,
    totalCount: state.order.totalCount,
})

export default connect(mapStateToProps, { getProducts, getProduct })(Table)