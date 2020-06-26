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

const Index = ( props ) => {
  
  return (
    <div className="wrapper">
      <Header data = {props.products.menuCategories} />
      <div className="main-carousel">
        <MainCarousel />
      </div>
      <div className="container">
        <SliderHeader
          headTitle="Featured Products"
          headDetails="Quicksand is a sans serif type family of three weights plus matching
          obliques"
        />
        <ProductSlider />
        <section className="latest-popular">
          <Row>
            <Col lg={12} xs={24} md={12}>
              <Popular />
            </Col>
            <Col lg={12} xs={24} md={12}>
              <LatestSLider />
            </Col>
          </Row>
        </section>
        <SliderHeader
          headTitle="Trending Products"
          headDetails="Quicksand is a sans serif type family of three weights plus matching obliques"
          removePaddingTop="paddingTopZero"
        />
        <ProductSlider />
      </div>
      <Footer />
    </div>
  );
};

Index.getInitialProps = async (ctx) => {
  initialize(ctx);

  const data = await ctx.store.dispatch(actions.productCategories());
  console.log(data)
  // const data = await fetch("https://jsonplaceholder.typicode.com/posts");
  // const data = await data.json();

  return {
    data,
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
