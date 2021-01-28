import React, { Fragment } from "react";
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { getOrders, getOrder } from '../../../redux/actions/order_actions'
import SuperadminBar from "./navbar/SuperadminBar";
import Footer from "./Footer";
import TopNavbar from './navbar/TopNavbar'
import AdminBar from './navbar/AdminBar'
import {verifyLocalStorage} from '../../utils/common'

const SideBar = ({user}) => {
  if (verifyLocalStorage().role === 'admin' ) {
    return <AdminBar />
  }
  if (verifyLocalStorage().role === 'superadmin' && user?.role === 'admin') {
     return <AdminBar adminProfile={user} />
  }
  return verifyLocalStorage().role === 'superadmin' && <SuperadminBar />
}

const Layout = ({ children, user}) => {
  console.log('hello from layout',user);
  return (
    <Fragment>
      <div className="wrapper">
        <SideBar user={user}/>
        {/* {(verifyLocalStorage().role === 'superadmin' && user?.role === 'admin') ? <AdminBar adminProfile={user} /> : <SuperadminBar />} */}
        {/* {verifyLocalStorage().role === 'superadmin' && <SuperadminBar />} */}
        {/* {verifyLocalStorage().role === 'admin' && <AdminBar />} */}
        <div className='main'>
          <TopNavbar />
          <main className='content'>

            <div className='container-fluid p-0'>
              {children}
            </div>

          </main>
          <Footer />
        </div>
      </div>
    </Fragment>
  );
};
// export default Layout;
Layout.propTypes = {
  user: PropTypes.object,
}
const mapStateToProps = (state) => ({
  user: state.auth.adminProfile,
})

export default connect(mapStateToProps, {})(Layout)
