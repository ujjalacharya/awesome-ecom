import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Carousel, Tabs } from 'antd';
import { SideBySideMagnifier } from "react-image-magnifiers";
import parse from 'html-react-parser';
import ProductStatus from './ProductStatus'
const { TabPane } = Tabs


export const ProductDetail = ({product, singleLoading, isSuperadmin}) => {
    const contentStyle = {
        height: '170px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };
    return (
        <div className="row">
            <div className="col-xl-5">
                <Carousel>
                    {
                        product?.images.map(image => (

                            <div key={image._id}>
                                <h3 style={contentStyle}>
                                    <SideBySideMagnifier
                                        style={{ height: '100%', width: '100%' }}
                                        alwaysInPlace={true}
                                        imageSrc={`${process.env.REACT_APP_SERVER_URL}/uploads/${image.medium}`}
                                        imageAlt="Example"
                                    // largeImageSrc={`${process.env.REACT_APP_SERVER_URL}/uploads/${image.large}`} // Optional
                                    />
                                </h3>
                            </div>
                        ))
                    }
                </Carousel>
            </div>
            <div className="col-xl-7">
                <div className="mb-2">
                    <h2>{product?.name}</h2>
                </div>
                <div className="mb-2">
                    <p><strong>brand:</strong> {product?.brand?.brandName}     <strong>category:</strong> {product?.category?.map(c=>c.displayName).join(', ')}</p>
                </div>
                <div className="mb-2">
                    <p><strong>tags:</strong> {product?.tags?.join(', ')}</p>
                </div>
                <ProductStatus isSuperadmin={isSuperadmin} product={product}/>
            </div>
            <div className="row mb-12">
                <div className="col-md-12">
                    <div className="my-2">
                        <h6>Highlights:</h6>
                    </div>
                    {
                        product && parse(product?.highlights)
                    }
                    <hr className="my-2"/>
                    <div className="my-2">
                        <h6>Details:</h6>
                    </div>
                    <Tabs >
                        <TabPane tab="Description" key="a">
                            {product && parse(product?.description)}
                        </TabPane>
                        <TabPane tab="Other" key="b">
                            helloworld
                        </TabPane>
                    </Tabs>
                </div>
            </div>
            
        </div>
    )
}

ProductDetail.propTypes = {
    product: PropTypes.object,
    singleLoading: PropTypes.bool,
    isSuperadmin:PropTypes.bool,
}

const mapStateToProps = (state) => ({
    product: state.product.product,
    singleLoading: state.product.singleLoading
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
