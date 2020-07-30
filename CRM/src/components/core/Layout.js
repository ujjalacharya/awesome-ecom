import React, { Fragment } from "react";
import SuperadminBar from "./navbar/SuperadminBar";
import Footer from "./Footer";
import TopNavbar from './navbar/TopNavbar'
import AdminBar from './navbar/AdminBar'
import {verifyLocalStorage} from '../../utils/common'

const Layout = ({ children}) => {
  return (
    <Fragment>
      <div className="wrapper">
        {verifyLocalStorage().role === 'superadmin' && <SuperadminBar />}
        {verifyLocalStorage().role === 'admin' && <AdminBar />}
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
export default Layout;
