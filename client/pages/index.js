import { Row, Col } from "antd";
import { connect, useDispatch, useSelector } from "react-redux";
import MainCarousel from "../src/Components/Carousel";
import ProductSlider from "../src/Components/ProductSlider";
import SliderHeader from "../src/Components/SliderHeader";
// import Popular from "../src/Components/Popular";
// import LatestSLider from "../src/Components/LatestSlider";
import initialize from "../utils/initialize";
import actions from "../redux/actions";
import Layout from "../src/Components/Layout";
import ProductCard from "../src/Components/Includes/ProductCard";
import { isEmpty } from "lodash";
import { useEffect } from "react";

const Index = (props) => {
  let dispatch = useDispatch();
  let allProducts = useSelector((state) => state.products)
  let bannerImages = useSelector((state) => state.other.getBannerImages)

  useEffect(() => {
    if (!props.isServer) {
      if (isEmpty(allProducts.latestProducts)) {
        dispatch(actions.getMinedProducts('', 'latest'));
      }

      if (isEmpty(allProducts.trendingProducts)) {
        dispatch(actions.getMinedProducts('', 'trending'));
      }

      if (isEmpty(allProducts.topSellingProducts)) {
        dispatch(actions.getMinedProducts('', 'topselling'));
      }

      if (isEmpty(allProducts.mostViewedProducts)) {
        dispatch(actions.getMinedProducts('', 'mostviewed'));
      }

      if (isEmpty(allProducts.featuredProducts)) {
        dispatch(actions.getMinedProducts('', 'featured'));
      }
    }
    if (isEmpty(bannerImages)) {
      dispatch(actions.getBannerImages())
    }
  }, [])

  return (
    <Layout title="Home">
      <div className="wrapper">
        <div className="main-carousel">
          <MainCarousel data={bannerImages} />
        </div>
        <div className="container">
          {
            !isEmpty(allProducts.featuredProducts) && (
              <>
                <SliderHeader
                  headTitle="Featured Products"
                  headDetails="Quicksand is a sans serif type family of three weights plus matching obliques"
                  listLink="featuredProducts"
                />
                <ProductSlider data={allProducts.featuredProducts} sliderName="featured" />
              </>
            )
          }
          {/* <section className="latest-popular">
            <Row>
              <Col lg={12} xs={24} md={12}>
                <Popular data={allProducts.latestProducts} />
              </Col>
              <Col lg={12} xs={24} md={12}>
                <LatestSLider data={allProducts.latestProducts} />
              </Col>
            </Row>
          </section> */}
          {
            !isEmpty(allProducts.trendingProducts) &&
            <>
              <SliderHeader
                headTitle="Trending Products"
                headDetails="Quicksand is a sans serif type family of three weights plus matching obliques"
                removePaddingTop="paddingTopZero"
                listLink="trendingProducts"
              />
              <ProductSlider data={allProducts.trendingProducts} sliderName="trending" />
            </>
          }
          {
            !isEmpty(allProducts.topSellingProducts) &&
            <>
              <SliderHeader
                headTitle="Top Selling"
                headDetails="Quicksand is a sans serif type family of three weights plus matching obliques"
                removePaddingTop="paddingTopZero"
                listLink="topSellingProducts"
              />
              <ProductSlider data={allProducts.topSellingProducts} sliderName="topselling" />
            </>
          }
          {
            !isEmpty(allProducts.mostViewedProducts) &&
            <>
              <SliderHeader
                headTitle="Most Viewed"
                headDetails="Quicksand is a sans serif type family of three weights plus matching obliques"
                removePaddingTop="paddingTopZero"
                listLink="mostViewedProducts"
              />
              <ProductSlider data={allProducts.mostViewedProducts} sliderName="mostViewed" />
            </>
          }
          {
            !isEmpty(allProducts.latestProducts) &&
            <>
              <SliderHeader
                headTitle="Latest Products"
                headDetails="Quicksand is a sans serif type family of three weights plus matching obliques"
                removePaddingTop="paddingTopZero"
                listLink="latestProducts"
              />
              <div className="latest-products">

                <Row>
                  {
                    allProducts.latestProducts?.products?.map((product, index) => {
                      return (
                        <Col className="latest-cards" key={index} lg={6} sm={8}>
                          <ProductCard data={product} sliderName="latest" />
                        </Col>
                      )
                    })
                  }
                </Row>
              </div>
            </>
          }

        </div>
      </div>
    </Layout>
  );
};

Index.getInitialProps = async (ctx) => {
  initialize(ctx);

  if (ctx.isServer) {
    await ctx.store.dispatch(actions.getMinedProducts(ctx, 'latest'));
    await ctx.store.dispatch(actions.getMinedProducts(ctx, 'trending'));
    await ctx.store.dispatch(actions.getMinedProducts(ctx, 'topselling'));
    await ctx.store.dispatch(actions.getMinedProducts(ctx, 'mostviewed'));
    await ctx.store.dispatch(actions.getMinedProducts(ctx, 'featured'));
  }
  return {}
};

export default (Index);