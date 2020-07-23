import React, { Fragment } from "react";
import SuperadminBar from "./navbar/SuperadminBar";
import Footer from "./Footer";
import TopNavbar from './navbar/TopNavbar'
import AdminBar from './navbar/AdminBar'
import { connect } from 'react-redux'

const Layout = ({ children, role }) => {
  return (
    <Fragment>
      <div className="wrapper">
        {role === 'superadmin' && <SuperadminBar />}
        {role === 'admin' && <AdminBar />}
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
const mapStateToProps = state => ({
  role: state.Auth.role
})
export default connect(mapStateToProps)(Layout);
