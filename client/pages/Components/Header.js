import React, { Component } from "react";
import { Row, Col, Input } from "antd";

import { getChildCategories } from "../utils/common";

const category = [
  {
    brands: [],
    slug: "mobiles",
    isDisabled: null,
    _id: "5eb99018c5aa2f08ecd41986",
    systemName: "jwFnGGIsy",
    displayName: "Mobiles",
    parent: "5eb98ffcc5aa2f08ecd41985",
    __v: 3,
  },
  {
    brands: [],
    slug: "desktops",
    isDisabled: null,
    _id: "5ebd320800f5f4394c378288",
    systemName: "ZvTC_9j04",
    displayName: "desktops",
    parent: "5eb98ffcc5aa2f08ecd41985",
    __v: 3,
  },
  {
    brands: [],
    slug: "laptops",
    isDisabled: null,
    _id: "5ebd319800f5f4394c378287",
    systemName: "PwA_aQl0w",
    displayName: "laptops",
    parent: "5eb98ffcc5aa2f08ecd41985",
    __v: 3,
  },
  {
    brands: [],
    slug: "tablets",
    isDisabled: null,
    _id: "5eb99046c5aa2f08ecd41987",
    systemName: "5s4OESNL6",
    displayName: "Tablets",
    parent: "5eb98ffcc5aa2f08ecd41985",
    __v: 3,
  },
  {
    brands: ["5ec401484fb8db1318ed1e05"],
    slug: "xiaomi-mobiles",
    isDisabled: null,
    _id: "5ebae3e4d7172543743102de",
    systemName: "mYp8SYxPd",
    displayName: "Xiaomi Mobiles",
    parent: "5eb99018c5aa2f08ecd41986",
    __v: 14,
  },
  {
    brands: [],
    slug: "cameras",
    isDisabled: null,
    _id: "5ebd323e00f5f4394c378289",
    systemName: "o93JX0j43",
    displayName: "cameras",
    parent: "5eb98ffcc5aa2f08ecd41985",
    __v: 3,
  },
  {
    brands: [],
    slug: "mobile-accessories",
    isDisabled: null,
    _id: "5ebd32d900f5f4394c37828b",
    systemName: "SJYs9Huut",
    displayName: "Mobile Accessories",
    parent: "5ebd32a900f5f4394c37828a",
    __v: 3,
  },
  {
    brands: [],
    slug: "computer-accessories",
    isDisabled: null,
    _id: "5ebd334300f5f4394c37828d",
    systemName: "wIg_5Ht4-",
    displayName: "Computer Accessories",
    parent: "5ebd32a900f5f4394c37828a",
    __v: 3,
  },
  {
    brands: [],
    slug: "camera-accessories",
    isDisabled: null,
    _id: "5ebd332700f5f4394c37828c",
    systemName: "5f263lyYL",
    displayName: "Camera Accessories",
    parent: "5ebd32a900f5f4394c37828a",
    __v: 3,
  },
  {
    brands: [],
    slug: "network-components",
    isDisabled: null,
    _id: "5ebd336a00f5f4394c37828e",
    systemName: "58t_BoMBM",
    displayName: "Network Components",
    parent: "5ebd32a900f5f4394c37828a",
    __v: 3,
  },
  {
    brands: [],
    slug: "storage",
    isDisabled: null,
    _id: "5ebd338e00f5f4394c37828f",
    systemName: "j2j3TiOBq",
    displayName: "Storage",
    parent: "5ebd32a900f5f4394c37828a",
    __v: 3,
  },
  {
    brands: [],
    slug: "computer-components",
    isDisabled: null,
    _id: "5ebd33e900f5f4394c378290",
    systemName: "cLpWV94Ec",
    displayName: "Computer Components",
    parent: "5ebd32a900f5f4394c37828a",
    __v: 3,
  },
  {
    brands: [],
    slug: "televisions",
    isDisabled: null,
    _id: "5ebd345300f5f4394c378292",
    systemName: "drAjzYZdt",
    displayName: "Televisions",
    parent: "5ebd341500f5f4394c378291",
    __v: 3,
  },
  {
    brands: [],
    slug: "tv-accessories",
    isDisabled: null,
    _id: "5ebd346a00f5f4394c378293",
    systemName: "xWaksw_FP",
    displayName: "Tv Accessories",
    parent: "5ebd341500f5f4394c378291",
    __v: 3,
  },
  {
    brands: [],
    slug: "audio-video-devices",
    isDisabled: null,
    _id: "5ebd349200f5f4394c378294",
    systemName: "58qi5kqwW",
    displayName: "Audio & Video Devices",
    parent: "5ebd341500f5f4394c378291",
    __v: 3,
  },
  {
    brands: [],
    slug: "large-appliances",
    isDisabled: null,
    _id: "5ebd34c800f5f4394c378295",
    systemName: "OHwTm79HW",
    displayName: "Large Appliances",
    parent: "5ebd341500f5f4394c378291",
    __v: 3,
  },
  {
    brands: [],
    slug: "small-kitchen-appliances",
    isDisabled: null,
    _id: "5ebd34f200f5f4394c378296",
    systemName: "kci1Fm9nW",
    displayName: "Small Kitchen Appliances",
    parent: "5ebd341500f5f4394c378291",
    __v: 3,
  },
  {
    brands: [],
    slug: "cooking-heating",
    isDisabled: null,
    _id: "5ebd350500f5f4394c378297",
    systemName: "K3kB8m2WL",
    displayName: "Cooking & Heating",
    parent: "5ebd341500f5f4394c378291",
    __v: 3,
  },
  {
    brands: [],
    slug: "vacuums-floor-care",
    isDisabled: null,
    _id: "5ebd352d00f5f4394c378298",
    systemName: "kRl7KBqhF",
    displayName: "Vacuums & Floor Care",
    parent: "5ebd341500f5f4394c378291",
    __v: 3,
  },
  {
    brands: [],
    slug: "iron-garment-care",
    isDisabled: null,
    _id: "5ebd355c00f5f4394c378299",
    systemName: "l9iW-EY7Q",
    displayName: "Iron & Garment Care",
    parent: "5ebd341500f5f4394c378291",
    __v: 3,
  },
  {
    brands: ["5ebfcb246509d3475cc698aa"],
    slug: "samsung-mobiles",
    isDisabled: null,
    _id: "5ebd35ae00f5f4394c37829a",
    systemName: "JgzBJm-B3",
    displayName: "Samsung Mobiles",
    parent: "5eb99018c5aa2f08ecd41986",
    __v: 22,
  },
  {
    brands: ["5ec634d3b2995a1feca94bb0"],
    slug: "huawei-mobiles",
    isDisabled: null,
    _id: "5ebd362b00f5f4394c37829f",
    systemName: "axs9-MpeF",
    displayName: "Huawei Mobiles",
    parent: "5eb99018c5aa2f08ecd41986",
    __v: 14,
  },
  {
    brands: ["5ec63495b2995a1feca94baf"],
    slug: "lenovo-mobiles",
    isDisabled: null,
    _id: "5ebd363f00f5f4394c3782a0",
    systemName: "clLT_ulqM",
    displayName: "Lenovo Mobiles",
    parent: "5eb99018c5aa2f08ecd41986",
    __v: 16,
  },
  {
    brands: ["5ebfcc4c671b1a3f94454faa"],
    slug: "apple-ipad",
    isDisabled: null,
    _id: "5ebd36a000f5f4394c3782a1",
    systemName: "Abnl3T_FG",
    displayName: "Apple ipad",
    parent: "5eb99046c5aa2f08ecd41987",
    __v: 16,
  },
  {
    brands: [],
    slug: "samsung-tablets",
    isDisabled: null,
    _id: "5ebd36bb00f5f4394c3782a2",
    systemName: "5WRy4-qYe",
    displayName: "Samsung Tablets",
    parent: "5eb99046c5aa2f08ecd41987",
    __v: 3,
  },
  {
    brands: ["5ec634d3b2995a1feca94bb0"],
    slug: "huawei-tablets",
    isDisabled: null,
    _id: "5ebd36d000f5f4394c3782a3",
    systemName: "djiOnWWmX",
    displayName: "Huawei Tablets",
    parent: "5eb99046c5aa2f08ecd41987",
    __v: 14,
  },
  {
    brands: [],
    slug: "gaming-laptops",
    isDisabled: null,
    _id: "5ebd371000f5f4394c3782a4",
    systemName: "pwXGOg0GE",
    displayName: "Gaming Laptops",
    parent: "5ebd319800f5f4394c378287",
    __v: 3,
  },
  {
    brands: ["5ebfcc4c671b1a3f94454faa"],
    slug: "macbooks",
    isDisabled: null,
    _id: "5ebd372e00f5f4394c3782a5",
    systemName: "cE1gdUgYO",
    displayName: "Macbooks",
    parent: "5ebd319800f5f4394c378287",
    __v: 18,
  },
  {
    brands: [],
    slug: "notebooks-ultrabooks",
    isDisabled: null,
    _id: "5ebd375300f5f4394c3782a6",
    systemName: "KJJDVDEYu",
    displayName: "Notebooks & Ultrabooks",
    parent: "5ebd319800f5f4394c378287",
    __v: 3,
  },
  {
    brands: [],
    slug: "all-in-one",
    isDisabled: null,
    _id: "5ebd379b00f5f4394c3782a7",
    systemName: "7EQcyJW6c",
    displayName: "All in One",
    parent: "5ebd320800f5f4394c378288",
    __v: 3,
  },
  {
    brands: [],
    slug: "gaming-desktops",
    isDisabled: null,
    _id: "5ebd37ae00f5f4394c3782a8",
    systemName: "370C1efMY",
    displayName: "Gaming Desktops",
    parent: "5ebd320800f5f4394c378288",
    __v: 3,
  },
  {
    brands: [],
    slug: "audio-video-cameras",
    isDisabled: null,
    _id: "5ebd39ea00f5f4394c3782a9",
    systemName: "y5Zv81MmR",
    displayName: "Audio/Video Cameras",
    parent: "5ebd323e00f5f4394c378289",
    __v: 3,
  },
  {
    brands: ["5ec498631e23803aec709671"],
    slug: "security-cameras",
    isDisabled: null,
    _id: "5ebd3a1c00f5f4394c3782aa",
    systemName: "rdF3An0jt",
    displayName: "Security Cameras",
    parent: "5ebd323e00f5f4394c378289",
    __v: 20,
  },
  {
    brands: ["5ecfe396db3f174a38c834b3", "5ecfe45ddb3f174a38c834b6"],
    slug: "dslr-cameras",
    isDisabled: null,
    _id: "5ebd3a2e00f5f4394c3782ab",
    systemName: "C8mNxu-Zm",
    displayName: "DSLR Cameras",
    parent: "5ebd323e00f5f4394c378289",
    __v: 26,
  },
  {
    brands: [],
    slug: "instant-cameras",
    isDisabled: null,
    _id: "5ebd3a3800f5f4394c3782ac",
    systemName: "DgZbMHoO-",
    displayName: "Instant Cameras",
    parent: "5ebd323e00f5f4394c378289",
    __v: 3,
  },
  {
    brands: [],
    slug: "electronic-devices",
    isDisabled: null,
    _id: "5eb98ffcc5aa2f08ecd41985",
    systemName: "DMf12tlZj",
    displayName: "Electronic Devices",
    __v: 3,
  },
  {
    brands: [],
    slug: "electronic-accessories",
    isDisabled: null,
    _id: "5ebd32a900f5f4394c37828a",
    systemName: "UHfOQWwm3",
    displayName: "Electronic Accessories",
    __v: 3,
  },
  {
    brands: [],
    slug: "tv-home-appliances",
    isDisabled: null,
    _id: "5ebd341500f5f4394c378291",
    systemName: "hSA2r5qOj",
    displayName: "TV & Home Appliances",
    __v: 3,
  },
  {
    brands: ["5ec609091c1cab355c64e836"],
    slug: "oppo-mobiles",
    isDisabled: null,
    _id: "5ebd35c800f5f4394c37829b",
    systemName: "_c2gGHaTw",
    displayName: "Oppo Mobiles",
    parent: "5eb99018c5aa2f08ecd41986",
    __v: 16,
  },
  {
    brands: [],
    slug: "nokia-mobiles",
    isDisabled: null,
    _id: "5ebd35cf00f5f4394c37829c",
    systemName: "oSrDARUc0",
    displayName: "Nokia Mobiles",
    parent: "5eb99018c5aa2f08ecd41986",
    __v: 3,
  },
  {
    brands: ["5ebfcc4c671b1a3f94454faa"],
    slug: "apple-mobiles",
    isDisabled: null,
    _id: "5ebd35e400f5f4394c37829d",
    systemName: "CRHud49vd",
    displayName: "Apple Mobiles",
    parent: "5eb99018c5aa2f08ecd41986",
    __v: 18,
  },
  {
    brands: ["5ec497421e23803aec709670"],
    slug: "vivo-mobiles",
    isDisabled: null,
    _id: "5ebd35f000f5f4394c37829e",
    systemName: "N3ulSfrmT",
    displayName: "vivo Mobiles",
    parent: "5eb99018c5aa2f08ecd41986",
    __v: 22,
  },
  {
    brands: ["5ec498631e23803aec709671", "5ecf80e980779714389a294b"],
    slug: "phone-cases",
    isDisabled: null,
    _id: "5ecf500680779714389a2941",
    systemName: "y7ErqpT9k",
    displayName: "Phone Cases",
    parent: "5ebd32d900f5f4394c37828b",
    __v: 28,
  },
  {
    brands: [],
    slug: "screen-protectors",
    isDisabled: null,
    _id: "5ecf503680779714389a2942",
    systemName: "ih0tXjlMj",
    displayName: "Screen Protectors",
    parent: "5ebd32d900f5f4394c37828b",
    __v: 3,
  },
  {
    brands: ["5ecf962ddb3f174a38c83499"],
    slug: "power-banks",
    isDisabled: null,
    _id: "5ecf50be80779714389a2943",
    systemName: "kGUhh_U2_",
    displayName: "Power Banks",
    parent: "5ebd32d900f5f4394c37828b",
    __v: 14,
  },
  {
    brands: ["5ec498631e23803aec709671", "5ecf962ddb3f174a38c83499"],
    slug: "cables-converters",
    isDisabled: null,
    _id: "5ecf50f380779714389a2944",
    systemName: "x7lBTVUiC",
    displayName: "Cables & Converters",
    parent: "5ebd32d900f5f4394c37828b",
    __v: 22,
  },
  {
    brands: [],
    slug: "wall-chargers",
    isDisabled: null,
    _id: "5ecf6a1180779714389a2945",
    systemName: "S66kA6JZB",
    displayName: "Wall Chargers",
    parent: "5ebd32d900f5f4394c37828b",
    __v: 3,
  },
  {
    brands: [],
    slug: "wireless-chargers",
    isDisabled: null,
    _id: "5ecf6a1e80779714389a2946",
    systemName: "A_qwMXru0",
    displayName: "Wireless Chargers",
    parent: "5ebd32d900f5f4394c37828b",
    __v: 3,
  },
  {
    brands: ["5ecfd1cadb3f174a38c834a4"],
    slug: "gaming-headsets",
    isDisabled: null,
    _id: "5ed79d91f93fee299c5db1a7",
    systemName: "092JvPXwG",
    displayName: "Gaming Headsets",
    parent: "5ecf9faedb3f174a38c834a0",
    __v: 1,
  },
  {
    brands: ["5ec498631e23803aec709671"],
    slug: "tablet-accessories",
    isDisabled: null,
    _id: "5ecf6a4580779714389a2947",
    systemName: "euRSQTFg9",
    displayName: "Tablet Accessories",
    parent: "5ebd32d900f5f4394c37828b",
    __v: 14,
  },
  {
    brands: ["5ec498631e23803aec709671"],
    slug: "parts-tools",
    isDisabled: null,
    _id: "5ecf6a5b80779714389a2948",
    systemName: "XwEF-8VQa",
    displayName: "Parts & Tools",
    parent: "5ebd32d900f5f4394c37828b",
    __v: 14,
  },
  {
    brands: [],
    slug: "audio",
    isDisabled: null,
    _id: "5ecf9faedb3f174a38c834a0",
    systemName: "dvnK4bW_I",
    displayName: "Audio",
    parent: "5ebd32a900f5f4394c37828a",
    __v: 3,
  },
  {
    brands: ["5ecf9b93db3f174a38c8349e", "5ecfd1cadb3f174a38c834a4"],
    slug: "headphones-headsets",
    isDisabled: null,
    _id: "5ecf9fd7db3f174a38c834a1",
    systemName: "a-qTPeVSp",
    displayName: "Headphones & Headsets",
    parent: "5ecf9faedb3f174a38c834a0",
    __v: 17,
  },
  {
    brands: ["5ecfd1cadb3f174a38c834a4"],
    slug: "bluetooth-speakers",
    isDisabled: null,
    _id: "5ecfd124db3f174a38c834a3",
    systemName: "FLO5eZc_j",
    displayName: "Bluetooth Speakers",
    parent: "5ecf9faedb3f174a38c834a0",
    __v: 16,
  },
  {
    brands: [],
    slug: "wearable",
    isDisabled: null,
    _id: "5ecfd37edb3f174a38c834a7",
    systemName: "xunXcb5z6",
    displayName: "Wearable",
    parent: "5eb98ffcc5aa2f08ecd41985",
    __v: 3,
  },
  {
    brands: ["5ec634d3b2995a1feca94bb0"],
    slug: "smart-watches",
    isDisabled: null,
    _id: "5ecfd3b0db3f174a38c834a8",
    systemName: "iU9jAhnxX",
    displayName: "Smart Watches",
    parent: "5ecfd37edb3f174a38c834a7",
    __v: 14,
  },
  {
    brands: ["5ec498631e23803aec709671"],
    slug: "virtual-reality",
    isDisabled: null,
    _id: "5ecfd8f5db3f174a38c834aa",
    systemName: "PlINAnHz8",
    displayName: "Virtual Reality",
    parent: "5ecfd37edb3f174a38c834a7",
    __v: 14,
  },
  {
    brands: ["5ec498631e23803aec709671"],
    slug: "fitness-activity-tracker",
    isDisabled: null,
    _id: "5ecfd923db3f174a38c834ab",
    systemName: "SA69kGoCZ",
    displayName: "Fitness & Activity Tracker",
    parent: "5ecfd37edb3f174a38c834a7",
    __v: 16,
  },
];
class Header extends Component {
  render() {

    let { data } = this.props
    let parentCategory = [];
    
    let parentCate = [];
    if(this.props.data){
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
                <img src="/images/logo.png" />
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
                                  class="fa fa-angle-right"
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
                                            class="fa fa-angle-right"
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
