import React from 'react'
// import PropTypes from 'prop-types'
import Layout from '../../core/Layout'
import { Line, Bar, Doughnut } from 'react-chartjs-2';



const Home = props => {

  const completedData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Completed T dataset',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 10, 65]
      }
    ]
  };
  const salesData = {
    datasets: [{
      label: 'Sales',
      type: 'line',
      data: [51, 65, 40, 49, 60, 37, 40],
      fill: false,
      borderColor: '#EC932F',
      backgroundColor: '#EC932F',
      pointBorderColor: '#EC932F',
      pointBackgroundColor: '#EC932F',
      pointHoverBackgroundColor: '#EC932F',
      pointHoverBorderColor: '#EC932F',
      yAxisID: 'y-axis-2'
    }, {
      type: 'bar',
      label: 'Visitor',
      data: [200, 185, 590, 621, 250, 400, 95],
      fill: false,
      backgroundColor: '#71B37C',
      borderColor: '#71B37C',
      hoverBackgroundColor: '#71B37C',
      hoverBorderColor: '#71B37C',
      yAxisID: 'y-axis-1'
    }]
  };
  const salesOptions = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    responsive: true,
    tooltips: {
      mode: 'label'
    },
    elements: {
      line: {
        fill: false
      }
    },
    scales: {
      xAxes: [
        {
          display: true,
          gridLines: {
            display: false
          },
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
        }
      ],
      yAxes: [
        {
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y-axis-1',
          gridLines: {
            display: false
          },
          labels: {
            show: true
          }
        },
        {
          type: 'linear',
          display: true,
          position: 'right',
          id: 'y-axis-2',
          gridLines: {
            display: false
          },
          labels: {
            show: true
          }
        }
      ]
    }
  };

  const doughnutData = {
    labels: [
      'Pending',
      'Completed',
      'Cancelled'
    ],
    datasets: [{
      data: [300, 50, 100],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
      ]
    }]
  };

  const returnedProduct = {
    labels: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'],
    datasets: [
      {
        label: 'top 6 return product dataset',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  };
  return (
    <Layout>
      <div className="row">
        <div className="col-lg-6 col-xl-5 d-flex">
          <div className="w-100">
            <div className="row">
              <div className="col-sm-6">
                <div className="card flex-fill">
                  <div className="card-header">
                    <span className="badge badge-primary float-right">Today</span>
                    <h5 className="card-title mb-0">completed orders</h5>
                  </div>
                  <div className="card-body my-2">
                    <div className="row d-flex align-items-center mb-4">
                      <div className="col-8">
                        <h2 className="d-flex align-items-center mb-0 font-weight-light">
                          500
														</h2>
                      </div>
                      <div className="col-4 text-right">
                        <span className="text-muted">57%</span>
                      </div>
                    </div>

                    <div className="progress progress-sm shadow-sm mb-1">
                      <div className="progress-bar bg-primary" role="progressbar" style={{ width: "57%" }}></div>
                    </div>
                  </div>
                </div>
                <div className="card flex-fill">
                  <div className="card-header">
                    <span className="badge badge-info float-right">Monthly</span>
                    <h5 className="card-title mb-0">Pending Orders</h5>
                  </div>
                  <div className="card-body my-2">
                    <div className="row d-flex align-items-center mb-4">
                      <div className="col-8">
                        <h2 className="d-flex align-items-center mb-0 font-weight-light">
                          1.856
														</h2>
                      </div>
                      <div className="col-4 text-right">
                        <span className="text-muted">64%</span>
                      </div>
                    </div>

                    <div className="progress progress-sm shadow-sm mb-1">
                      <div className="progress-bar bg-info" role="progressbar" style={{ width: "64%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="card flex-fill">
                  <div className="card-header">
                    <span className="badge badge-warning float-right">Today</span>
                    <h5 className="card-title mb-0">New Customers</h5>
                  </div>
                  <div className="card-body my-2">
                    <div className="row d-flex align-items-center mb-4">
                      <div className="col-8">
                        <h2 className="d-flex align-items-center mb-0 font-weight-light">
                          15
														</h2>
                      </div>
                      <div className="col-4 text-right">
                        <span className="text-muted">82%</span>
                      </div>
                    </div>

                    <div className="progress progress-sm shadow-sm mb-1">
                      <div className="progress-bar bg-warning" role="progressbar" style={{ width: "82%" }}></div>
                    </div>
                  </div>
                </div>
                <div className="card flex-fill">
                  <div className="card-header">
                    <span className="badge badge-danger float-right">Monthly</span>
                    <h5 className="card-title mb-0">Cancelled Orders</h5>
                  </div>
                  <div className="card-body my-2">
                    <div className="row d-flex align-items-center mb-4">
                      <div className="col-8">
                        <h2 className="d-flex align-items-center mb-0 font-weight-light">
                          57.300
														</h2>
                      </div>
                      <div className="col-4 text-right">
                        <span className="text-muted">32%</span>
                      </div>
                    </div>

                    <div className="progress progress-sm shadow-sm mb-1">
                      <div className="progress-bar bg-danger" role="progressbar" style={{ width: "32%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-xl-7">
          <div className="card flex-fill w-100">
            <div className="card-header">
              <div className="card-actions float-right">
                <div className="dropdown">
                  <a href="#!" data-toggle="dropdown" data-display="static" aria-expanded="false">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-horizontal align-middle"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                  </a>

                  <div className="dropdown-menu dropdown-menu-right">
                    <a className="dropdown-item" href="#!">Action</a>
                    <a className="dropdown-item" href="#!">Another action</a>
                    <a className="dropdown-item" href="#!">Something else here</a>
                  </div>
                </div>
              </div>
              <h5 className="card-title mb-0">Sales VS Customers</h5>
            </div>
            <div className="card-body p-2">
              <Bar
                data={salesData}
                options={salesOptions}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-xl-7">
          <div className="card flex-fill w-100">
            <div className="card-header">
              <div className="card-actions float-right">
                <div className="dropdown">
                  <a href="#!" data-toggle="dropdown" data-display="static" aria-expanded="false">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-horizontal align-middle"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                  </a>

                  <div className="dropdown-menu dropdown-menu-right">
                    <a className="dropdown-item" href="#!">Action</a>
                    <a className="dropdown-item" href="#!">Another action</a>
                    <a className="dropdown-item" href="#!">Something else here</a>
                  </div>
                </div>
              </div>
              <h5 className="card-title mb-0">Sales</h5>
            </div>
            <div className="card-body p-2">
              <Line data={completedData} />
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-xl-5">
          <div className="card flex-fill w-100">
            <div className="card-header">
              <div className="card-actions float-right">
                <div className="dropdown">
                  <a href="#!" data-toggle="dropdown" data-display="static" aria-expanded="false">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-horizontal align-middle"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                  </a>

                  <div className="dropdown-menu dropdown-menu-right">
                    <a className="dropdown-item" href="#!">Action</a>
                    <a className="dropdown-item" href="#!">Another action</a>
                    <a className="dropdown-item" href="#!">Something else here</a>
                  </div>
                </div>
              </div>
              <h5 className="card-title mb-0">Tasks</h5>
            </div>
            <div className="card-body p-2">
              <Doughnut data={doughnutData} />
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-xl-7">
          <div className="card flex-fill w-100">
            <div className="card-header">
              <div className="card-actions float-right">
                <div className="dropdown">
                  <a href="#!" data-toggle="dropdown" data-display="static" aria-expanded="false">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-horizontal align-middle"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                  </a>

                  <div className="dropdown-menu dropdown-menu-right">
                    <a className="dropdown-item" href="#!">Action</a>
                    <a className="dropdown-item" href="#!">Another action</a>
                    <a className="dropdown-item" href="#!">Something else here</a>
                  </div>
                </div>
              </div>
              <h5 className="card-title mb-0">Top 6 returned Product</h5>
            </div>
            <div className="card-body p-2">
              <Bar
                data={returnedProduct}
              />
            </div>
          </div>
        </div>

      </div>
    </Layout>
  )
}

export default Home
