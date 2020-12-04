import React, { useState } from "react";
import PropTypes from "prop-types";
import { Menu, Select } from "antd";
import { connect } from "react-redux";
const { SubMenu } = Menu;

export const Categories = ({
  categories,
  selectedCategories,
  handleClick,
  handleDeselect,
}) => {
  const [openMenu, setOpenMenu] = useState(false);

  const megaMenu = (categories) => {
    return (
      <Menu onClick={handleClick} style={{ width: 256 }} mode="vertical">
        {categories.map((cat1) => {
          return (
            <SubMenu key={cat1.slug} title={cat1.displayName}>
              {cat1.childCate.map((cat2) => {
                return cat2.childCate.length ? (
                  <SubMenu
                    onTitleClick={handleClick}
                    key={cat2.slug}
                    title={cat2.displayName}
                  >
                    {cat2.childCate.map((cat3) => {
                      return (
                        <Menu.Item key={cat3.slug}>
                          {cat3.displayName}
                        </Menu.Item>
                      );
                    })}
                  </SubMenu>
                ) : (
                  <Menu.Item key={cat2.slug}>{cat2.displayName}</Menu.Item>
                );
              })}
            </SubMenu>
          );
        })}
      </Menu>
    );
  };

  return (
    <>
      <Select
        onClick={() => setOpenMenu(!openMenu)}
        value={selectedCategories}
        open={false}
        id="inputAddress"
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        placeholder="Select Categories"
        onDeselect={handleDeselect}
      ></Select>
      {openMenu && megaMenu(categories)}
    </>
  );
};

Categories.propTypes = {
  categories: PropTypes.array,
};

const mapStateToProps = (state) => ({
  categories: state.product.categories,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Categories));
