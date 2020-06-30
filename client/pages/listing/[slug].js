import React, { Component } from "react";
import { Row, Col, Pagination, Drawer } from "antd";

// includes
import ProductList from "../../src/Includes/Listing/ProductList";
import Layout from "../../src/Components/Layout";
import initialize from "../../utils/initialize";
import actions from "../../redux/actions";
import Filter from "../../src/Includes/Listing/Filter";

class Listing extends Component {
  static async getInitialProps(ctx) {
    initialize(ctx);

    const {
      query: { slug },
    } = ctx;

    let data = []
    if (ctx.query.slug === "latestProducts") {
      data = await ctx.store.dispatch(actions.getLatestProducts());
    }

    const allBrands = await ctx.store.dispatch(actions.getProductBrands());

    return {
      data,
      allBrands
    };
  }
  state = {
    visibleFilter: false,
    visibleSort: false,
    sortName: "",
  };

  showDrawerFiter = () => {
    this.setState({
      visibleFilter: true,
    });
  };

  showDrawerSort = () => {
    this.setState({
      visibleSort: true,
    });
  };

  onCloseFilter = () => {
    this.setState({
      visibleFilter: false,
    });
  };

  onCloseSort = (sortTitle) => {
    this.setState({
      visibleSort: false,
    });
    if (sortTitle.target === undefined) {
      this.setState({
        sortName: sortTitle,
      });
    }
  };
  render() {
    
    return (
      <Layout>
        <div className="wrapper">
          <section className="listing">
            <div className="container">
              <Row>
                <Col lg={4} xs={24} md={6}>
                  <Filter removeThisFilter="noDisplayMobAndTab" data={this.props.allBrands}/>
                </Col>
                <Col lg={20} xs={24} md={18} className="right-listing">
                  <ProductList data={this.props.data} />
                  <div className="pagination">
                    <div className="page-status">Page 1 of 10</div>
                    <Pagination defaultCurrent={1} total={50} />
                  </div>
                </Col>
              </Row>
            </div>
            <div className="sticky-filter">
              <Row style={{ width: "100%" }}>
                <Col span={12}>
                  <div className="filter-type" onClick={this.showDrawerSort}>
                    <img src="/images/sortBy.png" alt="sort by icon" />
                    <span>Sort By</span>
                  </div>
                </Col>
                <Col span={12}>
                  <div
                    className="filter-type removeBorder"
                    onClick={this.showDrawerFiter}
                  >
                    <img src="/images/filter.png" alt="filter icon" />
                    <span>Filter</span>
                  </div>
                </Col>
              </Row>
            </div>
            <Drawer
              title="FILTER"
              placement="bottom"
              closable={true}
              onClose={this.onCloseFilter}
              visible={this.state.visibleFilter}
              className="showFilterDrawer"
              height="100vh"
            >
              <Filter
                removeThisTitle="noDisplay"
                closeThisFilter={this.onCloseFilter}
              />
            </Drawer>
            <Drawer
              title="SORT BY"
              placement="bottom"
              closable={false}
              onClose={this.onCloseSort}
              visible={this.state.visibleSort}
              className="showSortDrawer"
            >
              <div className="show-sort-by">
                <ul>
                  <li
                    onClick={() => this.onCloseSort("ascending")}
                    className={
                      this.state.sortName === "ascending" ? "active" : ""
                    }
                  >
                    {/* <Icon type="arrow-down" /> */}
                    <span>Ascending</span>
                  </li>
                  <li
                    onClick={() => this.onCloseSort("descending")}
                    className={
                      this.state.sortName === "descending" ? "active" : ""
                    }
                  >
                    Descending
                  </li>
                  <li
                    onClick={() => this.onCloseSort("highPrice")}
                    className={
                      this.state.sortName === "highPrice" ? "active" : ""
                    }
                  >
                    Price: High To Low
                  </li>
                  <li
                    onClick={() => this.onCloseSort("lowPrice")}
                    className={
                      this.state.sortName === "lowPrice" ? "active" : ""
                    }
                  >
                    Price: Low To High
                  </li>
                </ul>
              </div>
            </Drawer>
          </section>
        </div>
      </Layout>
    );
  }
}

export default Listing;
