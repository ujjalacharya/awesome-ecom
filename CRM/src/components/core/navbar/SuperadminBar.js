import React from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import { logout } from '../../../actions/auth'
import SideBar from '../../common/SideBar'

const SuberadminBar = ({}) => {
    const titles = [
    //     {
    //     key:'dashboars',
    //     icon:'sliders',
    //     main: 'Dashboard',
    //     sub:[{
    //         name:'Default',
    //         path:'/'
    //     },{
    //     name: 'Default',
    //     path: '/'
    // }]
    // }, 
    {
        key:'admin',
        icon:'layout',
        main: 'Admin',
        sub: [ {
            name: 'Manage Admins',
            path: '/manage-admins'
        }]
        },
        {
            key:'product',
            icon: 'layout',
            main: 'Product',
            sub: [{
                name: 'Add Prodcut',
                path: '/add-product'
            }, {
                name: 'Manage Product',
                path: '/manage-products'
            }]
        },
        {
            key:'user',
            icon: 'layout',
            main: 'User',
            sub: [{
                name: 'Manage User',
                path: '/users'
            }, 
        ]
        }
    ]

    return (
        <SideBar titles={titles}/>
    )
}
// SuberadminBar.propTypes = {
//     logout: PropTypes.func.isRequired
// }

export default connect(null, {  })(SuberadminBar)
