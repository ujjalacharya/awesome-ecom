import React, { useState,useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {updateProfile} from '../../../redux/actions/profile_actions'

const ProfileForm = ({user, updateProfile}) => {
    const [profile, setProfile] = useState({
        name:'',
        shopName:'',
        address:'',
        district:'',
        wardno:'',
        phone:'',
        muncipality:'',
        oldPassword:'',
        newPassword:'',
        holidayStart:'',
        holidayEnd:'',
    });
    const [isSuccess, setIsSuccess] = useState(null)
    const [isDisable,setIsDisabled] = useState(false)
    useEffect(()=>{
        setProfile({
            name:user?.name?user.name:'',
            shopName:user?.shopName?user.shopName:'',
            address:user?.address?user.address:'',
            district:user?.district?user.district:'',
            wardno:user?.wardno?user.wardno:'',
            phone:user?.phone?user.phone:'',
            muncipality:user?.muncipality?user.muncipality:'',
            holidayEnd: user?.holidayMode?.end ? user.holidayMode.end:'',
            holidayStart: user?.holidayMode?.start ? user.holidayMode.start:''
        })
    },[user])
   const {name,address,muncipality,shopName,district,wardno,phone,holidayEnd,holidayStart,oldPassword,newPassword} = profile
   const onChange = e => setProfile({...profile,[e.target.name]:e.target.value})
    const onSubmit = async e => {
        e.preventDefault()
        setIsDisabled(true)
        await updateProfile(profile,user._id)
        // setIsDisabled(false)
    }
    return (
        <>
        <div className="col-md-12">
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title">Complete your profile</h5>
                    <h6 className="card-subtitle text-muted">Seller account information.</h6>
                </div>
                <div className="card-body">
                    <form onSubmit={e=> onSubmit(e)}>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputEmail4">Name</label>
                                <input type="text" className="form-control" id="inputEmail4" placeholder="Name"
                                name='name'
                                value={name}
                                onChange={onChange}
                                 />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputEmai4">Shop Name</label>
                                <input type="text" className="form-control" id="inputEmai4" placeholder="Shop Name"
                                    name='shopName'
                                    value={shopName}
                                    onChange={onChange} />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="add">Address</label>
                                <input type="text" className="form-control" id="add" placeholder="Address"
                                    name='address'
                                    value={address}
                                    onChange={onChange} />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="dist">District</label>
                                <input type="text" className="form-control" id="dist" placeholder="District" 
                                    name='district'
                                    value={district}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputPassword4">Password</label>
                                <input type="password" className="form-control" id="inputPassword4" placeholder="Password"
                                    name='oldPassword'
                                    value={oldPassword}
                                    onChange={onChange} />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputPassword">New Password</label>
                                <input type="password" className="form-control" id="inputPassword" placeholder="New Password"
                                    name='newPassword'
                                    value={newPassword}
                                    onChange={onChange} />
                            </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputAddress">Muncipality</label>
                            <input type="text" className="form-control" id="inputAddress" placeholder="muncipality"
                                    name='muncipality'
                                    value={muncipality}
                                    onChange={onChange} />
                        </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputZi">Phone</label>
                                <input type="text" className="form-control" id="inputZi"
                                    name='phone'
                                    value={phone}
                                    onChange={onChange}
                                />
                            </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputZip">Ward No.</label>
                            <input type="number" className="form-control" id="inputZip" 
                                    name='wardno'
                                    value={wardno}
                                    onChange={onChange}
                            />
                        </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="inputZ">Holiday Start</label>
                                <input type="number" className="form-control" id="inputZ"
                                    name='holidayStart'
                                    value={holidayStart}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="input">Holiday End</label>
                                <input type="number" className="form-control" id="input"
                                    name='holidayEnd'
                                    value={holidayEnd}
                                    onChange={onChange}
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={isDisable}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </>
    )
}

ProfileForm.propTypes = {
    user: PropTypes.object.isRequired,
    updateProfile: PropTypes.func.isRequired,
}
const mapStateToProps = (state) => ({
    user: state.auth.user,
})


export default connect(mapStateToProps,{updateProfile})(ProfileForm)
