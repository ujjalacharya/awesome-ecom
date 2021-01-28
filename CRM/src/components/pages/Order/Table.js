import React, { useState, useEffect, useMemo, useRef } from 'react'
import { Table as AntdTable, Input, Button, Space, Modal , Avatar, Drawer} from 'antd';
import Highlighter from 'react-highlight-words';
import moment from 'moment'
import { SearchOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getOrders, getOrder } from '../../../redux/actions/order_actions'
import OrderDetail from './OrderDetail';

const Table = ({ getOrder, getOrders, multiLoading, orders, totalCount, user }) => {
    const [pagination, setPagination] = useState({
        total: 0,
        defaultPageSize: 5,
        pageSizeOptions:[5,10,15,20,50,100],
        showQuickJumper: true
    })
    // const [searchText, setSearchText] = useState('')
    // const [searchedColumn, setSearchedColumn] = useState('')
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const searchInput = useRef(null);
    useEffect(()=>{
        setPagination({
            ...pagination,
            total: totalCount
        })
    }, [totalCount])

    useEffect(() => {
        user && getOrders(user._id, pagination.current, pagination.pageSize)
    }, [user])


    const handleTableChange = (pagination, filters) => {
        console.log(pagination);
        user && getOrders(user._id, pagination.current, pagination.pageSize, filters.status?.[0],filters.product?.[0])
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

    const getOrderSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8, backgroundColor: '#495057'}}>
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
        render: product =>{
            return (<>
                {product.name}{' '}<Avatar shape="square" size='small' src={`${process.env.REACT_APP_SERVER_URL}/uploads/${product.images[0].thumbnail}`}/>
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
        getOrder(order.soldBy, order._id)
    }

    const columns = useMemo(() => [
        {
            title: 'Product',
            dataIndex: 'product',
            width: '30%',
            ...getOrderSearchProps('product')
        },
        {
            title: 'Customer',
            dataIndex: 'user',
            render: user => `${user.name}`,
            width: '10%',
        },
        {
            title: 'Shipping Address',
            children: [
                {
                    title: 'City',
                    dataIndex: 'shipto',
                    key: 'city',
                    render: shipto => `${shipto.city}`,
                    width: '10%',
                },
                {
                    title: 'Area',
                    dataIndex: 'shipto',
                    key: 'area',
                    render: shipto => `${shipto.area}`,
                    width: '10%',
                },
                {
                    title: 'Street',
                    dataIndex: 'shipto',
                    key: 'address',
                    render: shipto => `${shipto.address}`,
                    width: '10%',
                },
            ]
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
            render: status => {
                let badgeClass = status.currentStatus === 'active' ? "badge badge-pill badge-info" :
                status.currentStatus === 'approve' ? "badge badge-pill badge-secondary" :
                status.currentStatus === 'dispatch' ? "badge badge-pill badge-primary":
                status.currentStatus === 'cancel' ? "badge badge-pill badge-danger":
                status.currentStatus === 'complete' ? "badge badge-pill badge-success":
                status.currentStatus === 'tobereturned' ? "badge badge-pill badge-warning":
                "badge badge-pill badge-dark"
                return(<span className={badgeClass}>{status.currentStatus}</span>)
            },
            width: '10%',
        },
        {
            title: 'Qty',
            dataIndex: 'quantity',
            width: '5%',
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            width: '9%',
            render: date => `${moment(date).format("MMM Do YYYY")}`
        },
        {
            title: 'Action',
            dataIndex: '',
            width: '6%',
            render: action => <button className="btn btn-info btn-sm"><i className="fas fa-eye"></i></button>,
            onCell:order => {
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
        dataSource={orders}
        pagination={pagination}
        loading={multiLoading}
        onChange={handleTableChange}
        size='small'
        sticky
        // scroll={{ y: 400 }}
    />
    <Drawer
        title="Order Details"
        placement="right"
        width={800}
        closable
        onClose={()=>setIsDrawerOpen(false)}
        visible={isDrawerOpen}
        closeIcon={<i className="fas fa-times btn btn-danger"></i>}
    >
        <OrderDetail isOrderDetailOpen={isDrawerOpen} />
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
    orders: PropTypes.array,
    multiLoading: PropTypes.bool,
    pageCount: PropTypes.number,
    getOrder: PropTypes.func.isRequired,
    getOrders: PropTypes.func.isRequired,
}
const mapStateToProps = (state) => ({
    user: state.auth.adminProfile,
    orders: state.order.orders,
    multiLoading: state.order.multiLoading,
    totalCount: state.order.totalCount,
})

export default connect(mapStateToProps, { getOrders, getOrder })(Table)