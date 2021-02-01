import React, { useState, useEffect, useMemo, useRef } from 'react'
import { Table as AntdTable, Input, Button, Space, Modal , Avatar, Drawer} from 'antd';
import Highlighter from 'react-highlight-words';
import { useHistory } from "react-router-dom";
import moment from 'moment'
import { SearchOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAdmins, getAdmin, beAdmin} from '../../../../redux/actions/superadmin_action'
import AdminDetail from './AdminDetail';

const Table = ({ getAdmin, getAdmins, beAdmin, multiLoading, admins, totalCount, user }) => {
    let history = useHistory();
    const [pagination, setPagination] = useState({
        defaultPageSize:5,
        total: 0,
        pageSizeOptions: [5, 10, 15, 20, 50, 100],
        showQuickJumper: true
    })
    // const [searchText, setSearchText] = useState('')
    // const [searchedColumn, setSearchedColumn] = useState('')
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const searchInput = useRef(null);

    useEffect(() => {
         getAdmins(pagination.current, pagination.pageSize)
    }, [])
    // useEffect(() => {
    //     adminProfile && history.push('/')
    // }, [adminProfile])


    useEffect(() => {
        setPagination({ ...pagination, total: totalCount })
    }, [totalCount])

    const handleTableChange = (pagination, filters) => {
        getAdmins(pagination.current, pagination.pageSize, filters.status?.[0])
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

    const getAdminsearchProps = dataIndex => ({
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
        render: admin =>{
            return (<>
                {admin.name}{' '}<Avatar shape="square" size='small' src={`${process.env.REACT_APP_SERVER_URL}/uploads/${admin.photo}`}/>
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

    const openAdmin = (admin) => {
        setIsDrawerOpen(true)
        getAdmin(admin._id)
    }
    const beingAdmin = (admin) => {
        let isAdmin = beAdmin(admin._id,history)
        // isAdmin && history.push('/')
    }

    const columns = useMemo(() => [
        {
            title: 'Admin',
            dataIndex: '',
            key:'admin',
            width: '15%',
            ...getAdminsearchProps('')
        },
        {
            title: 'Shop Name',
            dataIndex: 'shopName',
            width: '15%',
        },
        {
            title: 'Admin Address',
            children: [
                {
                    title: 'District',
                    dataIndex: 'district',
                    key: 'city',
                    width: '10%',
                },
                {
                    title: 'City',
                    dataIndex: 'address',
                    key: 'address',
                    width: '10%',
                },
                {
                    title: 'Muncipality',
                    dataIndex: '',
                    key: 'muncipality',
                    render: admin => admin.wardno ? `${admin.muncipality}-${admin.wardno}` : <span className="badge badge-pill badge-secondary">Incomplete Profile</span>,
                    width: '10%',
                },
            ]
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            width: '10%',
        },
        {
            title: 'Status',
            dataIndex: '',
            key: 'status',
            filterMultiple: false,
            filters: [
                { text: 'All', value: 'undefined' },
                { text: 'Verified', value: 'verified' },
                { text: 'Not Verified', value: 'unverified' },
                { text: 'Blocked', value: 'blocked' },
            ],
            render: admin => {
                if (admin.isBlocked) return (<span className="badge badge-pill badge-danger">blocked</span>)
                if (admin.isVerified) return (<span className="badge badge-pill badge-success">verified</span>)
                if (!admin.isVerified) return (<span className="badge badge-pill badge-warning">unverified</span>)
            },
            width: '8%',
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
            width: '10%',
            render: admin => <>
            {admin.wardno ? <>
                    <button onClick={e => openAdmin(admin)} className="btn btn-info btn-sm"><i className="fas fa-eye"></i></button>
                    <button onClick={e => beingAdmin(admin)} className="btn btn-info btn-sm"><i className="fas fa-pen"></i></button>
            </>:null}
            </>,
        },
    ], []);
    

    return (
    <>
    <AntdTable
        columns={columns}
        rowKey={record => record._id}
        dataSource={admins}
        pagination={pagination}
        loading={multiLoading}
        onChange={handleTableChange}
        size='small'
        // scroll={{ y: 400 }}
    />
    <Drawer
        title="Admin Details"
        placement="right"
        width={800}
        closable
        onClose={()=>setIsDrawerOpen(false)}
        visible={isDrawerOpen}
        closeIcon={<i className="fas fa-times btn btn-danger"></i>}
    >
        <AdminDetail isAdminDetailOpen={isDrawerOpen} />
    </Drawer>
    </>)
}

Table.propTypes = {
    user: PropTypes.object,
    admins: PropTypes.array,
    multiLoading: PropTypes.bool,
    pageCount: PropTypes.number,
    getAdmin: PropTypes.func.isRequired,
    getAdmins: PropTypes.func.isRequired,
    beAdmin: PropTypes.func.isRequired,
}
const mapStateToProps = (state) => ({
    user: state.auth.user,
    // adminProfile: state.auth.adminProfile,
    admins: state.superadmin.admins,
    multiLoading: state.superadmin.multiAdminLoading,
    totalCount: state.superadmin.totalCount,
})

export default connect(mapStateToProps, { getAdmins, getAdmin, beAdmin })(Table)