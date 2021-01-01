import React, { Component, useEffect, useState } from "react";
import { Select, Row, Col } from "antd";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import _ from "lodash";

//includes
import ProductCard from "../../Components/Includes/ProductCard";
import { getBrandOptions, getColorOptions, previousQuery } from "../../../utils/common";
import { connect, useDispatch, useSelector } from "react-redux";
import actions from "../../../redux/actions";
import { withRouter } from "next/router";
import { SearchFilterSkeleton } from "../../../utils/skeletons";

// Select Option
const { Option } = Select;

const ProductList = (props) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart)
  const wishlist = useSelector((state) => state.wishlist)
  
  let [min_price, setMinPrice] = useState('')
  let [max_price, setMaxPrice] = useState('')
  let [searchFilters, setSearchFilters] = useState(SearchFilterSkeleton);

  useEffect(() => {
    if(max_price){
      setMaxPrice(props.currentFilter.max_price)
    }

    if(min_price){
      setMinPrice(props.currentFilter.min_price)
    }
  }, [max_price, min_price])
  
  let { cate, slug } = props.router.query;

  let prevAddToCartResp = previousQuery(cart.addToCartResp)
  let prevRemoveFromCartResp = previousQuery(cart.removeFromCartResp)

  let prevWishlistItemsResp = previousQuery(wishlist.wishlistItemsResp)
  let prevRemoveFromWishlistResp = previousQuery(wishlist.removeFromWishlistResp)
  
  useEffect(() => {
    if(cart.addToCartResp !== prevAddToCartResp && cart.addToCartResp){
      dispatch(actions.getProductsByCategory(`?page=1&perPage=10&cat_id=${cate}&cat_slug=${slug}`))
    }
    
    if(cart.removeFromCartResp !== prevRemoveFromCartResp && cart.removeFromCartResp){
      dispatch(actions.getProductsByCategory(`?page=1&perPage=10&cat_id=${cate}&cat_slug=${slug}`))
    }
    
    if(wishlist.wishlistItemsResp !== prevWishlistItemsResp && wishlist.wishlistItemsResp){
      dispatch(actions.getProductsByCategory(`?page=1&perPage=10&cat_id=${cate}&cat_slug=${slug}`))
    }
    
    if(wishlist.removeFromWishlistResp !== prevRemoveFromWishlistResp && wishlist.removeFromWishlistResp){
      dispatch(actions.getProductsByCategory(`?page=1&perPage=10&cat_id=${cate}&cat_slug=${slug}`))
    }

  }, [cart, wishlist])
  
  useEffect(() => {
    if(props.searchFilter){
      setSearchFilters(props.searchFilter)
    }
  }, [props.searchFilter])

  const { data, currentFilter } = props;
  
  let brandOptions = getBrandOptions(searchFilters);
  // if(!data){
  //   return <h1>Loading</h1>
  // }
  return (
    <div className="product-lists">
      <div className="sorting-page">
        <div className="view-sort">
          <div className="type-icon">
            <AppstoreOutlined className="list-icon" />
            {/* <BarsOutlined className="list-icon" /> */}
          </div>
          <Select
            style={{ width: 200 }}
            placeholder="SORT BY"
            className="sortyBy-select"
            onChange={(val) => props.sortProducts(val)}
            defaultValue="asc"
          >
            <Option value="asc">Ascending</Option>
            <Option value="desc">Descending</Option>
          </Select>
        </div>
        <div className="page-status">
          Page {props.currentPage} of{" "}
          {Math.ceil(data && data.totalCount / props.perPage)}
        </div>
      </div>
      {!_.isEmpty(currentFilter) && _.size(currentFilter) > 1 && props.filterApplied && (
        <div className="filtered-by">
          <span className="title">Filtered By:</span>
          {currentFilter.brands &&
            currentFilter.brands.length > 0 &&
            currentFilter.brands.map((brand, i) => {
              return (
                <>
                  {brandOptions.map((allBrand) => {
                    return (
                      <>
                        {brand === allBrand.value && (
                          <span
                            className="filter-tags"
                            onClick={() => props.removeBrand(brand)}
                            key={i}
                          >
                            Brand: {allBrand.label}
                            <i className="fa fa-times" aria-hidden="true"></i>
                          </span>
                        )}
                      </>
                    );
                  })}
                </>
              );
            })}

          {currentFilter.colors &&
            currentFilter.colors.length > 0 &&
            currentFilter.colors.map((color, i) => {
              return (
                <span
                  className="filter-tags"
                  onClick={() => props.removeColor(color)}
                  key={i}
                >
                  Color: {color}
                  <i className="fa fa-times" aria-hidden="true"></i>
                </span>
              );
            })}

          {currentFilter.ratings && (
            <span
              className="filter-tags"
              onClick={() => props.removeRating(currentFilter.ratings)}
            >
              Rating: {currentFilter.ratings} And Up
              <i className="fa fa-times" aria-hidden="true"></i>
            </span>
          )}

          {(max_price || min_price) && (
            <span
              className="filter-tags"
              onClick={() =>
                props.removePrice(
                  min_price,
                  max_price
                )
              }
            >
              Price: {min_price}{" "}
              {min_price && max_price && "-"}{" "}
              {max_price}
              <i className="fa fa-times" aria-hidden="true"></i>
            </span>
          )}


          {!_.isEmpty(currentFilter.warranties) &&
            currentFilter.warranties.map((warenty, i) => {
              return (
                <span
                  className="filter-tags"
                  onClick={() => props.removeWarrenty(warenty)}
                  key={i}
                >
                  Warrenty: {warenty}
                  <i className="fa fa-times" aria-hidden="true"></i>
                </span>
              );
            })}

          {!_.isEmpty(currentFilter.sizes) && (
            <span
              className="filter-tags"
              onClick={() => props.removeSize()}
            >
              Size: {currentFilter.sizes}
              <i className="fa fa-times" aria-hidden="true"></i>
            </span>
          )}
        </div>
      )}
      <div className="card-list">
        {
          data && data.products.length > 0 ?
            (<Row gutter={30}>
              {data.products.map((data, i) => {
                return (
                  <Col lg={6} sm={12} xs={24} key={i}>
                    <ProductCard data={data} />
                  </Col>
                );
              })}
            </Row>)
            : "No Products Available"}

      </div>
    </div>
  );
}

export default withRouter(ProductList);
