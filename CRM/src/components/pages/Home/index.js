import React from 'react'
// import PropTypes from 'prop-types'
import Layout from '../../core/Layout'

import Graph from './Graph';
import Todo from './Todo';



const Home = props => {

  
  return (
    <Layout>
      <div className="row">
        <Todo/>
        <Graph/>
      </div>
    </Layout>
  )
}

export default Home
