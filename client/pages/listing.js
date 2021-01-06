import React, { useEffect, useState } from "react";
import { Row, Col, Pagination, Drawer } from "antd";
import _, { filter } from "lodash";

// redux
import { useDispatch } from "react-redux";
import actions from "../redux/actions";

// next router
import { withRouter } from "next/router";

// utils
import { getFilterAppendBody, previousQuery } from "../utils/common";

// includes
import ProductList from "../src/Includes/Listing/ProductList";
import Filter from "../src/Includes/Listing/Filter";
import SortBy from "../src/Includes/Listing/SortBy";

const Listing = (props) => {
  let dispatch = useDispatch()

  let [visibleFilter, setVisibleFilter] = useState(false)
  let [visibleSort, setVisibleSort] = useState(false)
  let [filterApplied, setFilterApplied] = useState(false)
  let [currentPage, setCurrentPage] = useState(1)
  let [checkedBrands, setCheckedBrands] = useState([])
  let [checkedColors, setCheckedColors] = useState([])
  let [filterBody, setFilterBody] = useState(props.body)
  let [minPrice, setMinPrice] = useState('')
  let [maxPrice, setMaxPrice] = useState('')
  let [selectedWarrenty, setSelectedWarrenty] = useState('')
  let [selectedSize, setSelectedSize] = useState('')
  let [currentRating, setCurrentRating] = useState(0)
  let [sortBy, setSortBy] = useState('asc')

  let path = props.router.asPath;
  let prevPath = previousQuery(path)

  useEffect(() => {
    if (prevPath !== undefined && path !== prevPath) {
      setFilterBody({})
      setFilterApplied(false)
      setCurrentRating(0)
    }
  }, [])

  let { query } = props.router
  let prevQuery = previousQuery(query.slug)

  useEffect(() => {
    if (query.slug !== prevQuery && query.slug) {
      setCheckedBrands([]);
      setCheckedColors([]);
      setMaxPrice('');
      setMinPrice('');
      setSelectedSize('');
      setSelectedWarrenty('');
      setCurrentRating(0);
      console.log('hey')
      console.log(props)
      let body = props.listType === "category" ? { cat_id: query.cate } : { keyword: query.slug }
      console.log(body)
      setFilterBody(body);
    }
  }, [query.slug])
  
  console.log(filterBody)

  const showDrawerFiter = () => {
    setVisibleFilter(true)
  };

  const showDrawerSort = () => {
    setVisibleSort(true)
  };

  const onCloseFilter = () => {
    setVisibleFilter(false)
  };

  const onCloseSort = () => {
    setVisibleSort(false)
  };

  const onChangePage = (page) => {
    setCurrentPage(page)
    dispatch(actions.searchProducts(
      `?page=${page}&perPage=${props.perPage}&createdAt=${sortBy}`,
      filterBody
    ))
  };

  const onCheckBrands = (brands) => {
    setCheckedBrands(brands);

    let body = {};

    body = getFilterAppendBody(
      filterBody,
      props,
      brands,
      "brands"
    );

    setFilterBody(body)

    if (!visibleFilter) {
      dispatch(actions.searchProducts(
        `?page=${currentPage}&perPage=${props.perPage}&createdAt=${sortBy}`,
        body
      ))
      setFilterApplied(true)
    }
  };

  const onChangeColors = (colors) => {
    setCheckedColors(colors)

    let body = {};

    body = getFilterAppendBody(
      filterBody,
      props,
      colors,
      "colors"
    );

    setFilterBody(body)

    if (!visibleFilter) {
      dispatch(actions.searchProducts(
        `?page=${currentPage}&perPage=${props.perPage}&createdAt=${sortBy}`,
        body
      ))
      setFilterApplied(true)
    }
  };

  const onHandleRatings = (rating) => {
    setCurrentRating(rating)

    let body = {};

    body = getFilterAppendBody(
      filterBody,
      props,
      rating + "",
      "ratings"
    );

    setFilterBody(body)

    if (!visibleFilter) {
      dispatch(actions.searchProducts(
        `?page=${currentPage}&perPage=${props.perPage}&createdAt=${sortBy}`,
        body
      ))
      setFilterApplied(true)
    }
  };

  const changePrice = (price, type) => {
    if (type === "min") {
      setMinPrice(price)
    } else {
      setMaxPrice(price)
    }
  };

  const searchPrice = (minPrice, maxPrice) => {
    let body = {};

    body = getFilterAppendBody(
      filterBody,
      props,
      minPrice + "",
      "min_price"
    );

    body = getFilterAppendBody(body, props, maxPrice + "", "max_price");

    setFilterBody(body)

    if (!visibleFilter) {
      dispatch(actions.searchProducts(
        `?page=${currentPage}&perPage=${props.perPage}&createdAt=${sortBy}`,
        body
      ))
      setFilterApplied(true)
    }

  };

  const onChangeWarrenty = (warrenty) => {
    setSelectedWarrenty(warrenty)

    let body = {};

    let warenty = warrenty === "" ? [] : [warrenty];

    body = getFilterAppendBody(
      filterBody,
      props,
      warenty,
      "warranties"
    );

    setFilterBody(body)

    if (!visibleFilter) {
      dispatch(actions.searchProducts(
        `?page=${currentPage}&perPage=${props.perPage}&createdAt=${sortBy}`,
        body
      ))
      setFilterApplied(true)
    }
  };

  const sortProducts = (sort) => {
    setSortBy(sort)

    dispatch(actions.searchProducts(
      `?page=${currentPage}&perPage=${props.perPage}&createdAt=${sort}`,
      filterBody
    ))
  };

  const onChangeSize = (size) => {
    setSelectedSize(size)

    let body = {};

    body = getFilterAppendBody(
      filterBody,
      props,
      size,
      "sizes"
    );

    setFilterBody(body)

    if (!visibleFilter) {
      dispatch(actions.searchProducts(
        `?page=${currentPage}&perPage=${props.perPage}&createdAt=${sortBy}`,
        body
      ))
      setFilterApplied(true)
    }
  };

  const removeBrand = (brand) => {
    let newBrands = checkedBrands.filter((obj) => {
      return obj !== brand;
    });

    onCheckBrands(newBrands);
  };

  const removeColor = (color) => {
    let newColors = checkedColors.filter((obj) => {
      return obj !== color;
    });

    onChangeColors(newColors);
  };

  const removeRating = (rating) => {
    onHandleRatings("");
  };

  const removePrice = () => {
    setMinPrice('');
    setMaxPrice('');
    searchPrice("", "");
  };

  const removeWarrenty = () => {
    onChangeWarrenty("");
  };

  const removeSize = () => {
    onChangeSize("");
  };

  const applyFilter = async () => {
    setFilterApplied(true)

    let newFilterBody = filterBody
    if (minPrice) {
      newFilterBody = getFilterAppendBody(
        newFilterBody,
        props,
        minPrice + "",
        "min_price"
      );
    }

    if (maxPrice) {
      newFilterBody = getFilterAppendBody(newFilterBody, props, maxPrice + "", "max_price");
    }

    setFilterBody(newFilterBody);

    dispatch(actions.searchProducts(
      `?page=${currentPage}&perPage=${props.perPage}&createdAt=${sortBy}`,
      newFilterBody
    ))
  }

  const totalPage = props.data ? Math.ceil(props.data.totalCount / props.perPage) : 0;

  return (
    <div className="wrapper">
      <section className="listing">
        <div className="container">
          <Row>
            <Col lg={4} xs={24} md={6} className="remove-filter">
              <Filter
                removeThisFilter="noDisplayMobAndTab"
                data={props.getSearchFilter}
                onCheckBrands={onCheckBrands}
                checkedBrands={checkedBrands}
                onChangeColors={onChangeColors}
                checkedColors={checkedColors}
                onHandleRatings={onHandleRatings}
                searchPrice={searchPrice}
                changePrice={changePrice}
                minPrice={minPrice}
                maxPrice={maxPrice}
                onChangeWarrenty={onChangeWarrenty}
                selectedWarrenty={selectedWarrenty}
                onChangeSize={onChangeSize}
                selectedSize={selectedSize}
                currentRating={currentRating}
              />
            </Col>
            <Col lg={20} xs={24} md={18} className="right-listing">
              <div className="products-title">All Products</div>
              <ProductList
                data={props.data}
                perPage={props.perPage}
                currentPage={currentPage}
                currentFilter={filterBody}
                searchFilter={props.getSearchFilter}
                sortProducts={sortProducts}
                removeBrand={removeBrand}
                removeColor={removeColor}
                removeRating={removeRating}
                removePrice={removePrice}
                removeWarrenty={removeWarrenty}
                removeSize={removeSize}
                filterApplied={filterApplied}
              />
              <div className="pagination">
                {
                  (totalPage !== 0) ?
                    <div className="page-status">
                      Page {currentPage} of{" "}
                      {totalPage}
                    </div> : <div></div>
                }
                
                <Pagination
                  defaultCurrent={1}
                  pageSize={props.perPage}
                  total={props.data?.totalCount}
                  onChange={onChangePage}
                />
              </div>
            </Col>
          </Row>
        </div>
        <div className="sticky-filter">
          <Row style={{ width: "100%" }}>
            <Col span={12}>
              <div className="filter-type" onClick={showDrawerSort}>
                <i className="fa fa-sort" aria-hidden="true"></i>
                {" "}<span>Sort By</span>
              </div>
            </Col>
            <Col span={12}>
              <div
                className="filter-type removeBorder"
                onClick={() => { showDrawerFiter(); }}
              >
                <i className="fa fa-filter" aria-hidden="true"></i>
                {" "}<span>Filter</span>
              </div>
            </Col>
          </Row>
        </div>
        <Drawer
          title="FILTER"
          placement="bottom"
          closable={true}
          onClose={onCloseFilter}
          visible={visibleFilter}
          className="showFilterDrawer"
          height="100vh"
        >
          <Filter
            removeThisFilter="displayMobAndTab"
            removeThisTitle="noDisplay"
            data={props.getSearchFilter}
            onCheckBrands={onCheckBrands}
            checkedBrands={checkedBrands}
            onChangeColors={onChangeColors}
            checkedColors={checkedColors}
            onHandleRatings={onHandleRatings}
            searchPrice={searchPrice}
            changePrice={changePrice}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onChangeWarrenty={onChangeWarrenty}
            selectedWarrenty={selectedWarrenty}
            onChangeSize={onChangeSize}
            selectedSize={selectedSize}
            closeThisFilter={onCloseFilter}
            applyFilter={applyFilter}
            currentRating={currentRating}
          />
        </Drawer>
        <Drawer
          title="SORT BY"
          placement="bottom"
          closable={false}
          onClose={onCloseSort}
          visible={visibleSort}
          className="showSortDrawer"
          height="40vh"
        >
          <SortBy
            closeThisFilter={onCloseSort}
            sortProducts={sortProducts} />
        </Drawer>
      </section>
    </div>
  );
}

Listing.getInitialProps = async (ctx) => {
  initialize(ctx);
}

export default withRouter(Listing);