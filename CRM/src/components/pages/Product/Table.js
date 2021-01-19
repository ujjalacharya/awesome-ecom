import React, { useState, useEffect, useMemo, useRef } from 'react'
import { Table as AntdTable, Input, Button, Space, Popconfirm, Avatar, Drawer } from 'antd';
import Highlighter from 'react-highlight-words';
import moment from 'moment'
import { SearchOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProducts, getProduct, deleteProduct } from '../../../redux/actions/product_actions'
import ProductDetail from './ProductDetail';
const Table = ({ getProduct, getProducts, deleteProduct, multiLoading, products, totalCount, user }) => {
    // const [pagination, setPagination] = useState({
    //     current: 1,
    //     pageSize: 10,
    //     total: 0
    // })
    // const [searchText, setSearchText] = useState('')
    // const [searchedColumn, setSearchedColumn] = useState('')
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const searchInput = useRef(null);
    const pagination = useMemo(() => {
        return {
            // current: 1,
            pageSize: 5,
            total: totalCount
        }
    }, [totalCount])
    useEffect(() => {
        user && getProducts({ id: user._id, page: pagination.current, perPage: pagination.pageSize })
    }, [user])


    // useEffect(() => {
    //     setPagination({ ...pagination, total: totalCount })
    // }, [totalCount])

    const handleTableChange = (pagination, filters, sorter) => {
        if (!sorter.length) {
            sorter = [sorter]
        }

        let price = sorter.find(s => s.columnKey === 'price')
        price = price?.order ? price.order === 'ascend' ? 'asc' : 'desc' : ''

        let createdAt = sorter.find(s => s.columnKey === 'createdAt')
        createdAt = createdAt?.order ? createdAt.order === 'ascend' ? 'asc' : 'desc' : ''

        user && getProducts({ id: user._id, page: pagination.current, perPage: pagination.pageSize, keyword: filters.product?.[0], createdAt, updatedAt: '', status: filters.status?.[0], price, outofstock: filters.qty?.[0] })
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

    const openProduct = (product) => {
        setIsDrawerOpen(true)
        getProduct(product.slug)
    }

    const columns = useMemo(() => [
        {
            title: 'Product',
            dataIndex: '',
            key: 'product',
            width: '20%',
            ...getProductsearchProps('')
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
            dataIndex: '',
            sorter: {
                multiple: 1
            },
            key: 'price',
            render: product => {
                return <h4 style={{ fontSize: '1.1rem' }}>{`Rs ${product.price.$numberDecimal}`}<span className="period" style={{ fontSize: '0.7rem' }}>{`/${product.discountRate}% discount`}</span></h4>
            },
            width: '15%',
        },
        {
            title: 'Status',
            dataIndex: '',
            key: 'status',
            filterMultiple: false,
            filters: [
                { text: 'All', value: 'undefined' },
                { text: 'Verified', value: 'verified' },
                { text: 'Unverified', value: 'unverified' }
            ],
            render: product => {
                if (product.isVerified) return (<span className="badge badge-pill badge-success">verified</span>)
                if (!product.isVerified) return (<span className="badge badge-pill badge-danger">unverified</span>)
            },
            width: '5%',
        },
        {
            title: 'Qty',
            dataIndex: '',
            key: 'qty',
            filterMultiple: false,
            filters: [
                { text: 'All', value: 'undefined' },
                { text: 'Out of Stock', value: 'yes' },
            ],
            render: product => {
                if (product.quantity < 1) return (<span className="badge badge-pill badge-dark">Out of Stock</span>)
                return `${product.quantity}`
            },
            width: '5%',
        },
        {
            title: 'createdAt',
            dataIndex: 'createdAt',
            sorter: {
                multiple: 2
            },
            key: 'createdAt',
            width: '10%',
            render: date => `${moment(date).format("MMM Do YYYY")}`
        },
        {
            title: 'Action',
            dataIndex: '',
            width: '8%',
            render: product => <>
                <button onClick={() => openProduct(product)} className="btn btn-info btn-sm"><i className="fas fa-eye"></i></button>
                <button className="btn btn-warning btn-sm"><i className="fas fa-pen "></i></button>
                <Popconfirm
                    title="Are you sure to delete this product?"
                    onConfirm={() => deleteProduct(product.soldBy, product.slug)}
                    okText="Yes"
                    cancelText="No"
                >
                <button className="btn btn-danger btn-sm"><i className="fas fa-trash "></i></button>
                </Popconfirm>
            </>
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
            //         onClick:e => openProduct(order)
            //     }
            // }}
            />
            <Drawer
                title="Product Detail"
                placement="right"
                width={800}
                closable
                onClose={() => setIsDrawerOpen(false)}
                visible={isDrawerOpen}
                closeIcon={<i className="fas fa-times btn btn-danger"></i>}
            >
                <ProductDetail isOrderDetailOpen={isDrawerOpen} />
            </Drawer>
        </>)
}

Table.propTypes = {
    user: PropTypes.object,
    products: PropTypes.array,
    multiLoading: PropTypes.bool,
    pageCount: PropTypes.number,
    getProduct: PropTypes.func.isRequired,
    getProducts: PropTypes.func.isRequired,
    deleteProduct: PropTypes.func,
}
const mapStateToProps = (state) => ({
    user: state.auth.adminProfile,
    products: state.product.products,
    multiLoading: state.product.multiLoading,
    totalCount: state.product.totalCount,
})

export default connect(mapStateToProps, { getProducts, getProduct, deleteProduct })(Table)