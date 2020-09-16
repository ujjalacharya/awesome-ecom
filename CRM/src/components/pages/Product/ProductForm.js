import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import Select from 'react-select';

const { SubMenu } = Menu;

const ProductForm = props => {
    const [isMenuOpen,setIsMenuOpen] = useState(false)
    const openMenu = () => setIsMenuOpen(!isMenuOpen)
    // const closeMenu = () => setIsMenuOpen(false)
    const handleClick = e => console.log(e.target);
    return (
        <div className="col-md-12" >
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title">Form row</h5>
                    <h6 className="card-subtitle text-muted">Bootstrap column layout.</h6>
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputEmail4">Email</label>
                                <input type="email" className="form-control" id="inputEmail4" placeholder="Email" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputPassword4">Password</label>
                                <input type="password" className="form-control" id="inputPassword4" placeholder="Password" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputAddress">Address</label>
                            <input type="text" onClick={openMenu} className="form-control" id="inputAddress" placeholder="1234 Main St" />
                            {
                                isMenuOpen && <Menu onClick={handleClick} style={{ width: 256 }} mode="vertical">
                                    <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
                                        <Menu.ItemGroup title="Item 1">
                                            <Menu.Item key="1">Option 1</Menu.Item>
                                            <Menu.Item key="2">Option 2</Menu.Item>
                                        </Menu.ItemGroup>
                                        <Menu.ItemGroup title="Iteom 2">
                                            <Menu.Item key="3">Option 3</Menu.Item>
                                            <Menu.Item key="4">Option 4</Menu.Item>
                                        </Menu.ItemGroup>
                                    </SubMenu>
                                    <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
                                        <Menu.Item key="5">Option 5</Menu.Item>
                                        <Menu.Item key="6">Option 6</Menu.Item>
                                        <SubMenu key="sub3" title="Submenu">
                                            <Menu.Item key="7">Option 7</Menu.Item>
                                            <Menu.Item key="8">Option 8</Menu.Item>
                                        </SubMenu>
                                    </SubMenu>
                                    <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
                                        <Menu.Item key="9">Option 9</Menu.Item>
                                        <Menu.Item key="10">Option 10</Menu.Item>
                                        <Menu.Item key="11">Option 11</Menu.Item>
                                        <Menu.Item key="12">Option 12</Menu.Item>
                                    </SubMenu>
                                </Menu>
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputAddress2">Address 2</label>
                            <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputCity">City</label>
                                <input type="text" className="form-control" id="inputCity" />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="inputState">State</label>
                                <select id="inputState" className="form-control">
                                    <option selected>Choose...</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div className="form-group col-md-2">
                                <label htmlFor="inputZip">Zip</label>
                                <input type="text" className="form-control" id="inputZip" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="custom-control custom-checkbox m-0">
                                <input type="checkbox" className="custom-control-input" />
                                <span className="custom-control-label">Check me out</span>
                            </label>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

ProductForm.propTypes = {

}

export default ProductForm
