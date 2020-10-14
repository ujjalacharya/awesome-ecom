import React, { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import moment from 'moment'
import { getNotifications, readNotification } from '../../../redux/actions/notification_actions'

const NotificationBar = ({ socket, getNotifications, adminNotification, readNotification }) => {
	const [numberOfNotifications, setnumberOfNotifications] = useState(0)
	useEffect(()=> {
		// console.log(adminNotification);
		setnumberOfNotifications(adminNotification.noOfUnseen)
	}, [adminNotification])
	useEffect(() => {
		if (!isEmpty(socket)) {
			socket.on("notification", data => {
					setnumberOfNotifications(data.noOfUnseen)
			});
		}
		return () => {
			// console.log(socket);
			// socket.off("notification")
		}
	}, [socket])
	const renderNotification = (notificationObj) => {
		const { notificationType, notificationDetail, hasRead, date, _id} = notificationObj
		switch (notificationType) {
			case 'question_on_product':
				return <Link key={_id} to='/' onClick={() => readNotification(_id)} className="list-group-item">
					<div className={`row no-gutters align-items-center `}>
						<div className="col-2">
							<i className="align-middle mr-2 fas fa-fw fa-question-circle"></i>
						</div>
						<div className="col-10">
							<div className="text-dark">Asked question</div>
							<div className="text-muted small mt-1">
								<strong>{notificationDetail.questionBy} </strong>has asked a question on product <strong>{notificationDetail.onProduct}</strong></div>
							<div className="text-muted small mt-1">{moment(date).fromNow()}</div>
						</div>
					</div>
				</Link>
			default:
				return null;
		}
	}

	console.log('hello from notification');
	return (
		<li className="nav-item dropdown">
			<Link className="nav-icon dropdown-toggle" to='' onClick={getNotifications} id="alertsDropdown" data-toggle="dropdown">
				<div className="position-relative">
					<i className="align-middle" data-feather="bell"></i>
					{numberOfNotifications>0?<span className="indicator">{numberOfNotifications}</span>:null}
				</div>
			</Link>
			<div className="dropdown-menu dropdown-menu-lg dropdown-menu-right py-0" aria-labelledby="alertsDropdown">
				{/* <div className="dropdown-menu-header">
								4 New Notifications
								</div> */}
				<div className="list-group">
				{
					adminNotification.notifications.map(n=>renderNotification(n))
				}
					<Link to='' className="list-group-item">
						<div className="row no-gutters align-items-center">
							<div className="col-2">
								<i className="align-middle mr-2 fas fa-fw fa-question-circle"></i>
							</div>
							<div className="col-10">
								<div className="text-dark">Update completed</div>
								<div className="text-muted small mt-1">Restart server 12 to complete the update.</div>
								<div className="text-muted small mt-1">2h ago</div>
							</div>
						</div>
					</Link>
					<Link to='' className="list-group-item">
						<div className="row no-gutters align-items-center">
							<div className="col-2">
								<i className="text-warning" data-feather="bell"></i>
							</div>
							<div className="col-10">
								<div className="text-dark">Lorem ipsum</div>
								<div className="text-muted small mt-1">Aliquam ex eros, imperdiet vulputate hendrerit et.</div>
								<div className="text-muted small mt-1">6h ago</div>
							</div>
						</div>
					</Link>
					<Link to={'/'} className="list-group-item">
						<div className="row no-gutters align-items-center">
							<div className="col-2">
								<i className="text-primary" data-feather="message-circle"></i>
							</div>
							<div className="col-10">
								<div className="text-dark">Login from 192.186.1.1</div>
								<div className="text-muted small mt-1">8h ago</div>
							</div>
						</div>
					</Link>
					<Link to='' className="list-group-item">
						<div className="row no-gutters align-items-center">
							<div className="col-2">
								<i className="text-success" data-feather="user-plus"></i>
							</div>
							<div className="col-10">
								<div className="text-dark">New connection</div>
								<div className="text-muted small mt-1">Anna accepted your request.</div>
								<div className="text-muted small mt-1">12h ago</div>
							</div>
						</div>
					</Link>
				</div>
				<div className="dropdown-menu-footer">
					<Link to='' className="text-muted">Show all notifications</Link>
				</div>
			</div>
		</li>

	)
}
NotificationBar.propTypes = {
	socket: PropTypes.object,
	getNotifications: PropTypes.func.isRequired,
	adminNotification: PropTypes.object,
	readNotification: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
	socket: state.socket,
	adminNotification: state.notification
})
export default connect(mapStateToProps, {getNotifications, readNotification})(NotificationBar)
