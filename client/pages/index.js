import { Row, Col } from "antd";
import { connect } from "react-redux";
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

const Index = (props) => {
  return (
    <Layout title="Home">
      <div className="wrapper">
        <div className="main-carousel">
          <MainCarousel data={props.other?.getBannerImages} />
        </div>
        <div className="container">
          {
            !isEmpty(props.products.featuredProducts) && (
              <>
                <SliderHeader
                  headTitle="Featured Products"
                  headDetails="Quicksand is a sans serif type family of three weights plus matching obliques"
                  listLink="featuredProducts"
                />
                <ProductSlider data={props.products.featuredProducts} sliderName="featured" />
              </>
            )
          }
          {/* <section className="latest-popular">
            <Row>
              <Col lg={12} xs={24} md={12}>
                <Popular data={props.products.latestProducts} />
              </Col>
              <Col lg={12} xs={24} md={12}>
                <LatestSLider data={props.products.latestProducts} />
              </Col>
            </Row>
          </section> */}
          {
            !isEmpty(props.products.trendingProducts) &&
            <>
              <SliderHeader
                headTitle="Trending Products"
                headDetails="Quicksand is a sans serif type family of three weights plus matching obliques"
                removePaddingTop="paddingTopZero"
                listLink="trendingProducts"
              />
              <ProductSlider data={props.products.trendingProducts} sliderName="trending" />
            </>
          }
          {
            !isEmpty(props.products.topSellingProducts) &&
            <>
              <SliderHeader
                headTitle="Top Selling"
                headDetails="Quicksand is a sans serif type family of three weights plus matching obliques"
                removePaddingTop="paddingTopZero"
                listLink="topSellingProducts"
              />
              <ProductSlider data={props.products.topSellingProducts} sliderName="topselling" />
            </>
          }
          {
            !isEmpty(props.products.mostViewedProducts) &&
            <>
              <SliderHeader
                headTitle="Most Viewed"
                headDetails="Quicksand is a sans serif type family of three weights plus matching obliques"
                removePaddingTop="paddingTopZero"
                listLink="mostViewedProducts"
              />
              <ProductSlider data={props.products.mostViewedProducts} sliderName="mostViewed" />
            </>
          }
          {
            !isEmpty(props.products.latestProducts) &&
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
                    props.products.latestProducts?.products?.map((product, index) => {
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

  // const orders = await ctx.store.dispatch(actions.getOrders(ctx.req));

  await ctx.store.dispatch(actions.getBannerImages());

  return {
    // latestProducts,
    // trendingProducts
    // orders
  };
};

export default connect((state) => state)(Index);