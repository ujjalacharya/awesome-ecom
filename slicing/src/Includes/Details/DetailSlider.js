import React, { useState, Component } from "react"
import Slider from "react-slick";
import PrevArrow from "../../Components/Includes/PrevArrow";
import NextArrow from "../../Components/Includes/NextArrow";

class DetailSlider extends Component{
    state = {
        imageUrl: '/images/prod-bag.jpg'
    }

    changeImage = (url) => {
        this.setState({
            imageUrl: url
        })
    }

    render(){
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            prevArrow: <PrevArrow />,
            nextArrow: <NextArrow />
        };
        return (
            <div className="slider">
                <div className="image-show">
                    <img src={this.state.imageUrl} alt="main image" />
                </div>
                <Slider {...settings} className="product-slider">
                    <img 
                        src="/images/prod-bag.jpg" 
                        alt="product image" 
                        onClick = {() => this.changeImage('/images/prod-bag.jpg')} 
                        className="prod-img"
                    />
                    <img 
                        src="/images/jacket.jpg" 
                        alt="product image" 
                        onClick = {() => this.changeImage('/images/jacket.jpg')} 
                        className="prod-img"
                    />
                    <img 
                        src="/images/top-viewed-1.jpg" 
                        alt="product image" 
                        onClick = {() => this.changeImage('/images/top-viewed-1.jpg')} 
                        className="prod-img"
                    />
                    <img 
                        src="/images/new-arrivals.jpg" 
                        alt="product image" 
                        onClick = {() => this.changeImage('/images/new-arrivals.jpg')} 
                        className="prod-img"
                    />
                    <img 
                        src="/images/prod-bag-2.jpg" 
                        alt="product image" 
                        onClick = {() => this.changeImage('/images/prod-bag-2.jpg')} 
                        className="prod-img"
                    />
                    <img 
                        src="/images/prod-bag-3.jpg" 
                        alt="product image" 
                        onClick = {() => this.changeImage('/images/prod-bag-3.jpg')} 
                        className="prod-img"
                    />
                </Slider>
            </div>
        )
    }
}

export default DetailSlider