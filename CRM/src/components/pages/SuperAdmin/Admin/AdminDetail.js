import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const AdminDetail = (props) => {
    return (
        <div>
            helloworld admin
        </div>
    )
}

AdminDetail.propTypes = {
    props: PropTypes
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminDetail)
