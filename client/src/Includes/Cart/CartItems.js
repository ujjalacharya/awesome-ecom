import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Pagination } from "antd";

//includes
import ProductListView from "../../Components/ProductListView";

// utils
import {
  scrollToTop,
  previousQuery,
} from "../../../utils/common";
import { myCartsSkeleton } from "../../../utils/skeletons";


const CartItems = (props) => {
  const cart = useSelector(state => state.cart)

  let [inStockProducts, setInStockProducts] = useState(myCartsSkeleton);
  let [noStockProducts, setNoStockProducts] = useState(myCartsSkeleton);
  let [perPage, setPerPage] = useState(5);

  let prevCartProducts = previousQuery(cart.getCartProducts)

  useEffect(() => {
    if (props.cartData) {
      scrollToTop();
    }

    if (prevCartProducts !== undefined && prevCartProducts !== cart.getCartProducts) {
      scrollToTop();
    }
  }, [cart.getCartProducts])

  const prevCartData = previousQuery(props.cartData);

  useEffect(() => {
    if (prevCartData !== props.cartData && props.cartData) {
      if (props.cartData.inStockProducts?.carts) {
        setInStockProducts({
          ...props.cartData.inStockProducts,
          carts: props.cartData.inStockProducts.carts && [...props.cartData.inStockProducts.carts].slice(
            0,
            perPage
          ),
        })
      }
      if (props.cartData.noStockProducts?.carts) {
        setNoStockProducts({
          ...props.cartData.noStockProducts,
          carts: props.cartData.noStockProducts?.carts && [...props.cartData.noStockProducts.carts].slice(
            0,
            perPage
          ),
        })
      }
    }
  }, [props.cartData])

  const onChangePageInStock = (page) => {
    let pageNum = (page - 1) * perPage;

    let newInStockProducts = {
      ...inStockProducts,
      carts: [...allinStockProducts.carts].slice(
        pageNum,
        pageNum + perPage
      ),
    };

    setInStockProducts(newInStockProducts);
  };
  
  let checkSkeleton = !props.cartData?.carts[0]?.product?.name ? true : false
  return (
    <div className="cart-items">
      <div className="delivery-status">
        {
          !checkSkeleton &&
          <div className="delivery-price">
            <span className="delivery-icon">
              <img src="/images/delivery-van.png" alt="delivery van" />
              <span>Standard Delivery</span>
            </span>

            {props.order?.getShippingChargeResp ? (
              <>
                {/* <span className="delivery-date">Get By: 25 - 28 Aug 2019</span> */}
                <span className="price">
                  Cost: Rs {props.order?.getShippingChargeResp}
                </span>
              </>
            ) : (
                <span className="price">
                  Please select the product to get the shipping charge
                </span>
              )}
          </div>
        }
      </div>
      <div className="bag-items">
        {
          !checkSkeleton &&
          <div className="title">
            <h4>My Cart ({inStockProducts?.totalCount} Items)</h4>
            <div className="price">
              Total: Rs {inStockProducts?.totalAmount?.toFixed(2)}
            </div>
          </div>
        }
        <div className="items-list">
          <ProductListView
            productsData={inStockProducts}
            getCheckoutItems={props.getCheckoutItems}
            showCheckbox={props.showCheckbox}
          />
          <div className="all-pagination">
            <Pagination
              defaultCurrent={1}
              pageSize={5}
              total={inStockProducts?.totalCount}
              onChange={onChangePageInStock}
              showLessItems={true}
            />
          </div>
        </div>
      </div>

      {noStockProducts?.carts?.length > 0 && (
        <div className="bag-items">
          {
            !checkSkeleton &&
            <div className="title">
              <h4>
                Out Of Stock ({noStockProducts?.totalCount} Items)
            </h4>
              <div className="price">
                Total: Rs {noStockProducts?.totalAmount?.toFixed(2)}
              </div>
            </div>
          }
          <div className="items-list">
            <ProductListView
              showCheckboxForOutOfStock="noCheckbox"
              productsData={noStockProducts}
              showQtySection="displayNone"
            />
          </div>
        </div>
      )}
    </div>
  );

}

export default CartItems;