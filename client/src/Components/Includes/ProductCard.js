import React, { Component, useEffect, useState } from "react";
import { Tooltip } from "antd";
import { Popconfirm } from "antd";
import { connect, useDispatch, useSelector } from "react-redux";
import { withRouter } from "next/router";

//includes
import QuickViewModal from "./QuickViewModal";
import Link from "next/link";
import actions from "../../../redux/actions";
import StarRatings from "react-star-ratings";
import { IMAGE_BASE_URL } from "../../../utils/constants";
import { previousQuery } from "../../../utils/common";
import { singleProductCardSkeleton } from "../../../utils/skeletons";

const ProductCard = (props) => {
  const dispatch = useDispatch();
  const authentication = useSelector((state) => state.authentication)

  let [ showQuickView, setShowQuickView ] = useState(false);
  let [productData, setProductData] = useState(singleProductCardSkeleton);

  let prevData = previousQuery(props.data);

  useEffect(() => {
    if (prevData !== props.data && props.data) {
      setProductData(props.data);
    }
  }, [props.data])

  const showModal = () => {
    setShowQuickView(true)
  };

  const handleCancel = () => {
    setShowQuickView(false)
  };

  const addToWishlists = (slug) => {
    dispatch(actions.addWishListItems(slug, props.sliderName))
  }

  const removeFromWishList = (id) => {
    dispatch(actions.removeFromWishList(id, props.sliderName))
  }

  const addToCart = (slug, qty) => {
    dispatch(actions.addToCart(slug, qty, props.sliderName))
  }

  const removeFromCart = (id) => {
    dispatch(actions.removeCart(id, props.sliderName))
  }

  let checkSkeleton = productData.name === "" ? true : false;

  let loginToken = authentication.token;

  return (
    <div className={"product-card " + (checkSkeleton && "skeleton")}>
      {showQuickView && (
        <QuickViewModal
          title="Quick View Product"
          visible={showQuickView}
          onCancel={handleCancel}
          data={productData}
        />
      )}
      <div className="product-box-shadow">
        <div className="hover-items-image">
          <div className={"card-hover-items"}>
            <div className="card-items">
              <Tooltip
                placement="topLeft"
                title="Quick View"
                arrowPointAtCenter
              >
                <img
                  src="/images/medical.png"
                  alt="medical.png"
                  onClick={showModal}
                />
              </Tooltip>
            </div>
            <div className="card-items">
              {loginToken ? (
                !productData.hasOnCart ? (
                  <Tooltip
                    placement="topLeft"
                    title="Add to Cart"
                    arrowPointAtCenter
                  >
                    <img
                      src="/images/bag.png"
                      alt="bag.jpg"
                      title="Add to Cart"
                      onClick={() => {
                        addToCart(productData.slug, { quantity: 1 })
                      }}
                    />
                  </Tooltip>
                ) : (
                    <Popconfirm
                      title="Are you sure you want to remove this from cart?"
                      onConfirm={() =>
                        removeFromCart(productData.hasOnCart._id)
                      }
                      // onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                    >
                      <a>
                        <Tooltip
                          placement="topLeft"
                          title="Remove from Cart"
                          arrowPointAtCenter
                        >
                          <img
                            src="/images/bag-blue.png"
                            alt="bag.jpg"
                            title="Remove from Cart"
                          />
                        </Tooltip>
                      </a>
                    </Popconfirm>
                  )
              ) : (
                  <Link href={`/login?origin=${props.router.asPath}`}>
                    <a style={{ display: "flex", alignItems: "center" }}>
                      <Tooltip
                        placement="topLeft"
                        title="Add to Cart"
                        arrowPointAtCenter
                      >
                        <img src="/images/bag.png" alt="bag.jpg" />
                      </Tooltip>
                    </a>
                  </Link>
                )}
            </div>
            <div className="card-items">
              {loginToken ? (
                productData.hasOnWishlist ? (
                  <Popconfirm
                    title="Are you sure you want to remove this from wishlist?"
                    onConfirm={() =>
                      removeFromWishList(productData.hasOnWishlist._id)
                    }
                    // onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <a>
                      <Tooltip
                        placement="topLeft"
                        title="Remove from Wishlist"
                        arrowPointAtCenter
                      >
                        <img
                          data-tip="Remove from Wishlist"
                          src="/images/heart-blue.png"
                        />
                      </Tooltip>
                    </a>
                  </Popconfirm>
                ) : (
                    <Tooltip
                      placement="topLeft"
                      title="Add to Wishlist"
                      arrowPointAtCenter
                    >
                      <img
                        data-tip="Add to Wishlist"
                        src="/images/heart.png"
                        onClick={() =>
                          addToWishlists(productData.slug)
                        }
                      />
                    </Tooltip>
                  )
              ) : (
                  <Link href={`/login?origin=${props.router.asPath}`}>
                    <a>
                      <Tooltip
                        placement="topLeft"
                        title="Add to Wishlist"
                        arrowPointAtCenter
                      >
                        <img
                          data-tip="Add to Wishlist"
                          src="/images/heart.png"
                        />
                      </Tooltip>
                    </a>
                  </Link>
                )}
            </div>
            {/* <div className="card-items">
              <Tooltip
                placement="topLeft"
                title="Add to Compare"
                arrowPointAtCenter
              >
                <img src="/images/sliders.png" alt="slider.jpg" />
              </Tooltip>
            </div> */}
          </div>
          {
            checkSkeleton ?
              <div className="image">
                {
                  productData.images[0].medium ?
                    <img
                      src={`${IMAGE_BASE_URL}/${productData.images[0].medium}`}
                      onError={(ev) => {
                        ev.target.src = "/images/default-image.png";
                      }}
                      alt={productData.name}
                    /> : (
                      <img
                        src={`/images/default-image.png`}
                        alt={productData.name}
                      />
                    )
                }
              </div> : (
                <Link
                  href={`/products/[slug]`}
                  key={productData.slug}
                  as={`/products/${productData.slug}`}
                >
                  <a>
                    <div className="image">
                      {
                        productData.images[0].medium ?
                          <img
                            src={`${IMAGE_BASE_URL}/${productData.images[0].medium}`}
                            onError={(ev) => {
                              ev.target.src = "/images/default-image.png";
                            }}
                            alt={productData.name}
                          /> : (
                            <img
                              src={`/images/default-image.png`}
                              alt={productData.name}
                            />
                          )
                      }
                    </div>
                  </a>
                </Link>
              )
          }

        </div>
        {
          checkSkeleton ? (
            <div className="card-body">
              <div className="card-category small-line">
                <div className="cate">
                  {productData.category.map((cate, i) => {
                    return (
                      <span key={i}>
                        {cate.displayName}
                        {productData.category.length !== i + 1 && " - "}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="prod-name medium-line">{productData.name}</div>
              <div className="prod-price large-line">
                {!checkSkeleton && "Rs"} {productData.price.$numberDecimal}
              </div>
            </div>) : (
              <Link
                href={`/products/[slug]`}
                key={productData.slug}
                as={`/products/${productData.slug}`}
              >
                <a>
                  <div className="card-body">
                    <div className="card-category small-line">
                      <div className="cate">
                        {productData.category.map((cate, i) => {
                          return (
                            <span key={i}>
                              {cate.displayName}
                              {productData.category.length !== i + 1 && " - "}
                            </span>
                          );
                        })}
                      </div>
                      {!checkSkeleton && (
                        <div className="stars">
                          {productData?.averageRating?.$numberDecimal ? (
                            <StarRatings
                              rating={parseFloat(
                                productData.averageRating.$numberDecimal
                              )}
                              starDimension="13px"
                              starSpacing="1px"
                              starRatedColor="#f2c900"
                              starEmptyColor="#eee"
                            />
                          ) : (
                              <StarRatings
                                rating={5}
                                starDimension="13px"
                                starSpacing="1px"
                                starRatedColor="#eee"
                                starEmptyColor="#eee"
                              />
                            )}
                        </div>
                      )}
                    </div>
                    <div className="prod-name medium-line">{productData.name}</div>
                    <div className="prod-price large-line">
                      {!checkSkeleton && "Rs"} {productData.price.$numberDecimal}
                    </div>
                  </div>
                </a>
              </Link>
            )
        }

      </div>
    </div>
  );
}

export default withRouter(ProductCard);