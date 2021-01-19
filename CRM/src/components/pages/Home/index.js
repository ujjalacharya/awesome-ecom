import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../../core/Layout'

import Graph from './Graph';
import Todo from './Todo';
import { connect } from 'react-redux';



const Home = ({user}) => {
  let completedPercent = 0
  if (user?.shopName) completedPercent += 25
  if (user?.businessInfo) completedPercent += 25
  if (user?.adminBank) completedPercent += 25
  if (user?.adminWareHouse) completedPercent += 25
  return (
    <Layout>
      <div className="row">
        {(user?.adminBank &&
          user?.adminWareHouse &&
          user?.businessInfo
         )&&(<Todo user={user} completedPercent={completedPercent}/>)}
        <Graph/>
      </div>
    </Layout>
  )
}
Home.protoTypes = {
  user:PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
  user: state.auth.adminProfile,
})

export default connect(mapStateToProps,{})(Home)
