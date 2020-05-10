import React, { Component } from 'react'
import Header from '../Components/Header'
import MainCarousel from '../Components/Carousel'
import ProductSlider from '../Components/ProductSlider'

class Home extends Component {
    render(){
        return(
            <div className="wrapper">
                <Header />
                <div className="main-carousel">
                    <MainCarousel />
                </div>
                <ProductSlider />
                Body
            </div>
        )
    }
}

export default Home