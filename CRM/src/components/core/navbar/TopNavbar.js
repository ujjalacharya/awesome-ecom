import React from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { signOut } from '../../../redux/actions/auth_actions'
import { Link } from 'react-router-dom';
import NotificationBar from './NotificationBar';

const TopNavbar = ({ signOut,user }) => {
	
	// console.log(data);
	console.log('hello from top nav bar');
    return (
		<nav className="navbar navbar-expand navbar-light bg-white">
			<Link className="sidebar-toggle d-flex mr-2" to=''>
				<i className="hamburger align-self-center"></i>
			</Link>

			<form className="form-inline d-none d-sm-inline-block">
				<input className="form-control form-control-no-border mr-sm-2" type="text" placeholder="Search projects..." aria-label="Search" />
			</form>

			<div className="navbar-collapse collapse">
				<ul className="navbar-nav ml-auto">
					<li className="nav-item dropdown">
						<Link className="nav-icon dropdown-toggle" to='' id="messagesDropdown" data-toggle="dropdown">
							<div className="position-relative">
								<i className="align-middle" data-feather="message-circle"></i>
								<span className="indicator">4</span>
							</div>
						</Link>
						<div className="dropdown-menu dropdown-menu-lg dropdown-menu-right py-0" aria-labelledby="messagesDropdown">
							<div className="dropdown-menu-header">
								<div className="position-relative">
									4 New Messages
									</div>
							</div>
							<div className="list-group">
								<Link to='' className="list-group-item">
									<div className="row no-gutters align-items-center">
										<div className="col-2">
											<img src="img\avatars\avatar-5.jpg" className="avatar img-fluid rounded-circle" alt="Ashley Briggs" />
										</div>
										<div className="col-10 pl-2">
											<div className="text-dark">Ashley Briggs</div>
											<div className="text-muted small mt-1">Nam pretium turpis et arcu. Duis arcu tortor.</div>
											<div className="text-muted small mt-1">15m ago</div>
										</div>
									</div>
								</Link>
								<Link to='' className="list-group-item">
									<div className="row no-gutters align-items-center">
										<div className="col-2">
											<img src="img\avatars\avatar-2.jpg" className="avatar img-fluid rounded-circle" alt="Carl Jenkins" />
										</div>
										<div className="col-10 pl-2">
											<div className="text-dark">Carl Jenkins</div>
											<div className="text-muted small mt-1">Curabitur ligula sapien euismod vitae.</div>
											<div className="text-muted small mt-1">2h ago</div>
										</div>
									</div>
								</Link>
								<Link to='' className="list-group-item">
									<div className="row no-gutters align-items-center">
										<div className="col-2">
											<img src="img\avatars\avatar-4.jpg" className="avatar img-fluid rounded-circle" alt="Stacie Hall" />
										</div>
										<div className="col-10 pl-2">
											<div className="text-dark">Stacie Hall</div>
											<div className="text-muted small mt-1">Pellentesque auctor neque nec urna.</div>
											<div className="text-muted small mt-1">4h ago</div>
										</div>
									</div>
								</Link>
								<Link to='' className="list-group-item">
									<div className="row no-gutters align-items-center">
										<div className="col-2">
											<img src="img\avatars\avatar-3.jpg" className="avatar img-fluid rounded-circle" alt="Bertha Martin" />
										</div>
										<div className="col-10 pl-2">
											<div className="text-dark">Bertha Martin</div>
											<div className="text-muted small mt-1">Aenean tellus metus, bibendum sed, posuere ac, mattis non.</div>
											<div className="text-muted small mt-1">5h ago</div>
										</div>
									</div>
								</Link>
							</div>
							<div className="dropdown-menu-footer">
								<Link to='' className="text-muted">Show all messages</Link>
							</div>
						</div>
					</li>
					<NotificationBar/>
					{/* <li className="nav-item dropdown">
							<Link className="nav-flag dropdown-toggle" to='' id="languageDropdown" data-toggle="dropdown">
                <img src="img\flags\us.png" alt="English"/>
              </Link>
							<div className="dropdown-menu dropdown-menu-right" aria-labelledby="languageDropdown">
								<Link className="dropdown-item" to=''>
                  <img src="img\flags\us.png" alt="English" width="20" className="align-middle mr-1"/>
                  <span className="align-middle">English</span>
                </Link>
								<Link className="dropdown-item" to=''>
                  <img src="img\flags\es.png" alt="Spanish" width="20" className="align-middle mr-1"/>
                  <span className="align-middle">Spanish</span>
                </Link>
								<Link className="dropdown-item" to=''>
                  <img src="img\flags\de.png" alt="German" width="20" className="align-middle mr-1"/>
                  <span className="align-middle">German</span>
                </Link>
								<Link className="dropdown-item" to=''>
                  <img src="img\flags\nl.png" alt="Dutch" width="20" className="align-middle mr-1"/>
                  <span className="align-middle">Dutch</span>
                </Link>
							</div>
						</li> */}
					<li className="nav-item dropdown">
						<Link className="nav-icon dropdown-toggle d-inline-block d-sm-none" to='' data-toggle="dropdown">
							<i className="align-middle" data-feather="settings"></i>
						</Link>

						<Link className="nav-link dropdown-toggle d-none d-sm-inline-block" to='' data-toggle="dropdown">
							<img src="img\avatar1.png" className="avatar img-fluid rounded-circle mr-1" alt="user"/> 
							<span className="text-dark">{user && user.name}</span>
						</Link>
						<div className="dropdown-menu dropdown-menu-right">
							<Link className="dropdown-item" to='/profile'><i className="align-middle mr-1" data-feather="user"></i> Profile</Link>
							<Link className="dropdown-item" to=''><i className="align-middle mr-1" data-feather="pie-chart"></i> Analytics</Link>
							<div className="dropdown-divider"></div>
							<Link className="dropdown-item" to=''>Settings & Privacy</Link>
							<Link className="dropdown-item" to=''>Help</Link>
							<Link className="dropdown-item" to='' onClick={signOut}>Sign out</Link>
						</div>
					</li>
				</ul>
			</div>
		</nav>

    )
}
TopNavbar.propTypes = {
	signOut: PropTypes.func.isRequired,
	user: PropTypes.object,
}
const mapStateToProps = state =>({
	user:state.auth.authUser,
})
export default connect(mapStateToProps, { signOut })(React.memo(TopNavbar))
