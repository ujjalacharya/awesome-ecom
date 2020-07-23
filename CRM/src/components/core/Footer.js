import React from 'react'

const Footer = props => {
    return (
        <>
            <footer className="footer">
                <div className="container-fluid">
                    <div className="row text-muted">
                        <div className="col-6 text-left">
                            <ul className="list-inline">
                                <li className="list-inline-item">
                                    <a className="text-muted" href="#">Support</a>
                                </li>
                                <li className="list-inline-item">
                                    <a className="text-muted" href="#">Help Center</a>
                                </li>
                                <li className="list-inline-item">
                                    <a className="text-muted" href="#">Privacy</a>
                                </li>
                                <li className="list-inline-item">
                                    <a className="text-muted" href="#">Terms of Service</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-6 text-right">
                            <p className="mb-0">
                                &copy; 2019 - <a href="index.html" className="text-muted">AppStack</a>
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer
