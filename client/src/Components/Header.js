import React, { Component } from "react";
import { Row, Col, Input } from "antd";

import { getChildCategories } from "../../utils/common";
import Link from "next/link";

class Header extends Component {
  render() {
    let { data } = this.props;
    let parentCategory = [];

    let parentCate = [];
    if (this.props.data) {
      data.map((cate) => {
        if (cate.parent === undefined) {
          parentCategory.push(cate);
        }
      });

      let allCates = getChildCategories(data, parentCategory);

      allCates.map((newChild) => {
        let newallCates = getChildCategories(data, newChild.childCate);
        let parentCateEle = { ...newChild, childCate: newallCates };
        parentCate.push(parentCateEle);
      });
    }

    // let parentCate = getChildCategories(category)

    return (
      <div className="main-header">
        <Row>
          <Col lg={14} md={13}>
            <Row className="menu-logo">
              <Col span={2} className="logo">
                <Link href='/'>
                  <img src="/images/logo.png" />
                </Link>
              </Col>
              <Col span={22} className="menu">
                <div className="menu-list alldepart">
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
                                  <li key={i}>
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
                                              <li key={i}>
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
                </div>
                {/* <div className="menu-list">MEN</div>
                <div className="menu-list">WOMEN</div>
                <div className="menu-list">KIDS</div>
                <div className="menu-list">HOME & LIVING</div>
                <div className="menu-list">ESSENTIALS</div> */}
              </Col>
            </Row>
          </Col>
          <Col lg={6} md={6} className="search">
            <Input placeholder="Search for products, brands and more" />
          </Col>
          <Col lg={4} md={5} className="menu-right">
            <div className="menu-right-items">
              <div className="list-icon">
                <img src="/images/user.png" />
              </div>
              <div className="list-text">Profile</div>
            </div>
            <div className="menu-right-items">
              <div className="list-icon">
                <img src="/images/wishlist.png" />
              </div>
              <div className="list-text">Wishlist</div>
            </div>
            <div className="menu-right-items">
              <div className="list-icon">
                <img src="/images/bag.png" />
              </div>
              <div className="list-text">Bag</div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Header;
