// menu cates
{/* <div className="menu-list alldepart">
    <div className="title">ALL CATEGORIES</div>

    <ul className="category">
    {parentCate.map((cate, i) => {
        return (
        <li key={i}>
            <div className="title">
            <span>{cate.displayName}</span>
            <span className="title-icon">
                {cate.childCate.length > 0 && (
                <i
                    className="fa fa-angle-right"
                    aria-hidden="true"
                ></i>
                )}
            </span>
            </div>
            {cate.childCate.length > 0 && (
            <ul className="sub-category">
                {cate.childCate.map((subCate, i) => {
                return (
                    <li
                    key={i}
                    onClick={(e) =>
                        this.searchProducts(
                        e,
                        subCate.slug,
                        subCate._id
                        )
                    }
                    >
                    <div className="title">
                        <span>{subCate.displayName}</span>
                        <span className="sub-title-icon">
                        {subCate.childCate.length > 0 && (
                            <i
                            className="fa fa-angle-right"
                            aria-hidden="true"
                            ></i>
                        )}
                        </span>
                    </div>
                    {subCate.childCate.length > 0 && (
                        <ul className="sub-category next-sub">
                        {subCate.childCate.map(
                            (newSubCate, i) => {
                            return (
                                <li
                                key={i}
                                onClick={(e) =>
                                    this.searchProducts(
                                    e,
                                    newSubCate.slug,
                                    newSubCate._id
                                    )
                                }
                                >
                                <div className="title">
                                    <span>
                                    {newSubCate.displayName}
                                    </span>
                                </div>
                                </li>
                            );
                            }
                        )}
                        </ul>
                    )}
                    </li>
                );
                })}
            </ul>
            )}
        </li>
        );
    })}
    </ul>

</div> */}

// update trending
// case UPDATE_TRENDING_PRODUCTS:
//       let currentTrendingProducts = action.payload.data;
//       let changedSlug = action.payload.slug;
//       let newTrendingProducts = currentTrendingProducts.products.map((product) => {
//         // let ele = {}
//         if(changedSlug === product.slug){
//           if(product.hasOnWishList){
//             return {...product, hasOnWishlist: false}
//           }else{
//             return {...product, hasOnWishlist: true}
//           }
//         }
//         return product
//       })
//       newTrendingProducts = {
//         products: [...newTrendingProducts],
//         totalCount: newTrendingProducts.length
//       }
//       return {
//         ...state,
//         trendingProducts: newTrendingProducts,
//         hasError: false,
//         trendingLoading: false,
//       };