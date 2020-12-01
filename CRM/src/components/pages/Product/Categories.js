import React,{useState} from 'react'
import PropTypes from 'prop-types'
import { Menu, Select } from 'antd';
import { connect } from 'react-redux'
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;
const { Option, OptGroup } = Select;


export const Categories = ({ categories}) => {
    const handleClick = e => console.log(e);
    const handleChange = value => {
        console.log(value);
    }
    
    // let catHasNoChild = cat =>{
    //     return !categories.some(c=>c.parent === cat)
    // }
    
    // const megaMenu = (categories) =>{
    //     return (
    //         <Menu onClick={handleClick} style={{ width: 256 }} mode="vertical">
    //             {
    //             categories.map(cat=>{
    //                 return cat.parent===undefined && (<SubMenu key={cat.systemName} icon={<AppstoreOutlined />} title={cat.displayName}>
    //                 {
    //                     categories.map(cat2=>{
    //                         return (cat2.parent === cat._id && catHasNoChild(cat2._id)) ? (<Menu.Item key={cat2.systemName} > {cat2.displayName}</Menu.Item>)
    //                         : (<SubMenu key={cat2.systemName} title={cat2.displayName}>
    //                             {
    //                                 categories.map(cat3 => {
    //                                     return (cat3.parent === cat2._id && catHasNoChild(cat3._id)) && (<Menu.Item key={cat3.systemName} > {cat3.displayName}</Menu.Item>)
    //                                 })
    //                             }
    //                         </SubMenu>)

    //                     })
    //                 }
    //                 </SubMenu>)
    //             })
    //             }
    //         </Menu>
    //     )
    // }
    const megaMenu = (categories) => {
        return (<Menu onClick={handleClick} style={{ width: 256 }} mode="vertical">
        {
            categories.map(cat1=>{
                return (
                    <SubMenu onTitleClick={handleClick} key={cat1._id} icon={<AppstoreOutlined />} title={cat1.displayName}>
                        {
                            cat1.childCate.map(cat2=>{
                                return (
                                    <SubMenu onTitleClick={handleClick} key={cat2._id} icon={<AppstoreOutlined />} title={cat2.displayName}>
                                        {
                                            cat2.childCate.map(cat3=>{
                                                return (
                                                    <Menu.Item  key={cat3._id}>{cat3.displayName}</Menu.Item>
                                                )
                                            })
                                        }
                                    </SubMenu>
                                )
                            })
                        }
                    </SubMenu>
                )
            })
        }
        </Menu>)
    }

    return (
        <div className="form-group">
            <label htmlFor="inputAddress">Categories</label>
            {/* <input type="text" onClick={openMenu} className="form-control" id="inputAddress" placeholder="1234 Main St" /> */}
            <Select
                open={false}    
                id="inputAddress"
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Select Categories"
                onChange={handleChange}
            >
            </Select>
            {categories && megaMenu(categories)}
        </div>
    )
}

Categories.propTypes = {
    categories: PropTypes.array,
}

const mapStateToProps = (state) => ({
    categories: state.product.categories
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Categories))
