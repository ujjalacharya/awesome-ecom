import React from 'react'
import { Link } from "react-router-dom";

const SideBar = ({titles}) => {
    return (
        <nav id="sidebar" className="sidebar" width='10%'>
            <div className="sidebar-content ">
                {/* <Link className="sidebar-brand" to={'/'}>
                    <img className=" mr-3" src="img\logo.png" alt="logo" width="60%" height="50%" />
                </Link> */}
                <a class="sidebar-brand" href="index.html">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-box align-middle"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                    <span class="align-middle">K I N D E E M</span>
                </a>

                <ul className="sidebar-nav">
                    <li className="sidebar-header">
                        Main
					</li>
                    {
                        titles.map((t, i) => (
                            <li key={i} className="sidebar-item">
                                <a href={`#${t.key}`} data-toggle="collapse" className="sidebar-link collapsed">
                                    <i className="align-middle" data-feather={t.icon}></i> <span className="align-middle">{t.main}</span>
                                </a>
                                <ul id={`${t.key}`} className="sidebar-dropdown list-unstyled collapse " data-parent="#sidebar">
                                    {
                                        t.sub.map((s, j) => (
                                            <li key={j} className="sidebar-item"><Link className="sidebar-link" to={s.path}>{s.name}</Link></li>
                                        ))
                                    }
                                </ul>
                            </li>
                        ))
                    }

                </ul>

                {/* <div className="sidebar-bottom d-none d-lg-block">
                    <div className="media">
                        <img className="rounded-circle mr-3" src="img\avatars\avatar.jpg" alt="Chris Wood" width="40" height="40" />
                        <div className="media-body">
                            <h5 className="mb-1">Chris Wood</h5>
                            <div>
                                <i className="fas fa-circle text-success"></i> Online
							</div>
                        </div>
                    </div>
                </div> */}

            </div>
        </nav>

    )
}

export default SideBar
