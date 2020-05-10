import React, { Component } from 'react'
import Header from '../Components/Header'
import MainCarousel from '../Components/Carousel'

class Home extends Component {
    render(){
        return(
            <div className="wrapper">
                <Header />
                <div className="main-carousel">
                    <MainCarousel />
                </div>
                Body
            </div>
        )
    }
}

export default Home