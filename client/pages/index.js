import React, { Component } from "react";
import Header from "./Components/Header";
import MainCarousel from "./Components/Carousel";
import ProductSlider from "./Components/ProductSlider";
import SliderHeader from "./Components/SliderHeader";
import { Row, Col } from "antd";
import Popular from "./Components/Popular";
import LatestSLider from "./Components/LatestSlider";
import Footer from "./Components/Footer";
import { connect } from "react-redux";
import initialize from "../utils/initialize";
import actions from "../redux/actions";
import fetch from "isomorphic-unfetch";
import Link from "next/link";
import Layout from "../components/Layout";

const Index = (props) => {
  
  return (
    <Layout title="Home">
      <div className="wrapper">
        {/* <Header data={props.menu.menuCategories} /> */}
        <div className="main-carousel">
          <MainCarousel />
        </div>
        <div className="container">
          <SliderHeader
            headTitle="Featured Products"
            headDetails="Quicksand is a sans serif type family of three weights plus matching
          obliques"
          />
          <ProductSlider data={props.products.latestProducts} />
          <section className="latest-popular">
            <Row>
              <Col lg={12} xs={24} md={12}>
                <Popular data={props.products.latestProducts} />
              </Col>
              <Col lg={12} xs={24} md={12}>
                <LatestSLider data={props.products.latestProducts} />
              </Col>
            </Row>
          </section>
          <SliderHeader
            headTitle="Trending Products"
            headDetails="Quicksand is a sans serif type family of three weights plus matching obliques"
            removePaddingTop="paddingTopZero"
          />
          <ProductSlider data={props.products.latestProducts} />
        </div>
        <Footer />
      </div>
    </Layout>
  );
};

Index.getInitialProps = async (ctx) => {
  initialize(ctx);

  const menuData = await ctx.store.dispatch(actions.productCategories());

  const latestProducts = await ctx.store.dispatch(actions.getLatestProducts());

  // const data = await fetch("https://jsonplaceholder.typicode.com/posts");
  // const data = await data.json();

  return {
    menuData,
    latestProducts,
  };
};

export default connect((state) => state)(Index);

// import { connect } from "react-redux";
// import initialize from "../utils/initialize";
// import Layout from "../components/Layout";
// import { Card } from "antd";
// import fetch from "isomorphic-unfetch";
// import Link from "next/link";

// const Index = ({ response }) => {
//   return (
//     <Layout title="Home">
//       <h2 className="title is-2">Authentication with Next.js and JWT</h2>
//       <img src="/static/nextjs.jpg" />
//       <p>A rock solid boilerplate by Uzz !</p>
//       <div>
//         {response.map((datum) => (
//           <Link href={"/posts/[id]"} key={datum.id} as={`/posts/${datum.id}`}>
//             <Card
//               title={datum.title}
//               style={{
//                 width: "100%",
//                 backgroundColor: "lightblue",
//                 margin: "2rem",
//               }}
//             >
//               <p>{datum.body}</p>
//             </Card>
//           </Link>
//         ))}
//       </div>
//       ,
//     </Layout>
//   );
// };

// Index.getInitialProps = async (ctx) => {
//   initialize(ctx);

//   const data = await fetch("https://jsonplaceholder.typicode.com/posts");
//   const response = await data.json();

//   return {
//     response,
//   };
// };

// export default connect((state) => state)(Index);
